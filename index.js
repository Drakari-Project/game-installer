const express = require('express');
const multer = require('multer');
const childProc = require('child_process');
const fs = require('fs');
const app = express();
const port = 3000
const uploadCodeOrg = multer({dest: 'games/codeorg'});
app.post('/publish/codeorg', uploadCodeOrg.single('game-file'), (req, res, next) => {
    res.sendStatus(200);
    const SAFE_NAME = req.file.originalname.replace(" ", "-");

    renameFile(req.file.path, req.file.destination, SAFE_NAME);
    unzipFile(req.file.destination, SAFE_NAME);
    console.log(req.file);
    
});

function renameFile(originalPath, destination, name) {
    fs.rename(originalPath, destination + '/' + name, (err) => {
        if(err) throw err;    
    });
}
function unzipFile(path, name) {
    childProc.exec('unzip ' + "'"+ path + '/' + name + "' " + '-d ' + path, (err, stdout, stderr) => {
        if (err) throw err;
        if(stderr) console.log(stderr);
    });
}

app.listen(port, () => {
    console.log('app running!');
});