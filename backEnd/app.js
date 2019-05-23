const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('promise-mysql');
const cors = require('cors')

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());  
app.use(cors());

var pool = mysql.createPool({
    host: 'den1.mysql4.gear.host',
    user: 'rentalapp',
    password: 'Air@bus360',
    database:'rentalapp'
});




app.get('/', (req,res)=>{
    res.send("hello");
})


app.post('/',(req,res)=>{
    var {name, password} = req.body;
    pool.query(`INSERT INTO rentalapp.test (name, password) VALUES ('${name}','${password}');`)
    .then(console.log("sccess"))
    .then( ()=>{res.send(name + " " + password);}
    )
    .catch(
        (err)=>{console.log(err);}
    )
    
})

app.listen(port, ()=>{
    console.log("it's running on port "+ port)
})

