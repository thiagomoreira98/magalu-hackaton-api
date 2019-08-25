const config = require('../../config/settings'),
    Blowfish = require('blowfish');

module.exports = {
    encrypt,
    decrypt
}

function encrypt(text) {
    let blowfish = new Blowfish(config.crypt.key);
    return blowfish.encrypt(text);
}

function decrypt(text) {
    let blowfish = new Blowfish(config.crypt.key);
    return blowfish.decrypt(text).replace(/\0/g, '');;
}