import { useEffect, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { useSession } from '../context/useSession'
import { getFeedbackRequestById, getFeedbackResponses } from '../utils/db'
import { openFeedbackRequestEmail } from '../utils/mailto'
import { STYLE_ORDER } from '../data/styles'
import StyleBarChart from '../components/StyleBarChart'

const MIN_RESPONSES_TO_REVEAL = 3

export default function FeedbackManage() {
  const { id } = useParams()
  const { session } = useSession()
  const [request, setRequest] = useState(undefined)
  const [responses, setResponses] = useState([])
  const [inviteEmail, setInviteEmail] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (!session) return
    getFeedbackRequestById(id).then(setRequest)
    getFeedbackResponses(id).then(setResponses)
  }, [id, session])

  if (session === undefined || request === undefined) {
    return <p className="text-center text-slate-500">Loading...</p>
  }
  if (session === null) return <Navigate to="/role" replace />
  if (!request || request.requesterUid !== session.uid) {
    return <p className="text-center text-slate-500">You don't have access to this feedback request.</p>
  }

  const feedbackUrl = `${window.location.origin}${window.location.pathname}#/feedback/respond/${id}`

  function handleInvite(e) {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(inviteEmail.trim())) return
    openFeedbackRequestEmail({ toEmail: inviteEmail.trim(), requesterName: session.name, feedbackUrl })
    setInviteEmail('')
    setSent(true)
  }

  const revealed = responses.length >= MIN_RESPONSES_TO_REVEAL
  const averages = STYLE_ORDER.reduce((acc, key) => {
    const vals = responses.map((r) => r.scores.percentages[key])
    acc[key] = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0
    return acc
  }, {})
  const avgEmpathy = responses.length
    ? Math.round(responses.reduce((a, r) => a + r.scores.empathyScore, 0) / responses.length)
    : 0

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Link to="/feedback" className="text-xs text-indigo-600 hover:underline">← All feedback requests</Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">Peer Feedback</h1>
        <p className="text-slate-600 mt-2">{responses.length} response{responses.length === 1 ? '' : 's'} so far</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="font-semibold text-slate-900 mb-3">Invite a peer</h2>
        <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            inputMode="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="teammate@company.com"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:bg-indigo-700">
            Invite
          </button>
        </form>
        {sent && <p className="text-xs text-emerald-600 mt-2">Email opened ✓</p>}
        <p className="text-xs text-slate-400 mt-3 break-all">
          Or share this link directly: {feedbackUrl}
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Combined Results</h2>
        {!revealed ? (
          <p className="text-sm text-slate-500">
            Waiting for {MIN_RESPONSES_TO_REVEAL - responses.length} more response
            {MIN_RESPONSES_TO_REVEAL - responses.length === 1 ? '' : 's'} to protect anonymity
            ({responses.length}/{MIN_RESPONSES_TO_REVEAL}).
          </p>
        ) : (
          <div className="space-y-6">
            <StyleBarChart percentages={averages} />
            <div className="text-center border-t border-slate-100 pt-4">
              <p className="text-3xl font-bold text-orange-600">{avgEmpathy}%</p>
              <p className="text-xs text-slate-500 mt-1">Average peer-perceived empathy</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
