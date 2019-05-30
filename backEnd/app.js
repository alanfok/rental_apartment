const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('promise-mysql');
const cors = require('cors')
// const https = require('https')
// const fs = require('fs')

var proprietor = require('./proprietor')
 
// var options = {
//     key: fs.readFileSync('./security/key.pem'),
//     cert: fs.readFileSync('./security/key-cert.pem')
//   };
  

const app = express();
const port = process.env.PORT||5000 ;




app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());  
app.use(cors());

var pool = mysql.createPool({
    host: 'den1.mysql4.gear.host',
    user: 'rentalapp',
    password: 'Air@bus360',
    database:'rentalapp'
});


app.use('/proprietor',proprietor);

app.get('/', (req,res)=>{
    res.send("hello");
})



app.post('/',(req,res)=>{
    var {name, password} = req.body;
    pool.query(`INSERT INTO rentalapp.test (name, password) VALUES ('${name}','${password}');`)
    .then(console.log("sccess"))
    .then(
        res.json({test: "yes"})
    )
    .catch(
        (err)=>{console.log(err);}
    )
    
})


// https.createServer(options, function (req, res) {
//     res.writeHead(200);
//     res.end("hello world\n");
//   }).listen(port);

app.listen(port, ()=>{
    console.log("it's running on port "+ port)
})

