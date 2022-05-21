

const Writable = require('stream').Writable,
    util = require('util');

const grasseum_watchprocess = require("grasseum_watchprocess");
const WriteStream = function (event, action) {

    const allocatedForWaterMark = grasseum_watchprocess.process.allocatedForWaterMark();

    this.event = event;
    this.action = action;
    Writable.call(this, {highWaterMark: allocatedForWaterMark,
        objectMode: true});

};

util.inherits(WriteStream, Writable);


WriteStream.prototype._destroy = function (err, callback) {

    if (err !== null) {

        console.log(err);

    }
    this.event.emit("finish");
    callback();

};

WriteStream.prototype._write = function (chunk, encoding, callback) {

    const that = this;
    const glb = {

        callback (error, data) {

            that.setMaxListeners(data.toString().split("").length);

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

        }

    };

    that.action.write(glb);


};


module.exports = function (event_steam, read_func) {

    return new WriteStream(event_steam, read_func);

};

