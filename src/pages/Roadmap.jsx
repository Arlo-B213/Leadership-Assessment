import { useParams, Link } from 'react-router-dom'
import { getResultById } from '../utils/storage'
import { buildRoadmap } from '../utils/scoring'

export default function Roadmap() {
  const { id } = useParams()
  const result = getResultById(id)

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
            <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside ml-1">
              {area.items.map((item, j) => <li key={j}>{item}</li>)}
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
