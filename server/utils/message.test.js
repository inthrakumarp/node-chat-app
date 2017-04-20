var expect = require('expect');

var {generateMessage} = require('./message');

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