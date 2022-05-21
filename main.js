const read_stream = require("./lib/read_stream");
const Vinyl = require("vinyl");
const stream = require("./stream");

exports.readStream = function (conf) {

    const vinyl_cls = new Vinyl(conf);

    read_stream(vinyl_cls);

    return vinyl_cls;

};

exports.stream = function () {

    return stream;

};
