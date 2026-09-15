import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { saveCommitment } from '../utils/db'

const WEEK_MS = 7 * 24 * 60 * 60 * 1000

export default function CommitButton({ ownerUid, resultId, area, text, alreadyCommitted }) {
  const [committed, setCommitted] = useState(alreadyCommitted)
  const [saving, setSaving] = useState(false)

  async function handleCommit() {
    setSaving(true)
    const now = new Date()
    await saveCommitment({
      id: uuidv4(),
      ownerUid,
      resultId,
      area,
      text,
      createdAt: now.toISOString(),
      checkInAt: new Date(now.getTime() + WEEK_MS).toISOString(),
      status: 'pending',
    })
    setCommitted(true)
    setSaving(false)
  }

  if (committed) {
    return (
      <span className="text-xs font-medium text-emerald-600 whitespace-nowrap">
        Committed ✓ — check-in in 7 days
      </span>
    )
  }

  return (
    <button
      onClick={handleCommit}
      disabled={saving}
      className="text-xs font-medium text-indigo-600 hover:underline whitespace-nowrap disabled:opacity-50"
    >
      {saving ? 'Saving...' : 'Commit to this →'}
    </button>
  )
}
