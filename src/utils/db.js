import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from './firebase'

// ---- User profiles (role/team, keyed by auth uid) ----
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? snap.data() : null
}

export async function saveUserProfile(uid, profile) {
  await setDoc(doc(db, 'users', uid), profile, { merge: true })
  return profile
}

// ---- Results ----
export async function saveResult(result) {
  await setDoc(doc(db, 'results', result.id), result)
  return result
}

export async function getResultById(id) {
  const snap = await getDoc(doc(db, 'results', id))
  return snap.exists() ? snap.data() : null
}

export async function getResultsByTeam(teamId) {
  const q = query(collection(db, 'results'), where('teamId', '==', teamId))
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data())
}

export async function getResultsByOwner(ownerUid) {
  const q = query(collection(db, 'results'), where('ownerUid', '==', ownerUid))
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data())
}

// ---- Teams ----
export async function getTeamById(id) {
  const snap = await getDoc(doc(db, 'teams', id))
  return snap.exists() ? snap.data() : null
}

export async function saveTeam(team) {
  await setDoc(doc(db, 'teams', team.id), team)
  return team
}

export async function addInviteToTeam(teamId, email) {
  const team = await getTeamById(teamId)
  if (!team) return null
  if (!team.invitedEmails.includes(email)) team.invitedEmails.push(email)
  await saveTeam(team)
  return team
}
