import { useEffect, useState } from 'react'
import { watchAuthState } from '../utils/authApi'
import { getUserProfile } from '../utils/db'
import { SessionContext } from './session-context'

// session: undefined while resolving auth state, null when logged out,
// otherwise { uid, email, name, role, teamId, teamName }
export function SessionProvider({ children }) {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    const unsubscribe = watchAuthState(async (user) => {
      if (!user) {
        setSession(null)
        return
      }
      const profile = await getUserProfile(user.uid)
      setSession({ uid: user.uid, email: user.email, ...profile })
    })
    return unsubscribe
  }, [])

  function updateSession(patch) {
    setSession((prev) => (prev ? { ...prev, ...patch } : patch))
  }

  function resetSession() {
    setSession(null)
  }

  return (
    <SessionContext.Provider value={{ session, updateSession, resetSession }}>
      {children}
    </SessionContext.Provider>
  )
}
