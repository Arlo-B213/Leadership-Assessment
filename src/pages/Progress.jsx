import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useSession } from '../context/useSession'
import { getResultsByOwner } from '../utils/db'
import { STYLES } from '../data/styles'
import TrendChart from '../components/TrendChart'

export default function Progress() {
  const { session } = useSession()
  const [results, setResults] = useState(undefined)

  useEffect(() => {
    if (!session) return
    getResultsByOwner(session.uid).then((rows) => {
      setResults(rows.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
    })
  }, [session])

  if (session === undefined) return <p className="text-center text-slate-500">Loading...</p>
  if (session === null) return <Navigate to="/role" replace />
  if (results === undefined) return <p className="text-center text-slate-500">Loading your history...</p>

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Your Progress</h1>
        <p className="text-slate-600 mt-1">
          {results.length} assessment{results.length === 1 ? '' : 's'} taken
        </p>
      </div>

      {results.length < 2 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
          <p className="text-slate-600 mb-4">
            Take the assessment again after a few weeks to start seeing how your style and empathy
            change over time.
          </p>
          <Link to="/assessment" className="text-indigo-600 hover:underline text-sm font-medium">
            Retake the assessment
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Style &amp; Empathy Over Time</h2>
          <TrendChart results={results} />
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <h2 className="font-semibold text-slate-900 p-6 pb-3">All Attempts</h2>
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500 border-t border-slate-100">
            <tr>
              <th className="px-6 py-2 font-medium">Date</th>
              <th className="px-6 py-2 font-medium">Dominant Style</th>
              <th className="px-6 py-2 font-medium">Empathy</th>
              <th className="px-6 py-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {[...results].reverse().map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="px-6 py-3 text-slate-600">{new Date(r.createdAt).toLocaleDateString()}</td>
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
      </div>

      <div className="text-center">
        <Link to="/assessment" className="rounded-lg bg-indigo-600 px-6 py-2.5 text-white text-sm font-medium hover:bg-indigo-700 inline-block">
          Retake Assessment
        </Link>
      </div>
    </div>
  )
}
