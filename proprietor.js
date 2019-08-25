var express = require('express')
var router = express.Router();
const mysql = require('promise-mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var pool = mysql.createPool({
    host: 'den1.mysql4.gear.host',
    user: 'rentalapp',
    password: 'Air@bus360',
    database:'rentalapp'
});

router.post('/registerform',(req,res,next)=>{
  const {s_name,n_apt,s_street,size,city,price,pet,smoke,comment} = req.body;
  var b_pet = 0;
  var b_smoke = 0;

  if(pet === true){
    b_pet = 1;
  }
  if(smoke === true){
    b_smoke = 1;
  }
  pool.query(`INSERT INTO rentalapp.rent (apt,street,size,city,pet,smoke,rent,comment) VALUE (${n_apt},"${s_street}",${size},"${city}",${b_pet},${b_smoke},${price},"${comment}" );`)
  .then(()=>{
       var result = assignToOwner(s_name,n_apt,s_street);
       if(!result)
       {
          throw new Error("rww");
       }
  })
  .then(()=>{
    res.json({message: "success"});
    next();
  }
    )
  .catch((err)=>{
    res.json({message: "failed"});
    next();
    console.log(err)
  }
    
  )
})

//assign the apartment to owner
assignToOwner =  async (owner, apt, street)=>{
  const getID = new Promise ((resolve, reject)=>resolve(pool.query(`SELECT id FROM rentalapp.rent WHERE apt=${apt} AND street = "${street}";`)))
  var row = await getID;
  var rowNumberCheck = 0;

  while(row==null || rowNumberCheck ==10)
  {
    rowNumberCheck= rowNumberCheck +1;
    row = await getID;
  }

  const into = new Promise((resolve,reject)=>resolve(pool.query(`INSERT INTO rentalapp.ownto (owner,id) VALUE ("${owner}",${row[0].id});`)))
  const isOccupied = new Promise((resolve,reject)=>{resolve(pool.query(`INSERT INTO rentalapp.to_rent (id,isOcuppied,telant_id) VALUE (${row[0].id},0,0);`))})
  var result = await into;
  var anotherResult = await isOccupied;
  console.log(anotherResult);
  
  //pool.query(`INSERT INTO rentalapp.ownto (owner,id) VALUE ("${owner}",${row[0].id});`)
 
  if(rowNumberCheck == 10)
  {
      return false;
  }
  else
  {
    return true;
  }
}



router.post('/register',(req,res)=>{
  const{username,email,password} = req.body;
  var x = new Promise((resolve,reject)=>{
    resolve(add_user(username,email,password))
  })
  x.then((val)=>res.json(val));
})


//function for register user
 async function add_user(name,email,password,){
  var result = await pool.query(`SELECT username FROM rentalapp.pro_user WHERE username = '${name}';`);
  var hash = bcrypt.hashSync(password, saltRounds);
  if(result == ""){
    pool.query(`INSERT INTO rentalapp.pro_user (username,email,password) VALUE ("${name}","${email}","${hash}");`)
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
  pool.query(`SELECT * FROM rentalapp.pro_user WHERE username='${username}';`)
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
              var hash = row[0].password;
              var match = bcrypt.compareSync(password, hash); 
              if(match)
              {
                jwt.sign({user},"secretkey",
                (err,token)=>
                {
                  res.json({
                    username : username,
                    hasUser: true,
                    token
                  })
                })
              }
              else
              {
                res.json({hasUser: false})
              }
            }
          }
  )
 
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

router.post('/fetch',(req,res)=>{
  const {owner}=req.body
  pool.query(`SELECT rentalapp.rent.* ,rentalapp.to_rent.isOccupied ,rentalapp.to_rent.telant_id FROM rentalapp.rent inner join rentalapp.ownto on rentalapp.rent.id = rentalapp.ownto.id And rentalapp.ownto.owner = "${owner}" inner join rentalapp.to_rent on rentalapp.rent.id = rentalapp.to_rent.id;`)
  .then((row)=>{
    res.json({apt : row})})
})

  
router.post('/deleteApt',(req,res,next)=>{
  const {id}=req.body
   pool.query(`DELETE FROM rentalapp.rent WHERE id=${id}`)
   .then(
     pool.query(`DELETE FROM rentalapp.ownto WHERE id=${id}`)
   )
   .then(
    pool.query(`DELETE FROM rentalapp.to_rent WHERE id=${id}`)
   )
   .then(
     res.json({message: "success"})
   )
   .then(next())
})




module.exports = router;