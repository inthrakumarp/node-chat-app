var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('Should generate correct message object', () => {
        var from = "inthra";
        var text = "Hi how r u?";
        var msg = generateMessage(from, text);
        
        expect(msg.createdAt).toBeA('number');
        expect(msg).toInclude({from, text});
        // expect(msg.from).toBe('inthra');
        
    })
})

describe('generateLocationMessage', () => {
    it('Should generate correct location object', () => {
        var from = "inthra";
        var latitude = 1;
        var longitude = 2;

        var msg = generateLocationMessage(from, latitude, longitude);

        expect(msg.from).toBe(from);
        expect(msg.url).toBe('https://www.google.com/maps?q=1,2');
    })
})