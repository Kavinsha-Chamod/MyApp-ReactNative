// firebase.js (or wherever you configure Firebase)
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCfHwuxY49oaWTtGvcgZtLyYlwLIDuPOrw",
  authDomain: "myapp-93e11.firebaseapp.com",
  databaseURL: "https://myapp-93e11-default-rtdb.firebaseio.com",
  projectId: "myapp-93e11",
  storageBucket: "myapp-93e11.appspot.com",
  messagingSenderId: "933209541205",
  appId: "1:933209541205:web:339e13544d9f3794c062dc",
  measurementId: "G-6FH8DFCZEB"
};



const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth};
