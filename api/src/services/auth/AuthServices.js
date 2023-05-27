const User = require("../../models/User");
const bcrypt = require('bcrypt');

const saltRounds = 10;

const checkEmailExits = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const findUserByEmail = await User.findOne({ email: email });

            if (!findUserByEmail) {
                resolve(false)
            }

            resolve(true)
        } catch (error) {
            reject(error);
        }
    });
};

const hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(password, salt, function (err, passwordHashed) {
                    resolve(passwordHashed)
                });
            });
        } catch (error) {
            reject(error);
        }
    })
};

module.exports = {
    checkEmailExits: checkEmailExits,
    hashPassword: hashPassword,
};