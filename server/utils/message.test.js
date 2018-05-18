var expect = require('expect');

var {generateMessage} = require('./message')

describe('generateMessage', ()=>{
  it('should generate the correct Message object',()=>{
    var from = 'Jenn';
    var text = 'Do stuff';
    var message = generateMessage(from,text);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from,text});
  });
});
