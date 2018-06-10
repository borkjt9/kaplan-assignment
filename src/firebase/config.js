import firebase from 'firebase';
import '@firebase/firestore';
// import axios from 'axios'

const config = {
  apiKey: 'AIzaSyBTFt3mvZ7JEOzWyn8Mr9n3tGny6kHdqDA',
  authDomain: 'kaplan-assignment.firebaseapp.com',
  projectId: 'kaplan-assignment',
  storageBucket: 'kaplan-assignment.appspot.com',
};

firebase.initializeApp(config);
export default firebase.firestore();
