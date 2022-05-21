const Transform = require('stream').Transform,
    util = require('util');
const grasseum_watchprocess = require("grasseum_watchprocess");
const TransformStream = function (init_class) {

    const allocatedForWaterMark = grasseum_watchprocess.process.allocatedForWaterMark();

    Transform.call(this, {highWaterMark: allocatedForWaterMark,
        objectMode: true});
    this.init_class = init_class;

};

util.inherits(TransformStream, Transform);

TransformStream.prototype._destroy = function (err, callback) {

    if (err !== null) {

        console.log(err);

    }
    callback();

};


TransformStream.prototype._transform = function (chunk, encoding, callback) {

    const that = this;
    const glb = {

        callback (error, data) {


            callback(error, data);

        },

        data: chunk,

        emit (data) {

            that.emit(data);

        },
        encoding,
        push (data) {

            that.setMaxListeners(data.toString().split("").length);
            that.push(data);

        },
        self: that
    };

    this.init_class.transform(glb);

};


module.exports = function (init_class) {

    return new TransformStream(init_class);

};
