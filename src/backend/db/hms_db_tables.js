const express = require('express');
const db = require('./hms_db_conn');
const Router = express.Router();

Router.get("/", (req, res)=>{
    let response = [];

    /** Create HMS Accounts */
    db.query(`CREATE TABLE IF NOT EXISTS accounts (id INT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY, userdata longtext NOT NULL, validator longtext NOT NULL)`, (err, rows, fields)=>{

        if (!err){
            response.push('Table account created successfully.');
            res.send(response);
        }
        else {
            response.push(err);
            res.send(response);
        }
    });

});

setInterval(()=>{
    db.query('SELECT COUNT(*) AS NUM_OF_ACCT From accounts', (err, rows, fields)=>{
        console.log('hms db pinged.')
    });
}, 60000 * 5);

module.exports = Router;
