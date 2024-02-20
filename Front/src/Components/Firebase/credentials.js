// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'


//Importo las variables de entorno de Firebase
const apiKeyFromEnv = import.meta.env.VITE_FIREBASE_API_KEY
const authDomainFromEnv = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
const projectIdFromEnv = import.meta.env.VITE_FIREBASE_PROJECT_ID
const storageBucketFromEnv = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
const messagingSenderIdFromEnv = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
const appIdFromEnv = import.meta.env.VITE_FIREBASE_APP_ID

// Añade aquí tus credenciales
const firebaseConfig = {
    apiKey: apiKeyFromEnv,
    authDomain: authDomainFromEnv,
    projectId: projectIdFromEnv,
    storageBucket: storageBucketFromEnv,
    messagingSenderId: messagingSenderIdFromEnv,
    appId: appIdFromEnv,
}


// Inicializamos la aplicación y la guardamos en firebaseApp
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp)