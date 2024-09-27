
const accountSid = 'AC376cce06e170bde18260784d233efdd9=';
const authToken = '6f46ae0d47a24ce19f7876dfc690bac0';
const serviceSid = 'MGfe805c5f5ae419198151117bc433e2dd';

const twilio = new Twilio(accountSid, authToken);
const verify = twilio.verify.v2;

const phoneNumberInput = document.getElementById('phone-number');
const sendOtpButton = document.getElementById('send-otp-button');
const otpInput = document.getElementById('otp-input');
const verifyOtpButton = document.getElementById('verify-otp-button');
const statusMessage = document.getElementById('status-message');

sendOtpButton.addEventListener('click', async () => {
  const phoneNumber = phoneNumberInput.value;
  try {
    const verification = await verify.services(serviceSid).verifications.create({
      to: phoneNumber,
      channel: 'sms'
    });
    statusMessage.textContent = 'OTP sent!';
  } catch (error) {
    statusMessage.textContent = 'Error sending OTP: ' + error.message;
  }
});

verifyOtpButton.addEventListener('click', async () => {
  const phoneNumber = phoneNumberInput.value;
  const otpCode = otpInput.value;
  try {
    const verificationCheck = await verify.services(serviceSid).verificationChecks.create({
      to: phoneNumber,
      code: otpCode
    });
    if (verificationCheck.valid) {
      statusMessage.textContent = 'OTP verified!';
    } else {
      statusMessage.textContent = 'Invalid OTP';
    }
  } catch (error) {
    statusMessage.textContent = 'Error verifying OTP: ' + error.message;
  }
});
