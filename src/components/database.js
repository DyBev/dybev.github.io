import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyC9uXztMLP2coQ_d4ChhhUfYPYbKcEX5Fw",
	authDomain: "personal-portfolio-f0e74.firebaseapp.com",
	projectId: "personal-portfolio-f0e74",
	storageBucket: "personal-portfolio-f0e74.appspot.com",
	messagingSenderId: "531385584932",
	appId: "1:531385584932:web:34f3e13ec22618d7f8b7b1",
	measurementId: "G-9FL3S8X8GF"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
