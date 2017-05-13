var moment = require('moment');

var generateMessage = (from, text) => {
    // console.log({
    //      from,
    //      text,
    //     createdAt: new Date().getTime()
    // });
    return {
         from,
         text,
        createdAt: moment().valueOf()
    };
};

var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    }
}

module.exports = {generateMessage, generateLocationMessage};