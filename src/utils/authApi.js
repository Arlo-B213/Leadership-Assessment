import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from './firebase'

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function logOut() {
  return signOut(auth)
}

export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email)
}

export function watchAuthState(callback) {
  return onAuthStateChanged(auth, callback)
}

const ERROR_MESSAGES = {
  'auth/email-already-in-use': 'An account already exists with this email. Try logging in instead.',
  'auth/invalid-email': 'That email address looks invalid.',
  'auth/weak-password': 'Password must be at least 6 characters.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/user-not-found': 'No account found with that email.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
}

export function authErrorMessage(error) {
  return ERROR_MESSAGES[error?.code] || 'Something went wrong. Please try again.'
}
