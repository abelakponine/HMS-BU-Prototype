class SecureJS {
    
    /** Data Encryption **/
    constructor(){
        console.log(window, crypto)
    }
    
    /** SHA-256 Crypto Digest: return ArrayBuffer */
    async sha256(msg){
        let encoder = new TextEncoder();
        let  data = encoder.encode(msg)
        const buffer = await crypto.subtle.digest("SHA-256", data);
        return this.bufferToDigestHash(buffer);
    }
    /** SHA-512 Crypto Digest: return ArrayBuffer */
    async sha512(msg){
        let encoder = new TextEncoder();
        let  data = encoder.encode(msg)
        const buffer = await crypto.subtle.digest("SHA-512", data);
        return this.bufferToDigestHash(buffer);
    }
    /** Convert Digest Buffer to Digest Hash */
    bufferToDigestHash(buffer){
        let array = Array.from(new Uint8Array(buffer));
        let hash = array.map(b=>b.toString(16).padStart(2,'0')).join('');
        return hash;
    }
    /** Generate encyption Key (Encryption | Decryption): returns buffer **/
    async generateKey(){
        let key = await window.crypto.subtle.generateKey({
                name: "AES-GCM",
                length: 256
            },
            true,
            ["encrypt", "decrypt"]
        );

        return key
    }
    /** Encrypt Data */
    async encrypt(data, iv, key){
        let encrypted = await window.crypto.subtle.encrypt({
            name: "AES-GCM",
            iv: iv
        },
            key,
            this.encodeData(data)
        );

        return encrypted;
    }
    /** Decrypt Data */
    async decrypt(encrypted_data, iv, key){
        let decrypted = await window.crypto.subtle.decrypt({
            name: "AES-GCM",
            iv: iv
        },
            key,
            encrypted_data
        );

        return this.decodeData(decrypted);
    }
    /** Encode Plain Data */
    encodeData(plain_data){
        let enc = new TextEncoder();
        let encoded = enc.encode(JSON.stringify(plain_data));
        return encoded;
    }
    /** Decode encrypted data */
    decodeData(encrypted_data){
        let dec = new TextDecoder();
        let decoded = dec.decode(encrypted_data);
        let data = JSON.parse(decoded);
        return data;
    }
    /** Creat an Initialization Vector with username and password **/
    async createIV(username, password){
        let enc = new TextEncoder();
        password = await this.sha256(password);

        return (enc.encode(this.sha256(username+password)));
    }
}

export default SecureJS;