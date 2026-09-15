import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSession } from '../context/useSession'

export default function RoleSelect() {
  const navigate = useNavigate()
  const { updateSession } = useSession()
  const [searchParams] = useSearchParams()
  const invited = Boolean(searchParams.get('team'))

  function choose(role) {
    updateSession({ role })
    navigate(`/info?${searchParams.toString()}`)
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">How will you be using this?</h1>
      <p className="text-slate-600 mb-8">
        {invited
          ? "You're joining a team via invite — either option will add you to that team."
          : 'This determines what you see after your assessment.'}
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <RoleCard
          title="I'm a Manager"
          desc="Take the assessment, create a team, and invite your reports to take it too. See a team dashboard with aggregate insights."
          onClick={() => choose('manager')}
        />
        <RoleCard
          title="I'm a Team Member"
          desc="Take the assessment and get your personal results and roadmap. Your manager can invite you to a team."
          onClick={() => choose('member')}
        />
      </div>
    </div>
  )
}

function RoleCard({ title, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl border border-slate-200 bg-white p-6 hover:border-indigo-400 hover:shadow-md transition-all"
    >
      <h3 className="font-semibold text-lg text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500">{desc}</p>
    </button>
  )
}
