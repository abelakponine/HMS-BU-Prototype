const { webcrypto } = require('crypto');

rsaKeyPair = webcrypto.subtle.generateKey({
        name: 'RSA-OAEP',
        modulusLength: 4096,
        publicExponent: new Uint8Array([1,0,1]),
        hash: 'SHA-256'
    },
        true,
        ["encrypt", "decrypt"]

    ).then((data)=>{
        // console.log(data.privateKey)
        webcrypto.subtle.exportKey('pkcs8', data.privateKey).then(key=>{
            console.log(key)
        })
    });

aesKeyPair = webcrypto.subtle.generateKey({
        name: 'aes-gcm',
        length: 256
    }, true, ['encrypt', 'decrypt']).then(data=>{
        webcrypto.subtle.exportKey('raw', data).then(key=>{
            // console.log(key)
        })
    });

console.log(rsaKeyPair);