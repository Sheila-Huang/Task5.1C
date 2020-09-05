const https = require("https")
const express = require("express")
const bodyParser = require("body-parser")
const userSchema = require('../model/users.js');
const mongoose = require("mongoose")
const validator = require("validator")
//var bcrypt=require('bcryptjs')
const crypto = require('crypto')
//const model=require('../model')

module.exports=function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/reqtask',function(req,res,next) {    // reqtask
        res.sendfile(__dirname+'/reqtask.html');
    });

    app.get('/reqlogin', function(req,res,next) {    // login
        res.sendfile(__dirname+'/reqlogin.html');
    });
    app.post('/reqlogin', function(req,res,next) {    // login
        //find

       var  email =req.body.email
         var Psw = req.body.password
        
        //  const saltRounds = 10;
        //  //random
        // var salt =  bcrypt.genSaltSync(saltRounds);
        //  var hash =  bcrypt.hashSync(UserPsw, salt);

        // console.log(hash)
        //  UserPsw = hash;
    //     let email = req.body.email;
    //    let psw = req.body.password;
    //brcypt
        var md5 = crypto.createHash('md5');
       var newPas = md5.update(Psw).digest('hex');
        // 
        // const saltRounds = 10;
        
        // const salt =  bcrypt.genSaltSync(saltRounds);
    
        // var hash =  bcrypt.hashSync(UserPsw, salt);
        // console.log(hash)
        // newPsw = hash;

        var updatestr = {email:email,psw:newPas};
          //
          
        userSchema.find(updatestr, function(err,obj) {
            if (err) {
                return (err);
            } else {
                if (obj.length == 1) {  
                    
                    res.sendFile(__dirname+'/reqtask.html');
                } else {
                    
                    res.sendFile(__dirname+'/index.html');
                }
            }
        })
       
        
    })
        // mongoose.connect((db) => {
        //     db.collection('users').find(updatestr).toArray((err, docs) => {
        //       if (err) {
        //         res.redirect('/reqlogin');
        //         console.log('账号或密码错误');
        //       } else {
        //         if (docs.length > 0) {
        //           //登录成功,进行session会话存储
        //           req.session.username = data.username;
        //           res.sendfile(__dirname+'/reqtask.html');
        //           console.log('登录成功');
        //         } else {
        //           res.redirect('/login');
        //         }
        //       }
        //     })
        //   })
    //    

   

app.get('/', function(req,res,next) {   
  res.sendfile(__dirname+'/index.html');
    });

    
    app.post('/', function(req,res,next) { 
         // 注册
        

        var firstname =req.body.first_name
        var  lastname =req.body.last_name
        var email = req.body.email
        var  Psw =req.body.password
        var  zp =req.body.zp
        var ad = req.body.address
        var phonenumber =req.body.phone
        var  state=req.body.state
        var  city = req.body.city
        var  cpsw=req.body.cpassword

        var md5 = crypto.createHash('md5');
        var newPas = md5.update(Psw).digest('hex');
          
        var updatestr = {email: email};
       
        // const saltRounds = 10;
        
        // const salt = bcrypt.genSaltSync(saltRounds);
    
        // var hash = bcrypt.hashSync(psw, salt);
        // console.log(hash)
        // psw = hash;
        var user = new userSchema({
            fname : firstname,
            lname: lastname,
            email: email,
            psw:newPas,
            phonenumber:phonenumber,
            city:city,
            state:state
        })   

        userSchema.find(updatestr, function(err,obj) {
            if (err) {
                return(err);
            } else {
                if (obj.length == 0) {   // 查出来是一个数组
                    // 查不到数据，插入数据库
                    
                    user.save()
                    .catch((err) => console.log(err));
                        if (err) {
                           
                            res.sendFile(__dirname+'/index.html');
                        } else {
                          
                            res.sendFile(__dirname+'/reqlogin.html');  // 注册成功返回主页（不要返回/login，因为此时login路由中有redirect，会导致服务器返回两次而出错）
                        }
                    
                    
                } else if (obj.length != 0) {
                   
                    res.sendFile(__dirname+'/index.html');
                }
            }
        });

const data={

    members:[{
        email_address: email,
        status:"subscribed",
        merge_field:{
            FNAME:firstname,
            LNAME:lastname
        }
    }]
}
jsonData=JSON.stringify(data)



const apiKey="26a8adae360661dd035649329f24a029-us17"
const list_id="047cdfd730"

const url="https://us17.api.mailchimp.com/3.0/lists/047cdfd730"
const options={

    method:'POST',
    auth:"azi:26a8adae360661dd035649329f24a029-us17"
  }

const request=https.request(url,options,(response)=>{

response.on("data",(data)=>{
console.log(JSON.parse(data))

})

})
request.write(jsonData)
    request.end()
    console.log(firstname,lastname,email)



// if (res.statusCode === 200)
//          {    
//          res.redirect('/reqlogin'); 
//           //  res.type('html');
//         //     res.sendFile(__dirname + "/success.html")
//         }
//         else 
//         { 
//         res.sendFile(__dirname + "/404.html")
//         }

})

}


         