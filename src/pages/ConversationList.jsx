import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useSession } from '../context/useSession'
import { getConversationsByOwner } from '../utils/db'

export default function ConversationList() {
  const { session } = useSession()
  const [conversations, setConversations] = useState(undefined)

  useEffect(() => {
    if (!session) return
    getConversationsByOwner(session.uid).then(setConversations)
  }, [session])

  if (session === undefined) return <p className="text-center text-slate-500">Loading...</p>
  if (session === null) return <Navigate to="/role" replace />
  if (conversations === undefined) return <p className="text-center text-slate-500">Loading...</p>

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Difficult Conversation Coach</h1>
        <p className="text-slate-600 mt-2">
          Prep a specific, fair conversation using the Situation → Behavior → Impact framework —
          direct enough to hold the line, kind enough to keep trust.
        </p>
      </div>

      <div className="text-center">
        <Link
          to="/conversations/new"
          className="inline-block rounded-lg bg-indigo-600 px-6 py-2.5 text-white text-sm font-medium hover:bg-indigo-700"
        >
          Prep a New Conversation
        </Link>
      </div>

      {conversations.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <h2 className="font-semibold text-slate-900 p-6 pb-3">Past Conversations</h2>
          <ul className="divide-y divide-slate-100">
            {conversations.map((c) => (
              <li key={c.id}>
                <Link to={`/conversations/${c.id}`} className="block px-6 py-3 hover:bg-slate-50">
                  <p className="text-sm font-medium text-slate-800 line-clamp-1">{c.situation}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{new Date(c.createdAt).toLocaleDateString()}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
