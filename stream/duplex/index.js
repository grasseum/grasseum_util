const Duplex = require('stream').Duplex;
const util = require('util');
const grasseum_watchprocess = require("grasseum_watchprocess");

const DuplexStream = function (event, action) {

    this.event = event;
    this.action = action;

    const allocatedForWaterMark = grasseum_watchprocess.process.allocatedForWaterMark();

    Duplex.call(this, {
        'highWaterMark': allocatedForWaterMark,
        'objectMode': true,
        'readableObjectMode': true,
        'writableObjectMode': true
    });

};

util.inherits(DuplexStream, Duplex);

DuplexStream.prototype._write = function (chunk, encoding, callback) {

    const that = this;

    const glb = {

        callback (error, data) {

            that.setMaxListeners(data.toString().split("").length*2);
            callback(error, data);

        },

        'data': chunk,

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
DuplexStream.prototype._read = function (chunk, encoding) {

    const that = this;

    const glb = {
        'data': chunk,

        destroy () {

            that.destroy();

        },

        emit (data) {

            that.emit(data);

        },

        encoding,

        push (data) {

            that.setMaxListeners(data.toString().split("").length);
            that.push(data);

        }
    };

    that.action.read(glb);

};


module.exports = function (event_steam, read_func) {

    return new DuplexStream(event_steam, read_func);

};
