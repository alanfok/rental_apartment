var express = require('express')
var router = express.Router();
const mysql = require('promise-mysql');
const jwt = require('jsonwebtoken');

var pool = mysql.createPool({
    host: 'den1.mysql4.gear.host',
    user: 'rentalapp',
    password: 'Air@bus360',
    database:'rentalapp'
});



//function for register user
router.post('/register',(req,res)=>{
  const{username,email,password} = req.body;
  var x = new Promise((resolve,reject)=>{
    resolve(add_user(username,email,password))
  })
  x.then((val)=>res.json(val));
})

 async function add_user(name,email,password,){
  var result = await pool.query(`SELECT username FROM rentalapp.ten_user WHERE username = '${name}';`);
  if(result == ""){
    pool.query(`INSERT INTO rentalapp.ten_user (username,email,password) VALUE ("${name}","${email}","${password}");`)
    return "success";
  }else{
     console.log("it has a user")
    return "has_user";
  }
}

//login
router.post('/login',(req,res)=>{
  const {username,password} = req.body;
  var  user ={};
  pool.query(`SELECT * FROM rentalapp.ten_user WHERE username='${username}' AND password='${password}';`)
  .then(
    (row)=>
          {
            if(row.length < 1)
            {
                res.json({hasUser: false})
            }
            else
            {
              user = JSON.parse(JSON.stringify(row[0]));
              var username = row[0].username;
              jwt.sign({user},"secretkey",
              (err,token)=>
              {
                res.json({
                  username : username,
                  hasUser: true,
                  token
                })
              }
              )
            }
          }
  )
  
  //res.json()
  
  });
  
  
  
  router.post('/test',verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey' , (err,authData)=>{
      if(err){
        res.sendStatus(403);
      }
      else{
        res.json({
          message:"test",
          authData
      })
      }
    });
  })
  
  function verifyToken(req,res,next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else{
      res.sendStatus(403);
    }
  
  }




  router.post('/search', (req,res,next)=>{
        const {city} = req.body;
        //SELECT  rentalapp.rent.*,rentalapp.to_rent.isOcuppied, rentalapp.to_rent.telant_id  FROM rentalapp.rent inner JOIN rentalapp.to_rent where rentalapp.rent.city = 'Winnipeg' AND rentalapp.rent.id = rentalapp.to_rent.id;
        //pool.query(`SELECT rentalapp.rent.* FROM rentalapp.rent Where city = "${city}"`)
        pool.query(`SELECT  rentalapp.rent.*,rentalapp.to_rent.isOcuppied, rentalapp.to_rent.telant_id  FROM rentalapp.rent inner JOIN rentalapp.to_rent where rentalapp.rent.city = '${city}' AND rentalapp.rent.id = rentalapp.to_rent.id`)
        .then((row)=>{res.json({apartment : row});
        console.log(row);
        });
  })




module.exports = router;