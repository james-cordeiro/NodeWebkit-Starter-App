
// NodeWebkit GUI
var gui = require('nw.gui');
global.win = gui.Window.get();

// Alerts 
var Msg = require('./system/alerts');
global.message = new Msg({ gui: gui });


// Main Window
require('./system/window')(gui);


// Main Menu
require('./system/menu')(gui);


// Context Menu - using above alerts functions            
require('./system/contextMenu')({
    scope: document,
    menuID: "contextMenuOptions",
    functions: {
        sample1: function(){
            global.message.render("ALERT - Attention Needed", "Message generated from clicking on the sample link 1 button");
        },
        sample2: function(){
            global.message.render("ALERT - Attention Needed", "Message generated from clicking on the sample link 2 button");
        },
        sample3: function(){
            global.message.render("ALERT - Attention Needed", "Message generated from clicking on the sample link 3 button");
        }
    }
});