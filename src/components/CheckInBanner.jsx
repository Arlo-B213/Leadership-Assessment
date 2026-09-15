import { useEffect, useState } from 'react'
import { getCommitmentsByOwner, updateCommitmentStatus } from '../utils/db'

export default function CheckInBanner({ uid }) {
  const [due, setDue] = useState(null)

  useEffect(() => {
    if (!uid) return
    let cancelled = false
    getCommitmentsByOwner(uid).then((commitments) => {
      if (cancelled) return
      const now = Date.now()
      const next = commitments
        .filter((c) => c.status === 'pending' && new Date(c.checkInAt).getTime() <= now)
        .sort((a, b) => new Date(a.checkInAt) - new Date(b.checkInAt))[0]
      setDue(next || null)
    })
    return () => {
      cancelled = true
    }
  }, [uid])

  if (!due) return null

  async function respond(status) {
    await updateCommitmentStatus(due.id, status)
    setDue(null)
  }

  return (
    <div className="bg-indigo-50 border-b border-indigo-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-indigo-900">
          A week ago you committed to: <span className="font-medium">"{due.text}"</span> — did you try it?
        </p>
        <div className="flex gap-2 text-sm font-medium">
          <button onClick={() => respond('done')} className="rounded-md bg-indigo-600 text-white px-3 py-1.5 hover:bg-indigo-700">
            Yes, I did
          </button>
          <button onClick={() => respond('skipped')} className="rounded-md border border-indigo-300 text-indigo-700 px-3 py-1.5 hover:bg-indigo-100">
            Not yet
          </button>
        </div>
      </div>
    </div>
  )
}
