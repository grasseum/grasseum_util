exports.duplex = function(event_steam,read_func){
    return require("./duplex")(event_steam,read_func)
}

exports.read = function(event_steam,read_func){
    return require("./read")(event_steam,read_func)
}

exports.write = function(vent_steam,read_func){
    return require("./write")(event_steam,read_func)
}

exports.trasform = function(read_func){
    return require("./transform")(read_func)
}