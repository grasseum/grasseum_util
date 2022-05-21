const Readable = require('stream').Readable;
const util = require('util');
const grasseum_watchprocess = require("grasseum_watchprocess");
const allocatedForWaterMark = grasseum_watchprocess.process.allocatedForWaterMark();

const ReadStream = function (event, action) {

    this.event = event;
    this.action = action;

    Readable.call(this, {
        'highWaterMark': allocatedForWaterMark,
        'objectMode': true
    });

};

util.inherits(ReadStream, Readable);

ReadStream.prototype._destroy = function (err, callback) {

    if (err !== null) {

        console.log(err);

    }
    this.event.emit("finish");
    callback();

};

ReadStream.prototype._read = function (chunk, encoding) {

    const that = this;

    this.on("resume", function () {

        that.event.emit("grasseum_started");

    });

    const glb = {

        data: chunk,

        destroy () {

            that.destroy();

        },

        emit (data) {

            that.emit(data);

        },

        encoding,

        push (data) {

            that.setMaxListeners(0);
            that.push(data);

        }
    };

    that.action.read(glb);

};

module.exports = function (event_steam, read_func) {

    return new ReadStream(event_steam, read_func);

};

