import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHvxwMVIqZbKCupzp-ad0FgE2sJ4SRc2M",
  authDomain: "financialinsights-ai.firebaseapp.com",
  projectId: "financialinsights-ai",
  storageBucket: "financialinsights-ai.appspot.com",
  messagingSenderId: "917642439931",
  appId: "1:917642439931:web:40345bff7a7858e8ba945e",
  measurementId: "G-3Q8QH8EM6L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)