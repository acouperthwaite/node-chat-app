const path = require('path'); //built in module, doens't need to be installed
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
// console.log(__dirname + '/../public'); //old way
// console.log(publicPath);


var app = express();
app.use(express.static(publicPath));


app.listen(port, () =>{
  console.log(`started up at port ${port}`);
});

module.exports = {app};
