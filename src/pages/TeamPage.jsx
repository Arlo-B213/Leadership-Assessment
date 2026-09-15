import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useSession } from '../context/useSession'
import { getTeamById, addTeamStandard, removeTeamStandard } from '../utils/db'

export default function TeamPage() {
  const { session } = useSession()
  const [team, setTeam] = useState(undefined)
  const [newStandard, setNewStandard] = useState('')
  const [saving, setSaving] = useState(false)
  const teamId = session?.teamId

  useEffect(() => {
    if (!teamId) return
    getTeamById(teamId).then(setTeam)
  }, [teamId])

  if (session === undefined) return <p className="text-center text-slate-500">Loading...</p>
  if (session === null) return <Navigate to="/role" replace />
  if (!teamId) {
    return (
      <p className="text-center text-slate-500">
        You're not part of a team yet. <Link to="/role" className="text-indigo-600 hover:underline">Join or create one</Link>.
      </p>
    )
  }
  if (team === undefined) return <p className="text-center text-slate-500">Loading team...</p>

  const isManager = session.role === 'manager' && team.managerUid === session.uid
  const standards = team.standards || []

  async function handleAdd(e) {
    e.preventDefault()
    if (!newStandard.trim()) return
    setSaving(true)
    const updated = await addTeamStandard(teamId, {
      id: uuidv4(),
      text: newStandard.trim(),
      createdAt: new Date().toISOString(),
    })
    setTeam((prev) => ({ ...prev, standards: updated }))
    setNewStandard('')
    setSaving(false)
  }

  async function handleRemove(standardId) {
    const updated = await removeTeamStandard(teamId, standardId)
    setTeam((prev) => ({ ...prev, standards: updated }))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{team.name}</h1>
        <p className="text-slate-600 mt-2">
          {isManager
            ? 'The explicit standards you hold this team to. Write them down once, revisit them often.'
            : 'The standards your manager holds this team to.'}
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Team Standards</h2>

        {standards.length === 0 ? (
          <p className="text-sm text-slate-500">
            {isManager ? 'No standards set yet — add your first one below.' : 'No standards have been set yet.'}
          </p>
        ) : (
          <ul className="space-y-2 mb-4">
            {standards.map((s) => (
              <li key={s.id} className="flex items-start justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2">
                <span className="text-sm text-slate-700">{s.text}</span>
                {isManager && (
                  <button
                    onClick={() => handleRemove(s.id)}
                    className="text-xs text-slate-400 hover:text-red-600 whitespace-nowrap"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {isManager && (
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100">
            <input
              type="text"
              value={newStandard}
              onChange={(e) => setNewStandard(e.target.value)}
              placeholder="e.g. We raise blockers the same day we hit them"
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving ? 'Adding...' : 'Add Standard'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
