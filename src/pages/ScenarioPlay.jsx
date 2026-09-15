import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useSession } from '../context/useSession'
import { SCENARIOS } from '../data/scenarios'
import { logEvent } from '../utils/firebase'

export default function ScenarioPlay() {
  const { id } = useParams()
  const { session } = useSession()
  const [step, setStep] = useState('situation') // situation -> followUp -> feedback
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)

  const scenario = SCENARIOS.find((s) => s.id === id)

  if (session === undefined) return <p className="text-center text-slate-500">Loading...</p>
  if (session === null) return <Navigate to="/role" replace />
  if (!scenario) return <p className="text-center text-slate-500">Scenario not found.</p>

  function chooseFirst(choice) {
    setFirstChoice(choice)
    setStep('followUp')
  }

  function chooseSecond(option) {
    setSecondChoice(option)
    setStep('feedback')
    logEvent('scenario_completed', { scenario_id: scenario.id, style: option.style })
  }

  function restart() {
    setFirstChoice(null)
    setSecondChoice(null)
    setStep('situation')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/practice" className="text-xs text-indigo-600 hover:underline">← All scenarios</Link>
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2 mb-6">{scenario.title}</h1>

      {step === 'situation' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <p className="text-slate-700">{scenario.situation}</p>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">What do you do?</p>
          <div className="space-y-2">
            {scenario.choices.map((c) => (
              <button
                key={c.id}
                onClick={() => chooseFirst(c)}
                className="w-full text-left rounded-lg border border-slate-200 p-3 text-sm text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
              >
                {c.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'followUp' && firstChoice && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <p className="text-slate-700">{firstChoice.followUp}</p>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Now what?</p>
          <div className="space-y-2">
            {firstChoice.options.map((o) => (
              <button
                key={o.id}
                onClick={() => chooseSecond(o)}
                className="w-full text-left rounded-lg border border-slate-200 p-3 text-sm text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
              >
                {o.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'feedback' && secondChoice && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <p className="text-xs font-medium text-indigo-500 uppercase tracking-wide">Coaching note</p>
          <p className="text-slate-700">{secondChoice.feedback}</p>
          <div className="flex gap-3 pt-2">
            <button onClick={restart} className="text-sm text-indigo-600 hover:underline">
              Try a different path
            </button>
            <Link to="/practice" className="text-sm text-slate-500 hover:text-slate-700">
              Next scenario →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
