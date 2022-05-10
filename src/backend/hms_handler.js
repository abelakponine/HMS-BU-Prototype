const express = require('express');
const Router = express.Router();
const secureJs = new (require('../views/modules/secureJs-server'))();
const db = require('./db/hms_db_conn');
const fs = require('fs');
const { response } = require('express');

var reg_count = 999;
var accounts = [];

const APP_KEY = '6dc1fa28ab2ed5527aa1a277a0cdf6d934a1dcacfd580825395f9843b3f41e92'; // application key

Router.post('/login', async (req, res)=>{
    let {userdata} = req.body;
    userdata.password = secureJs.sha256(userdata.password, 'hex'); // secure login password

    try {
        let credentials = userdata.username+secureJs.sha256(userdata.password, 'hex')+APP_KEY;
        let iv = secureJs.createIv(credentials);
        let filePath = secureJs.sha256(userdata.username+iv, 'hex')+'.sec';
        let signature = JSON.parse(fs.readFileSync('./encrypted/accounts/'+filePath));
        let key = Buffer.from(signature.key);

        
        if (signature.username == userdata.username ||
            signature.username == userdata.email){
            
            validator = secureJs.createCipher(credentials, key, iv); // account validator
            let response = await getUserHMSData(userdata, validator);
            
            console.log(response);

            if (response.status){
                res.send({
                    status: true,
                    response: response,
                    message: 'Login successful.'
                });
            }
            else {
                res.send({
                    status: true,
                    response: response,
                    message: 'Login failed: Invalid credentials.'
                });
            }
        }
        else {
            throw new Error({
                status: false,
                error: 'Login failed, please ensure you are using the correct login credentials.'
            })
        }
    }
    catch (err){
        res.send({
            status: false,
            error: 'Login failed, please ensure you are using the correct login credentials.',
            err: err
        })
    }
});

/** Staff registration handler */
Router.post('/inst_reg', async (req, res)=>{
    let {regdata} = req.body;
    delete regdata.handler;
    accounts.push(regdata);
    
    if (regdata){
        regdata.password = secureJs.sha256(regdata.password, 'hex'); // encrypt user password

        /** create secured account */
        if (regdata.username !== '' && regdata.password !== '' && regdata.email !== '' && regdata.firstname !== '' && regdata.lastname !== ''){

            try {
                let credentials = regdata.username+secureJs.sha256(regdata.password, 'hex')+APP_KEY;
                let iv = secureJs.createIv(credentials);
                let filePath = secureJs.sha256(regdata.username+iv, 'hex')+'.sec';
                let signature = JSON.parse(fs.readFileSync('./encrypted/accounts/'+filePath));
                let key = Buffer.from(signature.key);

                /** Check if user exists */
                
                validator = secureJs.createCipher(credentials, key, iv); // account validator
                let response = await getUserHMSData(regdata, validator);
                
                if (response.status){
                    res.send({
                        status: false,
                        message: 'User already exists.'
                    });
                }
                else {
                    throw new Error('User not founnd.')
                }
            }  
            catch (e){
                
                /** Encrypt user data */

                let key = await secureJs.generateKey();
                let credentials = regdata.username+secureJs.sha256(regdata.password, 'hex')+APP_KEY;
                let iv = secureJs.createIv(credentials);
                let filePath = secureJs.sha256(regdata.username+iv, 'hex')+'.sec';

                let signature = JSON.stringify({
                    key: key.export(),
                    email: regdata.email,
                    username: regdata.username
                });

                fs.writeFileSync('./encrypted/accounts/'+filePath, signature); // export key

                cipher = secureJs.createCipher(regdata, key, iv); // encrypt regdata
                validator = secureJs.createCipher(credentials, key, iv); // account validator

                
                /** create user database */
                db.query(`INSERT INTO accounts (userdata, validator) VALUES (${JSON.stringify(encodeURI(cipher))}, ${JSON.stringify(encodeURI(validator))})`, async (err, rows, fields)=>{
                    if (!err){
                        db.query(`SELECT * FROM accounts WHERE userdata = ${JSON.stringify(encodeURI(cipher))}`, (err, rows, fields)=>{

                            if (!err){
                                
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

/** Staff registration handler */
Router.post('/staff_reg', async (req, res)=>{
    let {regdata} = req.body;
    delete regdata.handler;
    accounts.push(regdata);
    
    if (regdata){
        regdata.password = secureJs.sha256(regdata.password, 'hex'); // encrypt user password

        /** create secured account */
        if (regdata.username !== '' && regdata.password !== '' && regdata.email !== '' && regdata.firstname !== '' && regdata.lastname !== ''){

            try {
                let credentials = regdata.username+secureJs.sha256(regdata.password, 'hex')+APP_KEY;
                let iv = secureJs.createIv(credentials);
                let filePath = secureJs.sha256(regdata.username+iv, 'hex')+'.sec';
                let signature = JSON.parse(fs.readFileSync('./encrypted/accounts/'+filePath));
                let key = Buffer.from(signature.key);

                /** Check if user exists */
                
                validator = secureJs.createCipher(credentials, key, iv); // account validator
                let response = await getUserHMSData(regdata, validator);
                
                if (response.status){
                    res.send({
                        status: false,
                        message: 'User already exists.'
                    });
                }
                else {
                    throw new Error('User not founnd.')
                }
            }  
            catch (e){
                
                /** Encrypt user data */

                let key = await secureJs.generateKey();
                let credentials = regdata.username+secureJs.sha256(regdata.password, 'hex')+APP_KEY;
                let iv = secureJs.createIv(credentials);
                let filePath = secureJs.sha256(regdata.username+iv, 'hex')+'.sec';

                let signature = JSON.stringify({
                    key: key.export(),
                    email: regdata.email,
                    username: regdata.username
                });

                fs.writeFileSync('./encrypted/accounts/'+filePath, signature); // export key

                cipher = secureJs.createCipher(regdata, key, iv); // encrypt regdata
                validator = secureJs.createCipher(credentials, key, iv); // account validator

                
                /** create user database */
                db.query(`INSERT INTO accounts (userdata, validator) VALUES (${JSON.stringify(encodeURI(cipher))}, ${JSON.stringify(encodeURI(validator))})`, async (err, rows, fields)=>{
                    if (!err){
                        db.query(`SELECT * FROM accounts WHERE userdata = ${JSON.stringify(encodeURI(cipher))}`, (err, rows, fields)=>{

                            if (!err){
                                
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

/** Regular user registration handler */
Router.post('/user_reg', async (req, res)=>{
    let {regdata} = req.body;
    delete regdata.handler;
    accounts.push(regdata);
    
    if (regdata){
        regdata.password = secureJs.sha256(regdata.password, 'hex'); // encrypt user password

        /** create secured account using AES encrypption */
        if (regdata.username !== '' && regdata.password !== '' && regdata.email !== '' && regdata.firstname !== '' && regdata.lastname !== ''){

            try {
                let credentials = regdata.username+secureJs.sha256(regdata.password, 'hex')+APP_KEY;
                let iv = secureJs.createIv(credentials);
                let filePath = secureJs.sha256(regdata.username+iv, 'hex')+'.sec';
                let signature = JSON.parse(fs.readFileSync('./encrypted/accounts/'+filePath));
                let key = Buffer.from(signature.key);

                /** Check if user exists */
                
                validator = secureJs.createCipher(credentials, key, iv); // account validator
                let response = await getUserHMSData(regdata, validator);
                
                if (response.status){
                    res.send({
                        status: false,
                        message: 'User already exists.'
                    });
                }
                else {
                    throw new Error('User not founnd.')
                }
            }  
            catch (e){
                
                /** Encrypt user data */

                let key = await secureJs.generateKey();
                let credentials = regdata.username+secureJs.sha256(regdata.password, 'hex')+APP_KEY;
                let iv = secureJs.createIv(credentials);
                let filePath = secureJs.sha256(regdata.username+iv, 'hex')+'.sec';

                let signature = JSON.stringify({
                    key: key.export(),
                    email: regdata.email,
                    username: regdata.username
                });

                fs.writeFileSync('./encrypted/accounts/'+filePath, signature); // export key

                cipher = secureJs.createCipher(regdata, key, iv); // encrypt regdata
                validator = secureJs.createCipher(credentials, key, iv); // account validator

                
                /** create user database */
                db.query(`INSERT INTO accounts (userdata, validator) VALUES (${JSON.stringify(encodeURI(cipher))}, ${JSON.stringify(encodeURI(validator))})`, async (err, rows, fields)=>{
                    if (!err){
                        db.query(`SELECT * FROM accounts WHERE userdata = ${JSON.stringify(encodeURI(cipher))}`, (err, rows, fields)=>{

                            if (!err){
                                
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

/** Method to fetch and decrypt encrtpted regdata from database: returns JSONObject */
async function getUserHMSData(userdata, validator){

    return new Promise((res, rej)=>{

            db.query(`SELECT id, userdata FROM accounts WHERE validator = ${JSON.stringify(encodeURI(validator))}`, (err, rows, fields)=>{
                
                if (!err){
                    
                    if (rows.length > 0){

                        try {
                            let decrypted = decryptAccount(userdata, rows[0].userdata);

                            decrypted.id = rows[0].id;

                            res({
                                status: true,
                                data: decrypted,
                                code: 1
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

/** Decrypt encrypted database userdata */
function decryptAccount(userdata, enc_data){
    let credentials = userdata.username+secureJs.sha256(userdata.password, 'hex')+APP_KEY;
    let iv = secureJs.createIv(credentials);
    let filePath = secureJs.sha256(userdata.username+iv, 'hex')+'.sec';
    let signature = JSON.parse(fs.readFileSync('./encrypted/accounts/'+filePath));
    let key = Buffer.from(signature.key);
    
    return secureJs.createDecipher(decodeURI(enc_data), key, iv);
}

module.exports = Router;
