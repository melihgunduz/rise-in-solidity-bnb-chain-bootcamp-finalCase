import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSWoV2iRMoaVItUoIZBYN3uwmhFfRrHcI",
  authDomain: "auction-house-36bfc.firebaseapp.com",
  projectId: "auction-house-36bfc",
  storageBucket: "auction-house-36bfc.appspot.com",
  messagingSenderId: "737994396721",
  appId: "1:737994396721:web:dc4f0ab501507a024db110"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export {
  firebaseApp, database
}
