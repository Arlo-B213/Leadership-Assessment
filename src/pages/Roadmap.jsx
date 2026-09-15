import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getResultById, getCommitmentsByOwner } from '../utils/db'
import { buildRoadmap } from '../utils/scoring'
import { useSession } from '../context/useSession'
import CommitButton from '../components/CommitButton'

export default function Roadmap() {
  const { id } = useParams()
  const { session } = useSession()
  const [result, setResult] = useState(undefined)
  const [denied, setDenied] = useState(false)
  const [existingCommitments, setExistingCommitments] = useState([])

  useEffect(() => {
    if (!session) return
    getResultById(id)
      .then(setResult)
      .catch(() => setDenied(true))
    getCommitmentsByOwner(session.uid).then(setExistingCommitments)
  }, [id, session])

  if (session === undefined || (session && result === undefined && !denied)) {
    return <p className="text-center text-slate-500">Loading roadmap...</p>
  }
  if (session === null) {
    return (
      <p className="text-center text-slate-500">
        Log in to view this roadmap. <Link to="/role" className="text-indigo-600 hover:underline">Log in</Link>
      </p>
    )
  }
  if (denied) {
    return <p className="text-center text-slate-500">You don't have access to this roadmap.</p>
  }
  if (!result) return <p className="text-center text-slate-500">Result not found.</p>

  const roadmap = buildRoadmap(result.scores)

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <p className="text-sm text-slate-500 mb-1">{result.name}'s growth roadmap</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Your path forward</h1>
        <p className="text-slate-600 mt-2">
          Based on your dominant style ({roadmap.dominant.name}) and growth edge ({roadmap.weakest.name}).
        </p>
      </div>

      <div className="space-y-5">
        {roadmap.focusAreas.map((area, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold">
                {i + 1}
              </span>
              <h2 className="font-semibold text-slate-900">{area.title}</h2>
            </div>
            <ul className="space-y-2 text-sm text-slate-600 ml-1">
              {area.items.map((item, j) => (
                <li key={j} className="flex items-start justify-between gap-3 border-b border-slate-50 last:border-0 pb-2 last:pb-0">
                  <span className="flex-1">• {item}</span>
                  <CommitButton
                    ownerUid={session.uid}
                    resultId={result.id}
                    area={area.title}
                    text={item}
                    alreadyCommitted={existingCommitments.some((c) => c.resultId === result.id && c.text === item)}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link to={`/results/${result.id}`} className="text-sm text-indigo-600 hover:underline">
          ← Back to results
        </Link>
      </div>
    </div>
  )
}
