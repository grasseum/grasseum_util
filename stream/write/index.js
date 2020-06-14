
Writable = require('stream').Writable,
util = require('util');


var fs = require("fs");
var path = require("path");


var writeStream = function( event ,action) {
    //Readable.call(this, {objectMode: true});
    this.event = event;
    this.action = action;

    
    
    Writable.call(this, { objectMode: true});
     
    };
    
    util.inherits(writeStream, Writable);
    
    
    writeStream.prototype._destroy = function(err, callback) {
	
        this.event.emit("finish");
        callback()
    }

    writeStream.prototype._write = function(chunk, encoding, callback) {
      
      var main = this;
    
     
        var glb = {
            data:chunk,
            encoding:encoding,
            callback:function(error,data){
                main.setMaxListeners(data.toString().split("").length);
           
             callback(error,data);
            },
            push:function(data){
                main.push(data);
            },
            emit:function(data){
                main.emit(data);
            }
        };
        
        main.action.write(glb);

       
      
        
      };
      

      
module.exports = function(event_steam,read_func){
    return new writeStream(event_steam,read_func);
}

 