
Duplex = require('stream').Duplex,
util = require('util');


var fs = require("fs");
var path = require("path");


var duplexStream = function( event ,action) {
    //Readable.call(this, {objectMode: true});
    this.event = event;
    this.action = action;

    
    
    Duplex.call(this, {readableObjectMode: true,writableObjectMode: true,objectMode: true,highWaterMark:32});
     
    };
    
    util.inherits(duplexStream, Duplex);
    
    
    
    duplexStream.prototype._write = function(chunk, encoding, callback) {
       
      var main = this;
    
     
        var glb = {
            data:chunk,
            encoding:encoding,
            callback:function(error,data){
                main.setMaxListeners(data.toString().split("").length*2);
           
             callback(error,data);
            },
            push:function(data){
                main.setMaxListeners(data.toString().split("").length);
                main.push(data);
            },
            emit:function(data){
                main.emit(data);
            }
    }
       
        main.action.write(glb);

       
      
        
      };
      duplexStream.prototype._read = function(chunk, encoding) {
        var main = this;
        var glb = {
            data:chunk,
            encoding:encoding,
            push:function(data){
                main.setMaxListeners(data.toString().split("").length);
           
                main.push(data);
            },
            destroy:function(){
                main.destroy();
            },
            emit:function(data){
                main.emit(data);
            }
        }
       
        main.action.read(glb);
      };

      
module.exports = function(event_steam,read_func){
    return new duplexStream(event_steam,read_func);
}

 