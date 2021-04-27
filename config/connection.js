var mySql = require('mysql');

var con = mySql.createPool({
  host:'localhost',
  port: '3306',
  user:'root',
  password:'root',
  database:'news'
});

module.exports = con;