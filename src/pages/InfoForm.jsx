import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSession } from '../context/useSession'
import { getTeamById, saveTeam } from '../utils/db'
import { v4 as uuidv4 } from 'uuid'

export default function InfoForm() {
  const navigate = useNavigate()
  const { session, updateSession } = useSession()
  const [searchParams] = useSearchParams()
  const inviteTeamId = searchParams.get('team')
  const inviteEmail = searchParams.get('email') || ''

  const [name, setName] = useState('')
  const [email, setEmail] = useState(inviteEmail)
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

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Please enter both your name and email.')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    setSubmitting(true)
    let teamId = invitedTeam ? invitedTeam.id : session.teamId
    let finalTeamName = invitedTeam ? invitedTeam.name : session.teamName

    if (session.role === 'manager' && !invitedTeam) {
      const team = {
        id: uuidv4(),
        name: teamName.trim() || `${name.trim()}'s Team`,
        managerName: name.trim(),
        managerEmail: email.trim(),
        invitedEmails: [],
        createdAt: new Date().toISOString(),
      }
      await saveTeam(team)
      teamId = team.id
      finalTeamName = team.name
    }

    updateSession({
      name: name.trim(),
      email: email.trim(),
      teamId,
      teamName: finalTeamName,
      role: invitedTeam ? 'member' : session.role,
    })
    navigate('/assessment')
  }

  if (invitedTeam === undefined) {
    return <p className="text-center text-slate-500">Loading...</p>
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">A few details first</h1>
      <p className="text-slate-600 text-center mb-8">
        {invitedTeam
          ? `You've been invited to join ${invitedTeam.name}.`
          : "We'll use this to save and email you your results."}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-slate-200 rounded-xl p-6">
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

        {session.role === 'manager' && !invitedTeam && (
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
          {submitting ? 'Saving...' : 'Start Assessment'}
        </button>
      </form>
    </div>
  )
}
