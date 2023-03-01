import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyDnz1D2DLCObjUTg8drrP9FSgNymZPzHjw",
    authDomain: "blitzrad-19056.firebaseapp.com",
    projectId: "blitzrad-19056",
    storageBucket: "blitzrad-19056.appspot.com",
    messagingSenderId: "939189443643",
    appId: "1:939189443643:web:afba94b3061db3d431501e"
  })
const firestore = firebase.firestore();

export default firestore
