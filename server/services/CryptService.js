const Bcrypt = require('bcrypt');
const crypto = require('crypto')
const BCRYPT_WORK_FACTOR  = 12;


function CryptService(){

    async function encPass(plainPass){
        let hash = crypto.createHash('sha256').update(plainPass).digest('base64')
        let crypted = await Bcrypt.hash(hash,BCRYPT_WORK_FACTOR);
        return crypted;
    }

    async function cmpPass(plainPass,hashed){
        let hash = crypto.createHash('sha256').update(plainPass).digest('base64')
        let samePass = await Bcrypt.compare(hash,hashed)
        return samePass;
    }

    return {
        encPass,
        cmpPass
    }
}

module.exports = CryptService();