import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSession } from '../context/useSession'
import { getTeamById, getResultsByTeam } from '../utils/storage'
import { STYLES, STYLE_ORDER } from '../data/styles'
import StyleBarChart from '../components/StyleBarChart'
import TeamInviteForm from '../components/TeamInviteForm'

export default function ManagerDashboard() {
  const { session } = useSession()
  const [, forceRefresh] = useState(0)

  if (!session.teamId) {
    return (
      <p className="text-center text-slate-500">
        No team found. <Link to="/info" className="text-indigo-600 hover:underline">Set up your team</Link>.
      </p>
    )
  }

  const team = getTeamById(session.teamId)
  const results = getResultsByTeam(session.teamId)

  const teamAverages = STYLE_ORDER.reduce((acc, key) => {
    const vals = results.map((r) => r.scores.percentages[key])
    acc[key] = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0
    return acc
  }, {})
  const avgEmpathy = results.length
    ? Math.round(results.reduce((a, r) => a + r.scores.empathyScore, 0) / results.length)
    : 0

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{team?.name || 'Team'} Dashboard</h1>
        <p className="text-slate-600 mt-1">{results.length} team member{results.length === 1 ? '' : 's'} assessed</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="font-semibold text-slate-900 mb-3">Invite a team member</h2>
        <TeamInviteForm team={team} managerName={session.name} onInvited={() => forceRefresh((k) => k + 1)} />
        {team?.invitedEmails?.length > 0 && (
          <p className="text-xs text-slate-400 mt-3">
            Invited: {team.invitedEmails.join(', ')}
          </p>
        )}
      </div>

      {results.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Team Style Averages</h2>
            <StyleBarChart percentages={teamAverages} />
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Team Empathy Average</h2>
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-5xl font-bold text-orange-600">{avgEmpathy}%</p>
                <p className="text-sm text-slate-500 mt-2">across {results.length} assessment{results.length === 1 ? '' : 's'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <h2 className="font-semibold text-slate-900 p-6 pb-3">Team Members</h2>
        {results.length === 0 ? (
          <p className="px-6 pb-6 text-sm text-slate-500">No team members have completed the assessment yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500 border-t border-slate-100">
              <tr>
                <th className="px-6 py-2 font-medium">Name</th>
                <th className="px-6 py-2 font-medium">Dominant Style</th>
                <th className="px-6 py-2 font-medium">Empathy</th>
                <th className="px-6 py-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id} className="border-t border-slate-100">
                  <td className="px-6 py-3">
                    <p className="font-medium text-slate-800">{r.name}</p>
                    <p className="text-xs text-slate-400">{r.email}</p>
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: `${STYLES[r.scores.dominantStyle].color}1a`,
                        color: STYLES[r.scores.dominantStyle].color,
                      }}
                    >
                      {STYLES[r.scores.dominantStyle].name}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-slate-600">{r.scores.empathyScore}%</td>
                  <td className="px-6 py-3 text-right">
                    <Link to={`/results/${r.id}`} className="text-indigo-600 hover:underline text-xs">
                      View results
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
