var express     = require('express');
var bodyParser  = require('body-parser');
var http        = require('http');
var conn        = require('./config/connection');

var app =  express();

conn.getConnection((err)=>{
    if(err){
        console.log('db connection error',err);
    }
    else{
        console.log('connected to db');
    }
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/user',require('./routers/user'));

http.createServer(app).listen(3000,()=>console.log(`server run at port ${3000}`));