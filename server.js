const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

// Twilio credentials
const accountSid = 'AC376cce06e170bde18260784d233efdd9';
const authToken = 'da5203ae51d67bf98fb2feb0c1ec6dfa';
const serviceSid = 'MGfe805c5f5ae419198151117bc433e2dd';

const client = new twilio(accountSid, authToken);

const app = express();
app.use(bodyParser.json());

let otpCache = {}; // Store OTPs temporarily

// Endpoint to send OTP
app.post('/sendOTP', (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    
    client.verify.services(serviceSid)
        .verifications.create({
            to: `+${phoneNumber}`,
            channel: 'sms'
        })
        .then(verification => {
            otpCache[phoneNumber] = verification.sid;
            res.json({ success: true });
        })
        .catch(err => {
            console.error(err);
            res.json({ success: false });
        });
});

// Endpoint to verify OTP
app.post('/verifyOTP', (req, res) => {
    const { otp } = req.body;
    
    client.verify.services(serviceSid)
        .verificationChecks.create({
            to: otpCache[phoneNumber], // Use the stored SID
            code: otp
        })
        .then(verification_check => {
            if (verification_check.status === 'approved') {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        })
        .catch(err => {
            console.error(err);
            res.json({ success: false });
        });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});