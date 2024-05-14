const express = require('express');
const multer = require('multer');
const FileAppender = require('multer/lib/file-appender');
const app = express();
const port = 3000
const uploadCodeOrg = multer({dest: 'games/codeorg'});
app.post('/publish/codeorg', uploadCodeOrg.single('game-file'), (req, res, next) => {
    res.send('Hello World!');
    console.log(req.file);
});


app.listen(port, () => {
    console.log('app running!');
});