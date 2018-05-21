var expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', ()=>{
  it('should reject non-string values',()=>{
    var str = 98;
    expect(isRealString(str)).toBe(false);
  });
  it('should reject with only spaces',()=>{
    var str = '     ';
    expect(isRealString(str)).toBe(false);
  });
  it('should allow string with non-space characters',()=>{
    var str = 'Hi there';
    expect(isRealString(str)).toBe(true);
  });
});
