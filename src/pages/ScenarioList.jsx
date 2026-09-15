import { Link, Navigate } from 'react-router-dom'
import { useSession } from '../context/useSession'
import { SCENARIOS } from '../data/scenarios'

export default function ScenarioList() {
  const { session } = useSession()

  if (session === undefined) return <p className="text-center text-slate-500">Loading...</p>
  if (session === null) return <Navigate to="/role" replace />

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Practice Scenarios</h1>
        <p className="text-slate-600 mt-2">
          Realistic leadership moments with branching choices and coaching feedback — a low-stakes
          way to rehearse before the real thing.
        </p>
      </div>

      <div className="grid gap-3">
        {SCENARIOS.map((s) => (
          <Link
            key={s.id}
            to={`/practice/${s.id}`}
            className="text-left rounded-xl border border-slate-200 bg-white p-5 hover:border-indigo-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-slate-900">{s.title}</h3>
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">{s.situation}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
