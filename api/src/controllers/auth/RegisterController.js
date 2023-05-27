const sendMail = require("../../config/email");
const crypto = require('crypto');
const User = require("../../models/User");
const { checkEmailExits, hashPassword } = require("../../services/auth/AuthServices");

const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkEmailExit = await checkEmailExits(email);

        if (checkEmailExit) {
            return res.status(400).json({ message: 'Email has been already exits' });
        } else {
            const passwordHashed = await hashPassword(password);

            const registerNewUser = await User.create({ email: email, password: passwordHashed });

            const verifyToken = crypto.randomBytes(32).toString('hex')

            await registerNewUser.updateOne({
                verify_token: crypto.createHash('sha256').update(verifyToken).digest('hex'),
                verify_token_expires: Date.now() + 15 * 60 * 1000,
            });

            const message = `You are receiving this email
            because we need to authenticate you as a real user.
            This link will expire in 15 minutes. 
            <a href=${process.env.URL_SERVER}/api/v1/activate/${verifyToken}>Click here</a>`;

            const data = {
                subject: "Activated account",
                email: registerNewUser.email,
                message: message,
            }

            const sendData = await sendMail(data);

            if (!sendData) {
                return res.status(400).json({ msg: 'Send fail!' });
            } else {
                return res.status(200).json({ msg: 'A active account email has been sent to your email!' });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    register: register
}