const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('promise-mysql');
const cors = require('cors')
const path = require('path');

var proprietor = require('./proprietor')


const app = express();
const port = process.env.PORT||5000 ;

app.use(express.static(path.join(__dirname, 'frontEnd/build')));


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());  
app.use(cors());

var pool = mysql.createPool({
    host: 'den1.mysql4.gear.host',
    user: 'rentalapp',
    password: 'Air@bus360',
    database:'rentalapp'
});


app.use('/api/proprietor',proprietor);

app.get('/fd', (req,res)=>{
    res.send("hello");
})



app.post('/test',(req,res)=>{
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

app.listen(port, ()=>{
    console.log("it's running on port "+ port)
})

