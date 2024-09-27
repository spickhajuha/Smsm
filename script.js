// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTJFCi2q0eiXwJFNzpb-tqKQtP1Y7YHT8",
  authDomain: "spic-9f315.firebaseapp.com",
  projectId: "spic-9f315",
  storageBucket: "spic-9f315.appspot.com",
  messagingSenderId: "49035200043",
  appId: "1:49035200043:web:74b91c2eba95db19754c6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set up reCAPTCHA
window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible', // Can also be 'normal' if you want it visible
    'callback': (response) => {
        // reCAPTCHA solved - now allow OTP send
    }
}, auth);

// Function to send OTP
document.getElementById("send-otp").addEventListener("click", function () {
    const phoneNumber = document.getElementById("phone").value;

    // Verify the reCAPTCHA before sending the OTP
    const appVerifier = window.recaptchaVerifier;

    // Send OTP to the phone number
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult; // Store confirmation result in a global variable
            document.getElementById("otp-container").style.display = "block";
            document.getElementById("verify-otp").style.display = "block";
            document.getElementById("message").innerText = "OTP has been sent!";
        }).catch((error) => {
            document.getElementById("message").innerText = "Error sending OTP: " + error.message;
        });
});

// Function to verify OTP
document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const otp = document.getElementById("otp").value;

    // Verify the OTP
    window.confirmationResult.confirm(otp).then((result) => {
        // OTP successfully verified
        document.getElementById("message").innerText = "OTP verified! You are signed up.";
        
        // Redirect to upmsp.edu.in
        window.location.href = "https://upmsp.edu.in";
    }).catch((error) => {
        document.getElementById("message").innerText = "Error verifying OTP: " + error.message;
    });
});