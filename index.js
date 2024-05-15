const express = require('express');
const multer = require('multer');
const childProc = require('child_process');
const fs = require('fs');
const app = express();
const port = 3000
const uploadCodeOrg = multer({dest: 'games/codeorg'});
app.post('/publish/codeorg', uploadCodeOrg.single('game-file'), (req, res, next) => {
    res.sendStatus(200);
    if (!fs.existsSync(req.file.destination + '/' + req.file.originalname)) {
        renameFile(req.file, req.file.originalname);
    } else {
        renameFile(req.file, req.file.originalname);
    }
   
    unzipFile(req.file)
    req.destin
    console.log(req.file);
    
});

function renameFile(file, name) {
    fs.rename(file.path, file.destination + '/' + name, (err) => {
        if(err) throw err;    
    });
}

function unzipFile(file) {
    childProc.exec('unzip ' + "'"+ file.destination + '/' + file.originalname + "' " + '-d ' + file.destination, (err, stdout, stderr) => {
        if (err) throw err;
        if(stderr) console.log(stderr);
    });
}

app.listen(port, () => {
    console.log('app running!');
});