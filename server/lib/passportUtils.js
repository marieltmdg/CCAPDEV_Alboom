const crypto = require("crypto");

function generatePassword(password) {
    var salt = crypto.randomBytes(32).toString("hex");
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

    return {
        salt: salt,
        hash: genHash,
    };
}

function validatePassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return hash === hashVerify;
}

module.exports.validatePassword = validatePassword;
module.exports.generatePassword = generatePassword;