// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTJFCi2q0eiXwJFNzpb-tqKQtP1Y7YHT8",
  authDomain: "spic-9f315.firebaseapp.com",
  projectId: "spic-9f315",
  storageBucket: "spic-9f315.appspot.com",
  messagingSenderId: "49035200043",
  appId: "1:49035200043:web:74b91c2eba95db19754c6e",
  measurementId: "G-MX0WMMQCKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Function to send OTP
document.getElementById("send-otp").addEventListener("click", function () {
    const phoneNumber = document.getElementById("phone").value;

    // Create reCAPTCHA verifier
    const appVerifier = new RecaptchaVerifier('send-otp', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
        'expired-callback': () => {
            // Response expired, re-enable the button
        }
    }, auth);

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
        const user = result.user;
        document.getElementById("message").innerText = "OTP verified! You are signed up.";
        
        // Redirect to upmsp.edu.in
        window.location.href = "https://upmsp.edu.in";
    }).catch((error) => {
        document.getElementById("message").innerText = "Error verifying OTP: " + error.message;
    });
});