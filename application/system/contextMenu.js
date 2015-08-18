"use strict";

function ContextMenu(opts){

    if(typeof opts === 'undefined') throw "No options defined for contextMenu";
    if(typeof opts.scope === 'undefined') throw "No parent scope element defined for contextMenu to bind to";
    if(typeof opts.menuID === 'undefined') throw "No menu defined for contextMenu to bind as";

    this.opts = opts;

    this.contextMenuClassName = "contextMenu";
    this.contextMenuItemClassName = "contextMenu__item";
    this.contextMenuLinkClassName = "contextMenu__link";
    this.contextMenuActive = "contextMenu--active";

    this.taskItemClassName = "task";
    this.taskItemInContext;

    this.clickCoords; 
    this.clickCoordsX;
    this.clickCoordsY;

    this.menu = document.getElementById(this.opts.menuID);
    this.menuItems = this.menu.getElementsByTagName("contextMenu__item");
    this.menuState = 0;
    this.menuWidth;
    this.menuHeight;
    this.menuPosition;
    this.menuPositionX;
    this.menuPositionY;

    this.windowWidth;
    this.windowHeight;

    this.init();

};

ContextMenu.prototype.clickInsideElement = function( e, className ) {

    var el = e.srcElement || e.target;
    
    if ( el.classList.contains(className) ) {
        return el;
    } else {
        while ( el = el.parentNode ) {
            if ( el.classList && el.classList.contains(className) ) {
                return el;
            }
        }
    }

    return false;

};


ContextMenu.prototype.getPosition = function (e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;
    
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
        x: posx,
        y: posy
    }
};



ContextMenu.prototype.contextListener = function() {

    this.opts.scope.addEventListener( "contextmenu", function(e) {

        e.stopPropagation();

        this.taskItemInContext = this.clickInsideElement( e, this.taskItemClassName );

        if ( !this.taskItemInContext ) {
            e.preventDefault();
            this.toggleMenuOn();
            this.positionMenu(e);
        } else {
            this.taskItemInContext = null;
            this.toggleMenuOff();
        }
    }.bind(this));

};



ContextMenu.prototype.clickListener = function () {
    
    document.addEventListener( "click", function(e) {
        var clickeElIsLink = this.clickInsideElement( e, this.contextMenuLinkClassName );

        if ( clickeElIsLink ) {
            e.preventDefault();
            this.menuItemListener( clickeElIsLink );
        } else {
            var button = e.which || e.button;
            if ( button === 1 ) {
                this.toggleMenuOff();
            }
        }
    }.bind(this));

};




ContextMenu.prototype.keyupListener = function() {

    window.onkeyup = function(e) {
        if ( e.keyCode === 27 ) {
            this.toggleMenuOff();
        }
    }.bind(this);

};



ContextMenu.prototype.resizeListener = function() {
    
    window.onresize = function(e) {
        this.toggleMenuOff();
    }.bind(this);

};



ContextMenu.prototype.toggleMenuOn = function () {
    
    if ( this.menuState !== 1 ) {
        this.menuState = 1;
        this.menu.classList.add( this.contextMenuActive );
    }

};



ContextMenu.prototype.toggleMenuOff = function() {
    
    if ( this.menuState !== 0 ) {
        this.menuState = 0;
        this.menu.classList.remove( this.contextMenuActive );
    }

};



ContextMenu.prototype.positionMenu = function (e) {
    
    var currentClassNames = this.menu.className;
    currentClassNames = currentClassNames.replace(/leftWindow/g, "");
    currentClassNames = currentClassNames.replace(/rightWindow/g, "");
    currentClassNames = currentClassNames.replace(/topWindow/g, "");
    currentClassNames = currentClassNames.replace(/bottomWindow/g, "");
    this.menu.className = currentClassNames;

    this.clickCoords = this.getPosition(e);
    this.clickCoordsX = this.clickCoords.x;
    this.clickCoordsY = this.clickCoords.y;

    this.menuWidth = this.menu.offsetWidth + 4;
    this.menuHeight = this.menu.offsetHeight + 4;

    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    if ( (this.windowWidth - this.clickCoordsX) < this.menuWidth ) {
        this.menu.style.left = this.windowWidth - this.menuWidth + "px";
        this.menu.className += " rightWindow";
    } else {
        this.menu.style.left = this.clickCoordsX + "px";
        this.menu.className += " leftWindow";
    }

    if ( (this.windowHeight - this.clickCoordsY) < this.menuHeight ) {
        this.menu.style.top = this.windowHeight - this.menuHeight + "px";
        this.menu.className += " bottomWindow";
    } else {
        this.menu.style.top = this.clickCoordsY + "px";
        this.menu.className += " topWindow";
    }

};

ContextMenu.prototype.menuItemListener = function( link ){

    eval(link.getAttribute("data-action"));
    this.toggleMenuOff();

};

ContextMenu.prototype.init = function(){

    this.contextListener();
    this.clickListener();
    this.keyupListener();
    this.resizeListener();

};

module.exports = function(opts){

    return new ContextMenu(opts);

};
