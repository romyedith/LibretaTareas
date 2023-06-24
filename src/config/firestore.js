import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyBBHUiMLjoV2TVSXNxFQzHpALo4qxJOyHQ",
	authDomain: "cruds-7e98f.firebaseapp.com",
	projectId: "cruds-7e98f",
	storageBucket: "cruds-7e98f.appspot.com",
	messagingSenderId: "339359787292",
	appId: "1:339359787292:web:e6f71e41a7f589b998b2d9"
  };
  
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// export const database = getFirestore(app);

export const database = initializeFirestore(app, {
	experimentalAutoDetectLongPolling: true,
});
