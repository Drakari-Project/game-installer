const express = require('express');
const multer = require('multer');
const childProc = require('child_process');
const fs = require('fs');
const app = express();
const port = 3000
const YEAR = '2024'; //CHANGE THIS EVERY YEAR!
const upload = multer({dest: '/home/drakari/gamedata/' + YEAR});
app.post('/publish/codeorg', upload.single('game-file'), (req, res, next) => {
    
    const folderName = getFolderNameFromZip(req.file);
    folderName.then((value) => {
        if (!fs.existsSync(req.file.destination + '/' + value.slice(0, -1))) {
            res.sendStatus(200);
            unzipFile(req.file);
            launchCodeorgConfig(req.file, value.slice(0, -2));
            fs.rm(req.file.path, (err) => {
                if (err) throw err;
            });
        } else {
            res.status(400).send('Game already exists!');
            deleteFile(req.file);
        }
        
    })
    console.log(req.file);
    
});
app.get('/', (req, res, next) => {
    res.send('<p>Current year: <b>' + YEAR + '</b></p>' + '<p>Status: ' + 'running</p>');
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
    childProc.exec('unzip ' + "'"+ file.path + "'" + ' -d ' + file.destination, (err, stdout, stderr) => {
        if (err) throw err;
        if (stderr) console.log(stderr);
    });
}

function getFolderNameFromZip(file) {
    return new Promise((resolve, reject) => {
        childProc.exec(`unzip -Z -1 '${file.path}' | head -n 1`, (err, stdout, stderr) => {
            if (err) { reject(err.message); throw err; };
            if (stderr) { console.log(stderr); reject(stderr) }
            resolve(stdout);
        })
    })
    
}

function launchCodeorgConfig(file, dirName) {
    childProc.exec(`./config/codeorg/processJsProject '${file.destination + '/' + dirName}' '${dirName}' ${YEAR}`, (err, stdout, stderr) => {
        if (err) throw err;
        if (stderr) console.log(stderr);
    });
}

app.listen(port, () => {
    console.log('app running!');
});
