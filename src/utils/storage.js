const KEYS = {
  RESULTS: 'ma_results',
  TEAMS: 'ma_teams',
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

// ---- Results ----
export function getResults() {
  return read(KEYS.RESULTS, [])
}

export function getResultById(id) {
  return getResults().find((r) => r.id === id) || null
}

export function saveResult(result) {
  const all = getResults()
  all.push(result)
  write(KEYS.RESULTS, all)
  return result
}

export function getResultsByTeam(teamId) {
  return getResults().filter((r) => r.teamId === teamId)
}

// ---- Teams ----
export function getTeams() {
  return read(KEYS.TEAMS, [])
}

export function getTeamById(id) {
  return getTeams().find((t) => t.id === id) || null
}

export function saveTeam(team) {
  const all = getTeams()
  const idx = all.findIndex((t) => t.id === team.id)
  if (idx >= 0) all[idx] = team
  else all.push(team)
  write(KEYS.TEAMS, all)
  return team
}

export function addInviteToTeam(teamId, email) {
  const team = getTeamById(teamId)
  if (!team) return null
  if (!team.invitedEmails.includes(email)) team.invitedEmails.push(email)
  saveTeam(team)
  return team
}

// ---- Current session user ----
export function getCurrentUser() {
  return read(KEYS.CURRENT_USER, null)
}

export function setCurrentUser(user) {
  write(KEYS.CURRENT_USER, user)
}

export function clearCurrentUser() {
  localStorage.removeItem(KEYS.CURRENT_USER)
}
