const Gpio = require('onoff').Gpio;
const fs = require('fs');
const Cron = require('cron').CronJob;

const ioUp = new Gpio(2, 'high');
const ioMy = new Gpio(3, 'high');
const ioDown = new Gpio(4, 'high');

const delay = ms => new Promise(res => setTimeout(res, ms));

let tasks = {}
let crons = []

const  computeTask = async (task) => {
    console.log(`Executing Cron -> (${task.cron}) : ${task.commands}`)
    let commands = task.commands.split(";");
    for (let index = 0; index < commands.length; index++) {
        const command = commands[index];
        console.log("Command : " + command)
        switch (command) {
            case "up":
                this.commandMoveUp()
                break;
            case "down":
                this.commandMoveDown()
                break;
            case "my":
                this.commandMy()
                break;

            default:
                let num = parseInt(command);
                if (!isNaN(num)) {
                    console.log("Wait for" + num)
                    await delay(num);
                } else
                    console.log("Wrong command");
                break;
        }
    }
};

function isValidCron(cronExpression) {
    const cronParts = cronExpression.split(" ");
    if (cronParts.length !== 5) {
        return false;
    }
    for (let index = 0; index < cronParts.length; index++) {
        if (!/^[\d,\-,\/,\*]+$/.test(cronParts[index])) {
            return false;
        }
    }
    return true;
}

async function addCron(task) {
    if (isValidCron(task.cron)) {
        crons.push(new Cron(
            task.cron,
            () => computeTask(task),
            null,
            true,
            'Europe/Paris'
        ))
        console.log(`New Cron Started -> (${task.cron}) : ${task.commands}`)
    }
};


exports.stopProgram = async (req, res) => {
    console.log("stopProgram");
    for (let index = 0; index < crons.length; index++) {
        const cron = crons[index];
        cron.stop()
    }
    if (req != null)
            res.status(200).send('Success')
};

exports.startProgram = async (req, res) => {
    console.log("startProgram");
    let data = fs.readFileSync('./tasks.json', 'utf-8');
    tasks = JSON.parse(data);
    if (tasks != null && tasks.length > 0)
        tasks.forEach(task => {
            addCron(task)
        });
    if (req != null)
        res.status(200).send('Success')
};

exports.reloadProgram = async (req, res) => {
    console.log("reloadProgram");
    this.stopProgram()
    this.startProgram()
    if (req != null)
        res.status(200).send('Success')
};

exports.sendData = async (req, res) => {
    fs.writeFileSync('tasks.json', JSON.stringify(req.body.tasks));
    this.reloadProgram()
    if (req != null)
        res.status(200).send('Success')
};

exports.getData = async (req, res) => {
    res.json(tasks)
};

exports.commandMoveUp = async (req, res) => {
    console.log("commandMoveUp");
    ioUp.writeSync(0);
    setTimeout(() => {
        ioUp.writeSync(1);
        if (req != null)
            res.status(200).send('Success')
    }, 500);
};

exports.commandMoveDown = async (req, res) => {
    console.log("commandMoveDown");
    ioDown.writeSync(0);
    setTimeout(() => {
        ioDown.writeSync(1);
        if (req != null)
            res.status(200).send('Success')
    }, 500);
};

exports.commandMy = async (req, res) => {
    console.log("commandMy");
    ioMy.writeSync(0);
    setTimeout(() => {
        ioMy.writeSync(1);
        if (req != null)
            res.status(200).send('Success')
    }, 500);
};

this.startProgram()
