var express     = require('express');
var userDb      = require('../db/userDb');


var router = express.Router();

router.get('/getUsers',(req,res)=>{
    userDb.getUsers()
    .then((data)=>res.json({message:'data',user:data}))
    .catch((err)=>{res.json({message:'err',err:err});
  })
});

router.post('/register',(req,res)=>{
    userDb.registerUser(req.body)
    .then((data)=>res.json({message:'data',user:data}))
    .catch((err)=>{res.json({message:'err',err:err})})
});

router.post('/login',(req,res)=>{
   userDb.checkEmail(req.body.email)
   .then((data)=>{
    return userDb.matchPass(req.body.password,data);
   })
   .then((match)=>{
           res.json({message:'password match',match:match})
   })
   .catch((err)=>{
    res.json({message:'error',error:err});
   })
});

module.exports=router;