'use strict'

var jwt         = require('jsonwebtoken');
var bcrypt      = require('bcrypt');
var conn        = require('../config/connection');

module.exports={
    registerUser(udata){
        return new Promise((resolve,reject)=>{
            conn.getConnection((err,connection)=>{
                if(err)
                {
                    reject(err);
                }
                else
                {
                 bcrypt.genSalt(10,(err,salt)=>{
                  bcrypt.hash(udata.password,salt,(err,hash)=>{
                      if(err)
                      {
                          reject(err);
                      }
                      else
                      {
                      udata.password = hash;
                      connection.query(`insert into users set ?`,udata,(err,data)=>{
                        if(err) 
                        {
                            reject(err);
                        }
                         else
                          {
                            resolve(data.affectedRows);
                          }
                        });  
                      }
                   });
                 });
                }
                connection.release();
            });
        }); //retrn promise
    },
    getUsers(){
        return new Promise((resolve,reject)=>{
            conn.getConnection((err,connection)=>{
                if(err){
                    cb(err,null);
                }
                else{
                    connection.query('select * from users',(err,data)=>{
                        if(err)
                        {
                            reject(err);
                        }
                        else if(data)
                        {
                        resolve(data);
                        }
                    });
                }
                connection.release();
          });
        });
    },
    checkEmail(email){
      return new Promise((resolve,reject)=>{
          conn.getConnection((err,connection)=>{
              if(err){reject(err)}
              else{
                  connection.query('select email,password from users where email=?',email,(err,edata)=>{
                    if(err){
                        console.log('chkenail',err);
                        reject(err);
                    }
                    else if(edata.length){
                        console.log('chkemail',edata);
                       resolve(edata[0]['password']); 
                    }
                    else{
                        reject('email dont match');
                    }
                  });
              }
              connection.release();
          });
      });
    },
    matchPass(password,encPass){
        return new Promise((resolve,reject)=>{
                    bcrypt.compare(password,encPass,(err,match)=>{
                       if(err){
                           console.log(err);
                           reject(err);
                       }
                       else if(match){
                          resolve(match)
                       }
                       else{
                           reject('password didnt match');
                       }
                    });
                });  
        }
}