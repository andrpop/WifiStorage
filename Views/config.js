import Firebase from "firebase";
const firebaseConfig = {
    // apiKey: 'AIzaXXXXXXXXXXXXXXXXXXXXXXX',
    // authDomain: 'test-XXXX.firebaseapp.com',
    // databaseURL: 'https://test-XXXXXX.firebaseio.com',
    // projectId: 'test-XXXX',
    // storageBucket: 'test-XXXX.appspot.com',
    // messagingSenderId: 'XXXXXXX',
    // appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    // measurementId: "X-XXXXXXXXXX"
    apiKey: " AIzaSyD3qGVCoL4YturR5xsIr1ynAe75RThdQwo ",
    authDomain: "wifistorage-6b0ac.firebaseapp.com",
    databaseURL: "https://wifistorage-6b0ac.firebaseio.com",
};
const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();
