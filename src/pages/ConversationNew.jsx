import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { useSession } from '../context/useSession'
import { saveConversation } from '../utils/db'
import { logEvent } from '../utils/firebase'

export default function ConversationNew() {
  const { session } = useSession()
  const navigate = useNavigate()
  const [situation, setSituation] = useState('')
  const [behavior, setBehavior] = useState('')
  const [impact, setImpact] = useState('')
  const [desiredChange, setDesiredChange] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (session === undefined) return <p className="text-center text-slate-500">Loading...</p>
  if (session === null) return <Navigate to="/role" replace />

  const canSubmit = situation.trim() && behavior.trim() && impact.trim() && desiredChange.trim()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    const conversation = {
      id: uuidv4(),
      ownerUid: session.uid,
      situation: situation.trim(),
      behavior: behavior.trim(),
      impact: impact.trim(),
      desiredChange: desiredChange.trim(),
      createdAt: new Date().toISOString(),
    }
    await saveConversation(conversation)
    logEvent('conversation_prepped', {})
    navigate(`/conversations/${conversation.id}`)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Prep the Conversation</h1>
        <p className="text-slate-600 mt-2">
          Stay factual and specific in each field — vague inputs make a vague, less effective
          conversation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-slate-200 rounded-xl p-6">
        <Field
          label="Situation"
          hint="When and where did this happen? Stick to observable facts."
          value={situation}
          onChange={setSituation}
          placeholder="In yesterday's sprint review..."
        />
        <Field
          label="Behavior"
          hint="What specifically did they do or say? Not your interpretation of it — the actual behavior."
          value={behavior}
          onChange={setBehavior}
          placeholder="You interrupted two teammates while they were presenting..."
        />
        <Field
          label="Impact"
          hint="What effect did it have — on the team, the project, or you?"
          value={impact}
          onChange={setImpact}
          placeholder="It made it harder for quieter team members to share updates, and..."
        />
        <Field
          label="What you need to change"
          hint="Be concrete about the specific behavior change you're asking for."
          value={desiredChange}
          onChange={setDesiredChange}
          placeholder="I need you to let people finish their point before jumping in..."
        />

        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-white font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {submitting ? 'Generating...' : 'Generate Conversation Script'}
        </button>
      </form>
    </div>
  )
}

function Field({ label, hint, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <p className="text-xs text-slate-400 mb-1.5">{hint}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
      />
    </div>
  )
}
