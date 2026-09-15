import { useState } from 'react'
import { addInviteToTeam } from '../utils/db'
import { openTeamInviteEmail } from '../utils/mailto'
import { logEvent } from '../utils/firebase'

export default function TeamInviteForm({ team, managerName, onInvited }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Enter a valid email address.')
      return
    }

    setStatus('saving')
    const inviteUrl = `${window.location.origin}${window.location.pathname}#/role?team=${team.id}&email=${encodeURIComponent(email.trim())}`
    await addInviteToTeam(team.id, email.trim())
    logEvent('team_invite_sent', { team_id: team.id })
    openTeamInviteEmail({ toEmail: email.trim(), teamName: team.name, managerName, inviteUrl })

    setStatus('saved')
    setEmail('')
    onInvited?.()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="teammate@company.com"
        className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        disabled={status === 'saving'}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
      >
        {status === 'saving' ? 'Saving...' : 'Invite'}
      </button>
      {error && <p className="text-sm text-red-600 sm:ml-2 self-center">{error}</p>}
      {status === 'saved' && <p className="text-sm text-emerald-600 sm:ml-2 self-center">Email opened ✓</p>}
    </form>
  )
}
