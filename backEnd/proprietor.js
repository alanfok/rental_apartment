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
  const {n_apt,s_street,size,price,pet,smoke} = req.body
    console.log(n_apt + s_street+ size + pet +smoke + price)
})



module.exports = router;