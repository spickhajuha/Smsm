// आवश्यक Firebase SDK फ़ंक्शन आयात करें
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// आपकी वेब ऐप की Firebase कॉन्फ़िगरेशन
const firebaseConfig = {
  apiKey: "AIzaSyDTJFCi2q0eiXwJFNzpb-tqKQtP1Y7YHT8",
  authDomain: "spic-9f315.firebaseapp.com",
  projectId: "spic-9f315",
  storageBucket: "spic-9f315.appspot.com",
  messagingSenderId: "49035200043",
  appId: "1:49035200043:web:74b91c2eba95db19754c6e",
  measurementId: "G-MX0WMMQCKJ"
};

// Firebase इनिशियलाइज़ करें
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// OTP भेजने का कार्य
document.getElementById("send-otp").addEventListener("click", function () {
    const phoneNumber = document.getElementById("phone").value;
    
    // रीकैप्चा वेरिफायर बनाएँ
    const appVerifier = new RecaptchaVerifier('send-otp', {
        'size': 'invisible',
        'callback': (response) => {
            // कैप्चा पास किया गया
        },
        'expired-callback': () => {
            // कैप्चा expired हो गया
        }
    }, auth);

    // फोन नंबर पर OTP भेजें
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult; // confirmationResult को एक ग्लोबल वेरिएबल के रूप में स्टोर करें
            document.getElementById("otp-container").style.display = "block";
            document.getElementById("verify-otp").style.display = "block";
            document.getElementById("message").innerText = "OTP भेजा गया है!";
        }).catch((error) => {
            document.getElementById("message").innerText = "OTP भेजने में त्रुटि: " + error.message;
        });
});

// OTP सत्यापन का कार्य
document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault(); // फॉर्म सबमिशन को रोकें

    const otp = document.getElementById("otp").value;

    // OTP को सत्यापित करें
    window.confirmationResult.confirm(otp).then((result) => {
        // OTP सफलतापूर्वक सत्यापित
        const user = result.user;
        document.getElementById("message").innerText = "OTP सत्यापित हुआ! आप साइन-अप हो गए हैं।";
    }).catch((error) => {
        document.getElementById("message").innerText = "OTP सत्यापन में त्रुटि: " + error.message;
    });
});