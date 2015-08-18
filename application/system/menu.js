var os = require('os');



function about(){
    
    var content = '';

    // Platform Info
    content += '[Platform]' + '<br />';
    content += 'OS Type        : ' + os.platform() + '<br />';
    content += 'OS Version     : ' + os.release()  + '<br />';
    content += 'OS Architecture: ' + os.arch()     + '<br />';
    content += '<br />';

    // Memory info
    content += '[Memory]' + '<br />';
    content += 'Total (Bytes)  : ' + os.totalmem() + '<br />';
    content += 'Free  (Bytes)  : ' + os.freemem()  + '<br />';
    content += 'Free  (%)      : ' + (os.freemem() / os.totalmem() * 100).toFixed(2)  + '<br />';
    content += '<br />';

    // CPU Info
    content += '[CPUs]' + '<br />';
    content += 'No. of Cores   : ' + os.cpus().length   + '<br />';
    content += 'Core Type      : ' + os.cpus()[0].model + '<br />';

    return content;

}




module.exports = function(gui){ 


    var windowMenu = new gui.Menu({ type: 'menubar' });
     
    // Menu Items
    var fileMenu = new gui.Menu(),
        editMenu = new gui.Menu(),
        helpMenu = new gui.Menu();

    // Add Menu Items to Window Menu
    windowMenu.append(new gui.MenuItem({ label: 'File', submenu: fileMenu }));
    windowMenu.append(new gui.MenuItem({ label: 'Edit', submenu: editMenu }));
    windowMenu.append(new gui.MenuItem({ label: 'Help', submenu: helpMenu }));



    // FILE MENU

    fileMenu.append(new gui.MenuItem(
        {
            label: 'New File',
            click: function(){
                message.render('New File', about());
            },
            key: "N"
        }
    ));

    fileMenu.append(new gui.MenuItem(
        {
            label: 'Open',
            click: function(){
                message.render('Open File', about());
            },
            key: "O"
        }
    ));

    fileMenu.append(new gui.MenuItem({ type: 'separator' }));

    fileMenu.append(new gui.MenuItem(
        {
            label: 'Quit',
            click: function(){
                win.close();
            },
            key: "Q"
        }
    ));


    // EDIT MENU

    editMenu.append(new gui.MenuItem(
        {
            label: 'Undo...',
            click: function(){
                message.render('Undo', about());
            },
            key: "Z"
        }
    ));


    // HELP MENU

    helpMenu.append(new gui.MenuItem(
        {
            label: 'About',
            click: function(){
                message.render('About', about());
            }
        }
    ));

    // Assign Menu to window
    gui.Window.get().menu = windowMenu;


};