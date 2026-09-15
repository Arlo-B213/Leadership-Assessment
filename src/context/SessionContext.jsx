import { useEffect, useState } from 'react'
import { getCurrentUser, setCurrentUser as persistUser } from '../utils/storage'
import { SessionContext } from './session-context'

export function SessionProvider({ children }) {
  const [session, setSessionState] = useState(() => getCurrentUser() || {
    role: null,
    name: '',
    email: '',
    teamId: null,
    teamName: '',
  })

  useEffect(() => {
    persistUser(session)
  }, [session])

  function updateSession(patch) {
    setSessionState((prev) => ({ ...prev, ...patch }))
  }

  function resetSession() {
    setSessionState({ role: null, name: '', email: '', teamId: null, teamName: '' })
  }

  return (
    <SessionContext.Provider value={{ session, updateSession, resetSession }}>
      {children}
    </SessionContext.Provider>
  )
}
