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

app.listen(port, () => {
    console.log('app running!');
});