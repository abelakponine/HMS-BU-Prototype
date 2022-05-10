const db = require("mysql");

const conn = db.createConnection({
    host: '34.142.90.193', //"localhost"
    port: 3306,
    user: "pekaboom",
    password: "pekaboom-mysql",
    database: "HMS",
    multipleStatements: true
});

conn.connect((err)=>{
    if (!err){
        console.log('HMS Mysql server Connected.');
    }
    else {
        console.log(err);
    }
});

module.exports = conn;