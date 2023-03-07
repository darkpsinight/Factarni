import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyB_UwYnwotnA4a14T25q0m4cNPIv7cfXQM',
  authDomain: 'factarni.firebaseapp.com',
  projectId: 'factarni',
  storageBucket: 'factarni.appspot.com',
  messagingSenderId: '621081064698',
  appId: '1:621081064698:web:10d9e056ee6a29acd44543',
  measurementId: 'G-T423EXDDJR',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
