// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'


//Importo las variables de entorno de Firebase
/* const apiKeyFromEnv = process.env.REACT_APP_FIREBASE_API_KEY
const authDomainFromEnv = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
const projectIdFromEnv = process.env.REACT_APP_FIREBASE_PROJECT_ID
const storageBucketFromEnv = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
const messagingSenderIdFromEnv = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
const appIdFromEnv = process.env.REACT_APP_FIREBASE_APP_ID */

// Añade aquí tus credenciales
/* const firebaseConfig = {
    apiKey: apiKeyFromEnv,
    authDomain: authDomainFromEnv,
    projectId: projectIdFromEnv,
    storageBucket: storageBucketFromEnv,
    messagingSenderId: messagingSenderIdFromEnv,
    appId: appIdFromEnv,
} */;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBv3Fyv-I50pmC-sN-5UD7Vm5v49hMj5Fc",
    authDomain: "futsscore-be650.firebaseapp.com",
    projectId: "futsscore-be650",
    storageBucket: "futsscore-be650.appspot.com",
    messagingSenderId: "636285324429",
    appId: "1:636285324429:web:59427defc365b0f5a326c4"
  };


// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp)
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
// export default firebaseApp;