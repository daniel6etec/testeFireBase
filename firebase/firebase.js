// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1WEEVXIjf5Bpr-H_SOOC5xnlMn8t3c5c",
  authDomain: "nodefirestoreteste.firebaseapp.com",
  projectId: "nodefirestoreteste",
  storageBucket: "nodefirestoreteste.appspot.com",
  messagingSenderId: "125290542692",
  appId: "1:125290542692:web:2091bd0e5bd79c010f9171",
  measurementId: "G-B45RX5VSVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = db