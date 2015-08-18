function Alerts(opts){

    this.gui = opts.gui || null;
    this.template = opts.template || 'views/alerts.html';
    this.overlayClassName = "alerts__dialog-on";

};

Alerts.prototype.render = function(title, dialog){

    global.alerts.title = title || "";
    global.alerts.message = dialog || "";

    var win = this.gui.Window.open(this.template, {
        "position"          : "center",
        "focus"             : true,
        "toolbar"           : false,
        "frame"             : false,
        "width"             : 480,
        "min_width"         : 480,
        "min_height"        : 320,
        "show"              : true,
        "show_in_taskbar"   : true
    });

    win.on("closed", function(){
        
        var overlays = document.getElementsByClassName(this.overlayClassName);
        while(overlays[0]){ 
            overlays[0].parentNode.removeChild(overlays[0]);
        }

    }.bind(this));

    var dialogOverlay = document.createElement("div");
    dialogOverlay.className = this.overlayClassName;
    dialogOverlay.addEventListener( "click", function(e) {

        e.stopPropagation();
        e.preventDefault();
        win.focus();
        
    });
    dialogOverlay.addEventListener( "contextmenu", function(e) {

        e.stopPropagation();
        win.focus();
        
    });
    document.body.appendChild(dialogOverlay);

};

module.exports = Alerts;