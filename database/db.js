const mysql = require('mysql');

const dbConfig = {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'form_reg'
}

// Create connection
const db = mysql.createConnection(dbConfig);

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('DB Connected...');
});

module.exports =  db;
