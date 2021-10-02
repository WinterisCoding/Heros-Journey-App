import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyAvohjaRINpDiQq_-moAxEbyz4uRzzefWU",
  authDomain: "heros-journey-app.firebaseapp.com",
  databaseURL: "https://heros-journey-app-default-rtdb.firebaseio.com",
  projectId: "heros-journey-app",
  storageBucket: "heros-journey-app.appspot.com",
  messagingSenderId: "702993669159",
  appId: "1:702993669159:web:1a3d2b33733eb5a617c202",
  measurementId: "G-7EZRMKHB6X"
};

const firebase = initializeApp(firebaseConfig);
const realtime = getDatabase(firebase);


export default realtime;
