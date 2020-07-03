let read_stream = require("./lib/read_stream");


exports.readStream = function(conf){
  
    const Vinyl = require("vinyl");
    let vinyl_cls = new Vinyl(conf);
    read_stream(vinyl_cls);
    
    return  vinyl_cls;
} 

exports.stream = function(){
    return require("./stream");
}
