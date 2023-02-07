# SomfyIO-DIYSmartRemote
Service and web GUI for somfy io remotes hardwired to Raspberry PI

Inspired by https://hackaday.io/project/181838-somfypi-io

VueJS 3.0 and ExpressJS

Recent Somfy remotes has test points on the back of the PCB labeled with "Up", "Down" and "My" making it easier to solder wires.

![AAA](https://user-images.githubusercontent.com/31934363/217322936-dadfc72e-8424-40ee-a89b-cf1e92f53a68.png)

## Instalation 

- Run ``npm install`` in both **nodejs-service** and **vuejs-web-gui** folders
- Run ``vue-cli-service build`` in **vuejs-web-gui** to obtain the built dist folder.
- Clone **vuejs-web-gui/dist** as **nodejs-service/public**
- Start the nodejs process in **nodejs-service** with ``node index.js``
- Access the web GUI at localhost:3000

## Usage 

Either by direct control with Up/Down/My buttons or using CRON tasks
To use CRONs add a item to the task list, write a CRON syntax on the left field and the commands to be executed when the CRON fire.
commands are a string of commands ``up`` ``down`` ``my`` or a delay in milliseconds separated with ``;``
Load, Save and Delete buttons will execute these actions on the task list saved in **nodejs-service/tasks.json**
Stop, Start and Restart buttons will execute these actions the CRON process that are listed as tasks

![image](https://user-images.githubusercontent.com/31934363/217328127-beb78e47-c4bd-4421-88df-f1f8fabba9dc.png)

## Settings 

- Gpio pins are set at the start of **nodejs-service/controller.js** and will depend on your own wiring.
- Web GUI port is set at the bottom of **nodejs-service/index.js** and can be changed or set with env.PORT
- CRON timezones are set in the addCron() method of **nodejs-service/controller.js**
