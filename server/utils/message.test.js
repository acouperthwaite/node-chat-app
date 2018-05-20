var expect = require('expect');

var {generateMessage} = require('./message');
var {generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
  it('should generate the correct Message object',()=>{
    var from = 'Jenn';
    var text = 'Do stuff';
    var message = generateMessage(from,text);
    expect(typeof message.createdAt).toBe('function');
    expect(message).toMatchObject({from,text});
  });
});
describe('generateLocationMessage', ()=>{
  it('should generate the location object',()=>{
    var from = 'Jenn';
    var lat = 1;
    var long = 2;
    var url = `https://www.google.com/maps?q${lat},${long}`;
    var message = generateLocationMessage(from,lat,long);
    expect(typeof message.createdAt).toBe('function');
    expect(message).toMatchObject({from,url});
  });
});
