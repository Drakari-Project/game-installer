const express = require('express');
const multer = require('multer');
const childProc = require('child_process');
const fs = require('fs');
const app = express();
const port = 3000
const uploadCodeOrg = multer({dest: 'games/codeorg'});
app.post('/publish/codeorg', uploadCodeOrg.single('game-file'), (req, res, next) => {
    
    if (!fs.existsSync(req.file.destination + '/' + req.file.originalname)) {
        renameFile(req.file, req.file.originalname);
        res.sendStatus(200);
    } else {
        res.status(400).send('Game already exists!');
        deleteFile(req.file);
    }
    unzipFile(req.file)
    const folderName = getFolderNameFromZip(req.file);
    folderName.then((value) => {
        launchCodeorgConfig(req.file, value.slice(0, -2));
    })
    console.log(req.file);
    
});

function renameFile(file, name) {
    fs.rename(file.path, file.destination + '/' + name, (err) => {
        if (err) throw err;    
    });
}

function deleteFile(file) {
    fs.rm(file.path, (err) => {
        if (err) throw err;
    });
}

function unzipFile(file) {
    childProc.exec('unzip ' + "'"+ file.destination + '/' + file.originalname + "' " + '-d ' + file.destination, (err, stdout, stderr) => {
        if (err) throw err;
        if (stderr) console.log(stderr);
    });
}

function getFolderNameFromZip(file) {
    return new Promise((resolve, reject) => {
        childProc.exec(`unzip -Z -1 '${file.destination + '/' + file.originalname}' | head -n 1`, (err, stdout, stderr) => {
            if (err) { reject(err.message); throw err; };
            if (stderr) { console.log(stderr); reject(stderr) }
            resolve(stdout);
        })
    })
    
}

function launchCodeorgConfig(file, dirName) {
    childProc.exec(`./config/codeorg/processJsProject '${file.destination + '/' + dirName}'`, (err, stdout, stderr) => {
        if (err) throw err;
        if (stderr) console.log(stderr);
    });
}

app.listen(port, () => {
    console.log('app running!');
});