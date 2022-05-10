const express  = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const SecureJS = require('../views/modules/secureJs-server');
const fs = require('fs');
const hms_db = require('./db/hms_db_tables');
const formidable = require("formidable");
const hms_handler = require('./hms_handler');
const secureJs = new SecureJS();
const fetch = require('node-fetch');
const {Server} = require('socket.io');

/** Generated application key, used for added salt and data encryption */
const APP_KEY = '6dc1fa28ab2ed5527aa1a277a0cdf6d934a1dcacfd580825395f9843b3f41e91'; // application key

/** CORS */
const allowedOrigins = ["https://pekaboom.com", "https://www.pekaboom.com", "https://server.pekaboom.com", "https://hms.pekaboom.com"];

allowedOrigins.push("http://localhost:3000");
allowedOrigins.push("http://localhost:3001");
allowedOrigins.push('http://localhost:5000');
// allowedOrigins.push('http://192.168.179.150:3001');

app.use((req, res, next)=>{
    originIndex = allowedOrigins.indexOf(req.headers.origin);
    res.header("Access-Control-Allow-Origin", allowedOrigins[originIndex]);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.urlencoded({extended:true}));
app.use(express.json());

/** Database Tables */
app.use('/hms_handler', hms_handler);
app.use('/hms_handler/create_db', hms_db);

/** Server check */
app.get("/server/", (req, res)=>{
    res.send("Hello! Server")
});


/** App Version */
app.get('/', (req, res)=>{
    res.send('Hello World!');
});

/** Registration API endpoint */
app.post("/register", async (req, res)=>{
    let userdata = req.body;

    if (userdata){

        userdata.password = secureJs.sha256(userdata.password, 'hex'); // encrypt user password

        /** create secured account */
        if (userdata.username !== '' && userdata.password !== '' && userdata.email !== '' && userdata.firstname !== '' && userdata.lastname !== ''){

            if ((await getUserDbData(userdata)).status == false){

                /** Encrypt user data */

                let key = await secureJs.generateKey();
                let credentials = userdata.username+secureJs.sha256(userdata.password, 'hex')+APP_KEY;
                let iv = secureJs.createIv(credentials);
                let filePath = secureJs.sha256(userdata.username+iv, 'hex')+'.sec';
                
                let signature = JSON.stringify({
                    key: key.export(),
                    email: userdata.email,
                    username: userdata.username
                });

                fs.writeFileSync('./encrypted/accounts/'+filePath, signature); // export key

                cipher = secureJs.createCipher(userdata, key, iv); // encrypt userdata

                /** create user database */
                db.query(`INSERT INTO accounts (userdata, password) VALUES (${JSON.stringify(encodeURI(cipher))}, '${userdata.password}')`, async (err, rows, fields)=>{
                    if (!err){
                        db.query(`SELECT * FROM accounts WHERE userdata = ${JSON.stringify(encodeURI(cipher))} AND password = '${userdata.password}'`, (err, rows, fields)=>{

                            if (!err){
                                
                                db.query(`INSERT INTO profiles (uid, avatar, about_me, schoolsAttended) VALUES (${rows[0].id}, '/images/avatar.png', "Hey there! let's boom! together :\)", '[]')`, (err, rows, fields)=>{
                                    if (!err){
                                        res.send({
                                            status:true,
                                            message:'account created',
                                            code: 1
                                        });
                                    }
                                    else {
                                        res.send({
                                            status: false,
                                            error: "SQL: "+err.sqlMessage,
                                            code: 0
                                        });
                                    }
                                });
                            }
                            else{
                                
                                res.send({
                                    status: false,
                                    error: "SQL: "+err.sqlMessage,
                                    code: 0
                                });
                            }
                        });
                    }
                    else{
                        
                        res.send({
                            status: false,
                            error: "SQL: "+err.sqlMessage,
                            code: 0
                        });
                    }
                });
            }
            else {
                res.send({
                    status: false,
                    error: 'User account already exists.',
                    code: -1
                })
            }
        }
        else {
            res.send({
                status: false,
                error: 'Unable to create account, Please ensure to fill all mandatory form fields.',
                code: -2
            })
        }
    }
});

app.post('/secret-key', (req, res)=>{
    let credentials = userdata.username+secureJs.sha256(userdata.password, 'hex')+APP_KEY;
    let iv = secureJs.createIv(credentials);
    let filePath = secureJs.sha256(userdata.username+iv, 'hex')+'.sec';
    let key = fs.readFileSync('./encrypted/accounts/'+filePath);

    res.send({
        status: true,
        key: key
    });
});

/** Login API endpoint */
app.post('/login', async (req, res)=>{
    let userdata = req.body;
    userdata.password = secureJs.sha256(userdata.password, 'hex'); // secure login password

    try {
        let credentials = userdata.username+secureJs.sha256(userdata.password, 'hex')+APP_KEY;
        let iv = secureJs.createIv(credentials);
        let filePath = secureJs.sha256(userdata.username+iv, 'hex')+'.sec';
        let signature = JSON.parse(fs.readFileSync('./encrypted/accounts/'+filePath));

        if (signature.username == userdata.username ||
            signature.username == userdata.email){
            
            let response = await getUserDbData(userdata);

            if (response.status){
                res.send({
                    status: true,
                    message: 'Login successful.'
                });
            }
            else {
                res.send(response);
            }
        }
        else {
            res.send({
                status: false,
                error: 'Login failed, please ensure you are using the correct login credentials.'
            })
        }
    }
    catch (err){
        res.send({
            status: false,
            error: 'Login failed, please ensure you are using the correct login credentials.'
        })
    }
});

/** Fetch decrypted user data for logged in used */
app.post('/my-data', async (req, res)=>{

    let userdata = JSON.parse(req.body.data);
    userdata.password = secureJs.sha256(userdata.password, 'hex');
    let myData = await getUserDbData(userdata);

    res.send(myData);
});

app.post('/userdata', async (req, res)=>{
    let userdata = await getUserDbData(req.body);
    res.send(userdata);
});

app.get('/userprofile/:uid', (req, res)=>{
    let uid = req.params.uid;
    db.query(`SELECT * FROM profiles WHERE uid = ${uid}`, (err, rows, fields)=>{

        if (!err){
            if (rows.length > 0){
                res.send({status: true, data: rows[0]});
            }
            else {
                res.send({status: false, data: 'Unable to retrieve userdata with the provided ID'});
            }
        }
        else {
            res.send({status:false, data: err});
        }
    });
});

/** Decrypt encrypted database userdata */
function decryptAccount(userdata, enc_data){
    let credentials = userdata.username+secureJs.sha256(userdata.password, 'hex')+APP_KEY;
    let iv = secureJs.createIv(credentials);
    let filePath = secureJs.sha256(userdata.username+iv, 'hex')+'.sec';
    let signature = JSON.parse(fs.readFileSync('./encrypted/accounts/'+filePath));
    let key = Buffer.from(signature.key);
    
    return secureJs.createDecipher(decodeURI(enc_data), key, iv);
}

/** Method to fetch and decrypt encrtpted userdata from database: returns JSONObject */
async function getUserDbData(userdata){

    return new Promise((res, rej)=>{

            db.query(`SELECT id, userdata FROM accounts WHERE password = '${userdata.password}'`, (err, rows, fields)=>{
                
                if (!err){
                    
                    if (rows.length > 0){

                        try {
                            let decrypted = decryptAccount(userdata, rows[0].userdata);

                            decrypted.id = rows[0].id;

                            /** Get profile data */
                            db.query(`SELECT * FROM profiles WHERE uid = ${decrypted.id}`, (err, rows, fields)=>{

                                if (!err){
                                    decrypted.profileData = rows[0];
                                    res({
                                        status: true,
                                        data: decrypted,
                                        code: 1
                                    });
                                }
                                res({
                                    status: false,
                                    error: 'Unable to decrypt credentials, ensure that the provided credentials are correct.',
                                    code: 0
                                })
                            });
                        }
                        catch(err){
                            console.log(err)
                            res({
                                status: false,
                                error: 'Unable to decrypt credentials, ensure that the provided credentials are correct.',
                                code: 0
                            })
                        }
                    }
                    else {
                        res({
                            status: false,
                            error: 'Invalid credentials, please ensure to enter the correct login details.',
                            code: -1
                        });
                    }
                }
                else {
                    res({
                        status: false,
                        error: err,
                        code: -2
                    });
                }
            });
    });
}

/** Check if an account exists */
app.post('/check-user', (req, res)=>{
    let userdata = req.body;

    db.query(`SELECT COUNT(*) FROM accounts WHERE password = '${userdata.password}'`, (err, rows, fields)=>{

        if (!err && rows.length > 0){
            res.send({
                status: true,
                message: "User account exists."
            })
        }
        else {
            res.send({
                status: false,
                message: "Account not found."
            })
        }
    })
});

app.get('/ping', (req, res)=>{
    
    res.send({
        status: true,
        message: 'Server running'
    });
})

setInterval(async ()=>{
    let dat = await fetch('http://server.pekaboom.com/ping').then(data=>{
        return data.json();
    });

    console.log(dat);
}, 60000 * 5);

/** Start node backend server */
server.listen(process.env.PORT || 5000, (err)=>{
    console.log("\r\nReact Backend Server started at 5000\r\n");
});

/** Socket.Io (WebSocket Server) */
const io = new Server(5001, {
    cors: {
        origin: "*"
    }
});

io.of('/hms').on('connection', function(socket){

    console.log('A user connected');

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });

    socket.emit("hms-message", "Hello! how can I help you? <br/>Note: this is a demo message :) all your responses will be reproduced from the websocket server.");

    socket.on('hms-message', (res)=>{
        socket.emit("hms-message","(Server) Your response was:<br/>"+res);
    });

});
