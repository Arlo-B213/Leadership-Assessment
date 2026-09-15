import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useSession } from '../context/useSession'
import { getConversationById, getResultsByOwner } from '../utils/db'
import { buildConversationScript } from '../utils/conversationScript'
import { STYLES } from '../data/styles'

export default function ConversationDetail() {
  const { id } = useParams()
  const { session } = useSession()
  const [conversation, setConversation] = useState(undefined)
  const [dominantStyle, setDominantStyle] = useState(null)
  const [denied, setDenied] = useState(false)

  useEffect(() => {
    if (!session) return
    getConversationById(id)
      .then((c) => {
        if (c && c.ownerUid !== session.uid) {
          setDenied(true)
          return
        }
        setConversation(c)
      })
      .catch(() => setDenied(true))
    getResultsByOwner(session.uid).then((results) => {
      if (!results.length) return
      const latest = [...results].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]
      setDominantStyle(latest.scores.dominantStyle)
    })
  }, [id, session])

  if (session === undefined || (session && conversation === undefined && !denied)) {
    return <p className="text-center text-slate-500">Loading...</p>
  }
  if (session === null) return <Navigate to="/role" replace />
  if (denied) return <p className="text-center text-slate-500">You don't have access to this conversation prep.</p>
  if (!conversation) return <p className="text-center text-slate-500">Not found.</p>

  const { sections, tip } = buildConversationScript({ ...conversation, dominantStyle })

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link to="/conversations" className="text-xs text-indigo-600 hover:underline">← All conversations</Link>
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Conversation Script</h1>
        <p className="text-slate-500 text-sm mt-1">{new Date(conversation.createdAt).toLocaleDateString()}</p>
      </div>

      {tip && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">
            Tip for a {STYLES[dominantStyle].name}
          </p>
          <p className="text-sm text-amber-900">{tip}</p>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        {sections.map((s, i) => (
          <div key={i}>
            <p className="text-xs font-medium text-indigo-500 uppercase tracking-wide mb-1">{s.label}</p>
            <p className="text-slate-700 text-sm">{s.text}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 text-center">
        Use this as a guide, not a script to read verbatim — the goal is a real conversation, not a monologue.
      </p>
    </div>
  )
}
