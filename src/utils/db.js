import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from './firebase'

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
