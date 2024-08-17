const otpGenerator = require('otp-generator');
const RandomModel = require('../Models/RandomModel');
const UserModel = require('../Models/UserModel');

const sendotp = async (req, res) => {
    try{
        const { user_email } = req.body;
        const user = await UserModel.findOne({ user_email });
        if (user) {
            return res.status(404).json({
                status: 'failure',
                message: 'User is already registered'
            })
        }
        let otp = otpGenerator.generate(6, 
            { 
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false, 
                specialChars: false
            });
        let result = await RandomModel.findOne({ otp });
        while (result) {
            otp = otpGenerator.generate(6, 
                { upperCaseAlphabets: false });
            result = await RandomModel.findOne({ otp });
        }
        const otppayload = { user_email,otp}
        const otpbody = await RandomModel.create(otppayload);
        res.status(200).json({
            status: 'success',
            message: 'OTP sent successfully',
            otpbody
        })
    }
    catch(err){
        res.status(500).json({
            status: 'failure',
            message: 'Unable to send OTP',
            error: err.message
        })
    }
}

module.exports = { sendotp }