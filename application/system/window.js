"use strict";


      module.exports = function(nw){

          win.isMax = false;

          // Min
          document.getElementById("window__toolbar__controls--minimize").onclick = function(){
              win.minimize();
          }

          // Max
          document.getElementById("window__toolbar__controls--maximize").onclick = function(){
                
              if(win.isMax){
                  win.unmaximize();
              }else{
                  win.maximize();
              }

          }

          // Close
          document.getElementById("window__toolbar__controls--close").onclick = function(){
              win.close();
          }

          win.on('maximize', function(){
              win.isMax = true;
          });

          win.on('unmaximize', function(){
              win.isMax = false;
          });


      };