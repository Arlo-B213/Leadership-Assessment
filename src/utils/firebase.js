import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported, logEvent as firebaseLogEvent } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

let analytics = null
const app = firebaseConfig.apiKey ? initializeApp(firebaseConfig) : null
export const db = app ? getFirestore(app) : null
export const auth = app ? getAuth(app) : null

if (app) {
  isSupported().then((supported) => {
    if (supported) analytics = getAnalytics(app)
  })
}

export function logEvent(eventName, params) {
  if (!analytics) return
  firebaseLogEvent(analytics, eventName, params)
}
