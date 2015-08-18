// set-up of some globals
global.window = window;
global.document = document;
global.console = console;
global.alert = alert; // take this out afterwords
global.alerts = {};


document.title = process._nw_app.manifest.name;

document.getElementById('window__toolbar__title').innerHTML = process._nw_app.manifest.name;
document.getElementById('window__footer__title').innerHTML = process._nw_app.manifest.name + " v" + process._nw_app.manifest.version;