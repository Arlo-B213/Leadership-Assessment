import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { QUESTIONS } from '../data/questions'
import { computeScores } from '../utils/scoring'
import { useSession } from '../context/useSession'
import { saveResult } from '../utils/db'
import ProgressBar from '../components/ProgressBar'
import QuestionCard from '../components/QuestionCard'
import { v4 as uuidv4 } from 'uuid'
import { logEvent } from '../utils/firebase'

export default function Assessment() {
  const navigate = useNavigate()
  const { session } = useSession()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (session === undefined) return <p className="text-center text-slate-500">Loading...</p>
  if (session === null) return <Navigate to="/role" replace />

  const question = QUESTIONS[index]
  const selected = answers[question.id] || []
  const isLast = index === QUESTIONS.length - 1
  const canAdvance = selected.length > 0

  function toggleOption(questionId, optionId) {
    setAnswers((prev) => {
      const current = prev[questionId] || []
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
      return { ...prev, [questionId]: next }
    })
  }

  async function handleNext() {
    if (isLast) {
      setSubmitting(true)
      const scores = computeScores(answers)
      const result = {
        id: uuidv4(),
        ownerUid: session.uid,
        name: session.name,
        email: session.email,
        role: session.role,
        teamId: session.teamId,
        teamName: session.teamName,
        answers,
        scores,
        createdAt: new Date().toISOString(),
      }
      await saveResult(result)
      logEvent('assessment_completed', {
        dominant_style: scores.dominantStyle,
        empathy_score: scores.empathyScore,
        role: session.role,
      })
      navigate(`/results/${result.id}`)
      return
    }
    setIndex((i) => i + 1)
  }

  function handleBack() {
    if (index === 0) return
    setIndex((i) => i - 1)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <ProgressBar current={index + 1} total={QUESTIONS.length} />
      <QuestionCard question={question} selectedIds={selected} onToggle={toggleOption} />

      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={index === 0}
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-500 disabled:opacity-0 hover:bg-slate-100"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canAdvance || submitting}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Saving...' : isLast ? 'See Results' : 'Next'}
        </button>
      </div>
    </div>
  )
}
