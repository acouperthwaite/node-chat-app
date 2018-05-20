var moment = require('moment');

// JS timestamps always rep milliseconds

// var date = new Date()
// console.log(date.getMonth()); //returns array position of month (so 1 less than expected)

// var date = moment();
// date.add(2,'year').subtract(9,'months');
// console.log(date.format('ddd MMM Do, YYYY')); //look up moment API to see LoV (momentjs.com)
var createdAt = 12344;
var someTS = moment().valueOf();
console.log(someTS);
var date = moment(createdAt);
console.log(date.format('MM YY h:mm:ss a'));
