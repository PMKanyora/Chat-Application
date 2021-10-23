import firebase from "firebase/compat/app";
import "firebase/compat/auth";


export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyABN3D7jSNbG3U3NCVLutEUttNVxNpIJag",
    authDomain: "chat-app-d7666.firebaseapp.com",
    projectId: "chat-app-d7666",
    storageBucket: "chat-app-d7666.appspot.com",
    messagingSenderId: "931416383724",
    appId: "1:931416383724:web:5fc0dff6a87c8f807ac5c9"
  }).auth();

