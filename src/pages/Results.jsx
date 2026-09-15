import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getResultById } from '../utils/db'
import { STYLES } from '../data/styles'
import StyleRadarChart from '../components/StyleRadarChart'
import GaugeChart from '../components/GaugeChart'
import StyleBarChart from '../components/StyleBarChart'
import { openResultsEmail } from '../utils/mailto'
import { logEvent } from '../utils/firebase'

export default function Results() {
  const { id } = useParams()
  const [result, setResult] = useState(undefined)

  useEffect(() => {
    getResultById(id).then(setResult)
  }, [id])

  if (result === undefined) {
    return <p className="text-center text-slate-500">Loading results...</p>
  }

  if (!result) {
    return <p className="text-center text-slate-500">Result not found.</p>
  }

  const { scores } = result
  const dominant = STYLES[scores.dominantStyle]
  const secondary = STYLES[scores.secondaryStyle]

  function handleEmailResults() {
    logEvent('results_email_opened', { dominant_style: dominant.name })
    openResultsEmail({
      toEmail: result.email,
      toName: result.name,
      dominantStyle: dominant.name,
      empathyScore: scores.empathyScore,
      resultUrl: window.location.href,
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <p className="text-sm text-slate-500 mb-1">{result.name}'s results</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          You're an <span style={{ color: dominant.color }}>{dominant.name}</span>
        </h1>
        <p className="text-slate-600 mt-2 max-w-xl mx-auto">{dominant.description}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Style Breakdown</h2>
          <StyleRadarChart percentages={scores.percentages} />
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col">
          <h2 className="font-semibold text-slate-900 mb-4">Scores by Style</h2>
          <StyleBarChart percentages={scores.percentages} />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col items-center">
          <GaugeChart value={scores.empathyScore} label="Empathy" color="#ea580c" />
        </div>
        <div className="sm:col-span-2 bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-semibold text-slate-900 mb-3">Your top two styles</h2>
          <div className="space-y-3">
            <StyleRow style={dominant} score={scores.percentages[dominant.key]} />
            <StyleRow style={secondary} score={scores.percentages[secondary.key]} />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-semibold text-emerald-700 mb-3">Strengths</h2>
          <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
            {dominant.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-semibold text-amber-700 mb-3">Watch-outs</h2>
          <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
            {dominant.weaknesses.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to={`/roadmap/${result.id}`}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-white text-sm font-medium hover:bg-indigo-700"
        >
          View My Roadmap
        </Link>
        <button
          onClick={handleEmailResults}
          className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Email me my results
        </button>
      </div>
      <p className="text-center text-xs text-slate-400">
        Opens your email app with your results pre-filled.
      </p>
    </div>
  )
}

function StyleRow({ style, score }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-slate-700">{style.name}</span>
        <span className="text-slate-500">{score}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: style.color }} />
      </div>
    </div>
  )
}
