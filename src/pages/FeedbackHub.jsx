import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useSession } from '../context/useSession'
import { saveFeedbackRequest, getFeedbackResponses, getFeedbackRequestsByRequester } from '../utils/db'

async function loadRequests(uid) {
  const rows = await getFeedbackRequestsByRequester(uid)
  const withCounts = await Promise.all(
    rows.map(async (r) => ({ ...r, responseCount: (await getFeedbackResponses(r.id)).length })),
  )
  return withCounts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export default function FeedbackHub() {
  const { session } = useSession()
  const [requests, setRequests] = useState(undefined)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (!session) return
    loadRequests(session.uid).then(setRequests)
  }, [session])

  async function handleCreate() {
    setCreating(true)
    const request = {
      id: uuidv4(),
      requesterUid: session.uid,
      requesterName: session.name,
      createdAt: new Date().toISOString(),
    }
    await saveFeedbackRequest(request)
    setRequests((prev) => [{ ...request, responseCount: 0 }, ...(prev || [])])
    setCreating(false)
  }

  if (session === undefined) return <p className="text-center text-slate-500">Loading...</p>
  if (session === null) return <Navigate to="/role" replace />
  if (requests === undefined) return <p className="text-center text-slate-500">Loading...</p>

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">360 Feedback</h1>
        <p className="text-slate-600 mt-2">
          See how your leadership style looks from the outside. Invite a few peers to give quick,
          anonymous feedback — individual answers stay hidden, you only see the combined results.
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={handleCreate}
          disabled={creating}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {creating ? 'Creating...' : 'Request New Feedback'}
        </button>
      </div>

      {requests.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <h2 className="font-semibold text-slate-900 p-6 pb-3">Your Feedback Requests</h2>
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500 border-t border-slate-100">
              <tr>
                <th className="px-6 py-2 font-medium">Requested</th>
                <th className="px-6 py-2 font-medium">Responses</th>
                <th className="px-6 py-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-t border-slate-100">
                  <td className="px-6 py-3 text-slate-600">{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-3 text-slate-600">{r.responseCount}</td>
                  <td className="px-6 py-3 text-right">
                    <Link to={`/feedback/${r.id}`} className="text-indigo-600 hover:underline text-xs">
                      Manage / View results
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
