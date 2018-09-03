'use strict';

// had enabled by egg
// exports.static = true;
exports.ejs = {
    enable: true,
    package: 'egg-view-ejs'
};

exports.cors = {

    enable:true,
    package:'egg-cors'
}

exports.mongoose = {

    enable:true,
    package:'egg-mongoose'
}