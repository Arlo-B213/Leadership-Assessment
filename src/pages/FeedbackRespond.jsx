import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { PEER_QUESTIONS } from '../data/peerQuestions'
import { computeScores } from '../utils/scoring'
import { getFeedbackRequestById, saveFeedbackResponse } from '../utils/db'
import ProgressBar from '../components/ProgressBar'
import QuestionCard from '../components/QuestionCard'

export default function FeedbackRespond() {
  const { id } = useParams()
  const [request, setRequest] = useState(undefined)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    getFeedbackRequestById(id).then(setRequest)
  }, [id])

  if (request === undefined) return <p className="text-center text-slate-500">Loading...</p>
  if (!request) return <p className="text-center text-slate-500">This feedback request wasn't found.</p>

  if (done) {
    return (
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Thanks!</h1>
        <p className="text-slate-600">
          Your feedback for {request.requesterName} has been submitted anonymously. Individual
          answers are never shown to them — only combined results once enough people respond.
        </p>
      </div>
    )
  }

  const question = PEER_QUESTIONS[index]
  const selected = answers[question.id] || []
  const isLast = index === PEER_QUESTIONS.length - 1
  const canAdvance = selected.length > 0

  function toggleOption(questionId, optionId) {
    setAnswers((prev) => {
      const current = prev[questionId] || []
      const next = current.includes(optionId)
        ? current.filter((oid) => oid !== optionId)
        : [...current, optionId]
      return { ...prev, [questionId]: next }
    })
  }

  async function handleNext() {
    if (isLast) {
      setSubmitting(true)
      const scores = computeScores(answers, PEER_QUESTIONS)
      await saveFeedbackResponse({
        id: uuidv4(),
        requestId: id,
        answers,
        scores,
        submittedAt: new Date().toISOString(),
      })
      setDone(true)
      return
    }
    setIndex((i) => i + 1)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-sm text-slate-500">Anonymous feedback for</p>
        <h1 className="text-xl font-bold text-slate-900">{request.requesterName}</h1>
      </div>
      <ProgressBar current={index + 1} total={PEER_QUESTIONS.length} />
      <QuestionCard question={question} selectedIds={selected} onToggle={toggleOption} />

      <div className="flex justify-end mt-6">
        <button
          onClick={handleNext}
          disabled={!canAdvance || submitting}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Submitting...' : isLast ? 'Submit Feedback' : 'Next'}
        </button>
      </div>
    </div>
  )
}
