const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const controller = require('./controller')
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/program/stop', (req, res) => {
    controller.stopProgram(req, res);
});

app.get('/program/start', (req, res) => {
    controller.startProgram(req, res);
});

app.get('/program/reload', (req, res) => {
    controller.reloadProgram(req, res);
});

app.get('/command/up', (req, res) => {
    controller.commandMoveUp(req, res);
});

app.get('/command/down', (req, res) => {
    controller.commandMoveDown(req, res);
});

app.get('/command/my', (req, res) => {
    controller.commandMy(req, res);
});

app.get('/program/get', (req, res) => {
    controller.getData(req, res);
});

app.post('/program/send', (req, res) => {
    controller.sendData(req, res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});