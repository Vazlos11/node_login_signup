const mysql = require('mysql');
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'login_db'
});

db.connect((err)=>{
    if(err)throw err;
    console.log('Conectado a MySQL');
})
module.exports = db;