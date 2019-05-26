var express = require('express')
var router = express.Router();
const mysql = require('promise-mysql');

var pool = mysql.createPool({
    host: 'den1.mysql4.gear.host',
    user: 'rentalapp',
    password: 'Air@bus360',
    database:'rentalapp'
});

router.post('/registerform',(req,res)=>{
  const {n_apt,s_street,size,price,pet,smoke,comment} = req.body;
  var b_pet = 0;
  var b_smoke = 0;
  if(pet === true){
    b_pet = 1;
  }
  if(smoke === true){
    b_smoke = 1;
  }
  pool.query(`INSERT INTO rentalapp.rent (apt,street,size,pet,smoke,rent,comment) VALUE (${n_apt},"${s_street}",${size},${b_pet},${b_smoke},${price},"${comment}" );`)
  .then(()=>{console.log("sccuess")})
  .catch((err)=>{console.log(err)})
})

router.post('/register_pro',(req,res)=>{
  const{username,email,password} = req.body;
  var x = new Promise((resolve,reject)=>{
    resolve(add_user(username,email,password))
  })
  x.then((val)=>res.json(val));
})




 async function add_user(name,email,password,){
  var result = await pool.query(`SELECT username FROM rentalapp.pro_user WHERE username = '${name}';`);
  if(result == ""){
    pool.query(`INSERT INTO rentalapp.pro_user (username,email,password) VALUE ("${name}","${email}","${password}");`)
    return "success";
  }else{
     console.log("it has a user")
    return "has_user";
  }
}
module.exports = router;