const crypto = require('crypto');

class SecureJS_Server {

    /** Generate KeyObject: KeyObject */
    generateKey(){
        let bytes = Buffer.from(crypto.randomBytes(32));
        return crypto.createSecretKey(bytes);
    }
    sha256(data, format=null){
        let enc = new TextEncoder();
        data = this.stringify(data);
        data = enc.encode(data);
        let hash = crypto.createHash('sha256').update(data, 'utf8').digest(format);

        return hash;
    }
    sha512(data, format=null){
        let enc = new TextEncoder();
        data = this.stringify(data);
        data = enc.encode(data);
        let hash = crypto.createHash('sha512').update(data, 'utf8').digest(format);

        return hash;
    }
    createIv(credentials){
        let data = this.stringify(credentials);
        let enc = new TextEncoder();
        let iv = this.sha512(enc.encode(data));
        return iv;
    }

    /**
     * Method used for creating encrypted cipher text 
     * @param data: raw data to be encrypted i.e, without applying JSON.stringify
     * @param key: generated key using "@method SubtleCrypto.generateKey"
     * @param iv: generated IV using "@method secureJS.createIv" */
    
    createCipher(data, key, iv, format='binary'){
        let cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        let array = cipher.update(this.stringify(data), 'utf8', format);
        return array;
    }
    createDecipher(data, key, iv, format='binary'){
        let decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        data = decipher.update(data, format, 'utf8');
        
        return this.parse(data);
    }
    stringify(data){
        return JSON.stringify(data);
    }
    parse(data){
        return JSON.parse(data);
    }
}

module.exports = SecureJS_Server;