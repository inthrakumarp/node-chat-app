var generateMessage = (from, text) => {
    console.log({
         from,
         text,
        createdAt: new Date().getTime()
    });
    return {
         from,
         text,
        createdAt: new Date().getTime()
    };
};

module.exports = {generateMessage};