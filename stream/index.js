const duplex = require("./duplex");
const read = require("./read");
const write = require("./write");
const transform = require("./transform");

exports.duplex = function (event_steam, read_func) {

    return duplex(event_steam, read_func);

};

exports.read = function (event_steam, read_func) {

    return read(event_steam, read_func);

};

exports.write = function (event_steam, read_func) {

    return write(event_steam, read_func);

};

exports.trasform = function (read_func) {

    return transform(read_func);

};
