
 var fs = require("fs")
  


 var Transform = require('stream').Transform,
     util = require('util');
 
 var TransformStream = function(init_class) {
   Transform.call(this, {objectMode: true,highWaterMark:32});
   this.init_class = init_class;
 };
 
 util.inherits(TransformStream, Transform);
 
 TransformStream.prototype._destroy = function (err, callback) {
   // this.cork();
  
   
  
 };
 
 
 
 TransformStream.prototype._transform = function(chunk, encoding, callback) {
    var main = this;
    var glb = {
        data:chunk,
        encoding:encoding,
        self:this,
        callback:function(error,data){
         //   main.setMaxListeners(data.toString().split("").length);
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
    this.init_class.transform( glb );
 };
 
 
 
 
 
      
module.exports = function(init_class){
    return new TransformStream(init_class);
}

 