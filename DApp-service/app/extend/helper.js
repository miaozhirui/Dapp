const moment = require('moment');

exports.relativeTime = time => moment(new Date(time*1000)).fromNow();

exports.getInviteCode = length => {

    length = length || 6;

    let codes = "abcdefghijklmnopqrstuvwxyz1234567890";
    let max=codes.length;
    let min = 0;
    let arr = [];


    for(let i=0; i<length; i++) {
        
        let randomNum = Math.floor(Math.random()*(max - min + 1) + min);

        arr.push(codes[randomNum]);
    }

    return arr.join('');

}