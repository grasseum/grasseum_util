
const Readable = require('stream').Readable,
 util = require('util');




 

 var ReadStream = function( event,read_func) {
   
    this.event = event;
    this.read_func = read_func;
    Readable.call(this, {objectMode: true,highWaterMark:32});
  
}; 
util.inherits(ReadStream, Readable);
ReadStream.prototype._destroy = function(err, callback) {

	this.event.emit("finish");
	callback()
}

ReadStream.prototype._read = function(chunk, encoding) {
    var main = this;
    this.on("resume",function(){
      
		main.event.emit("grasseum_started");
    
    });
    var glb = {
        data:chunk,
        encoding:encoding,
        push:function(data){
            main.setMaxListeners(data.toString().split("").length*2);
       
            main.push(data);
        },
        destroy:function(){
            main.destroy();
        },
        emit:function(data){
            main.emit(data);
        }
    }
    
    main.read_func.read(glb);
}
module.exports = function(event_steam,read_func){
    return new ReadStream(event_steam,read_func);
}

 