import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useSession } from '../context/useSession'
import { signUp, logIn, authErrorMessage } from '../utils/authApi'
import { getTeamById, getUserProfile, saveTeam, saveUserProfile } from '../utils/db'

export default function AuthForm() {
  const navigate = useNavigate()
  const { updateSession } = useSession()
  const [searchParams] = useSearchParams()
  const inviteTeamId = searchParams.get('team')
  const inviteEmail = searchParams.get('email') || ''
  const role = searchParams.get('role') || 'member'

  const [mode, setMode] = useState('signup')
  const [name, setName] = useState('')
  const [email, setEmail] = useState(inviteEmail)
  const [password, setPassword] = useState('')
  const [teamName, setTeamName] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [invitedTeam, setInvitedTeam] = useState(undefined)

  useEffect(() => {
    if (!inviteTeamId) {
      setInvitedTeam(null)
      return
    }
    getTeamById(inviteTeamId).then(setInvitedTeam)
  }, [inviteTeamId])

  async function handleSignUp(e) {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in every field.')
      return
    }

    setSubmitting(true)
    try {
      const credential = await signUp(email.trim(), password)
      const uid = credential.user.uid

      let teamId = invitedTeam ? invitedTeam.id : null
      let finalTeamName = invitedTeam ? invitedTeam.name : ''
      const finalRole = invitedTeam ? 'member' : role

      if (finalRole === 'manager' && !invitedTeam) {
        const team = {
          id: uuidv4(),
          name: teamName.trim() || `${name.trim()}'s Team`,
          managerName: name.trim(),
          managerEmail: email.trim(),
          managerUid: uid,
          invitedEmails: [],
          createdAt: new Date().toISOString(),
        }
        await saveTeam(team)
        teamId = team.id
        finalTeamName = team.name
      }

      const profile = { name: name.trim(), role: finalRole, teamId, teamName: finalTeamName }
      await saveUserProfile(uid, profile)
      updateSession({ uid, email: email.trim(), ...profile })
      navigate('/assessment')
    } catch (err) {
      setError(authErrorMessage(err))
      setSubmitting(false)
    }
  }

  async function handleLogIn(e) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError('Please enter your email and password.')
      return
    }

    setSubmitting(true)
    try {
      const credential = await logIn(email.trim(), password)
      const uid = credential.user.uid
      const profile = await getUserProfile(uid)
      updateSession({ uid, email: email.trim(), ...profile })
      navigate(profile?.role === 'manager' ? '/dashboard' : '/assessment')
    } catch (err) {
      setError(authErrorMessage(err))
      setSubmitting(false)
    }
  }

  if (invitedTeam === undefined) {
    return <p className="text-center text-slate-500">Loading...</p>
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">
        {mode === 'signup' ? 'Create your account' : 'Welcome back'}
      </h1>
      <p className="text-slate-600 text-center mb-6">
        {invitedTeam
          ? `You've been invited to join ${invitedTeam.name}.`
          : 'Your results are private to your account.'}
      </p>

      <div className="flex rounded-lg border border-slate-200 bg-white p-1 mb-6 text-sm font-medium">
        <button
          onClick={() => setMode('signup')}
          className={`flex-1 rounded-md py-2 transition-colors ${mode === 'signup' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Sign Up
        </button>
        <button
          onClick={() => setMode('login')}
          className={`flex-1 rounded-md py-2 transition-colors ${mode === 'login' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Log In
        </button>
      </div>

      <form
        onSubmit={mode === 'signup' ? handleSignUp : handleLogIn}
        className="space-y-4 bg-white border border-slate-200 rounded-xl p-6"
      >
        {mode === 'signup' && (
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Jane Doe"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="jane@company.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="At least 6 characters"
          />
        </div>

        {mode === 'signup' && role === 'manager' && !invitedTeam && (
          <div>
            <label htmlFor="teamName" className="block text-sm font-medium text-slate-700 mb-1">
              Team name <span className="text-slate-400">(optional)</span>
            </label>
            <input
              id="teamName"
              name="teamName"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Product Team"
            />
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Please wait...' : mode === 'signup' ? 'Sign Up & Start Assessment' : 'Log In'}
        </button>
      </form>
    </div>
  )
}
