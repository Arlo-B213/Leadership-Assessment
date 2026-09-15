const KEYS = {
  CURRENT_USER: 'ma_current_user',
}

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// ---- Current session user (device-local; results/teams live in Firestore) ----
export function getCurrentUser() {
  return read(KEYS.CURRENT_USER, null)
}

export function setCurrentUser(user) {
  write(KEYS.CURRENT_USER, user)
}

export function clearCurrentUser() {
  localStorage.removeItem(KEYS.CURRENT_USER)
}
