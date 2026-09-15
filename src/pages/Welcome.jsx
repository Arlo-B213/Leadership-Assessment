import { useNavigate } from 'react-router-dom'
import { useSession } from '../context/useSession'

export default function Welcome() {
  const navigate = useNavigate()
  const { session } = useSession()

  return (
    <div className="text-center max-w-2xl mx-auto">
      <p className="text-indigo-600 font-medium mb-3">Management Style Assessment</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
        Discover your management style, strengths, and growth areas
      </h1>
      <p className="text-slate-600 mb-8">
        A 20-question assessment covering decision-making, communication, feedback,
        empathy, and more — plus a personalized roadmap to grow as a leader.
      </p>
      {session ? (
        <button
          onClick={() => navigate(session.role === 'manager' ? '/dashboard' : '/assessment')}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition-colors"
        >
          {session.role === 'manager' ? 'Go to Dashboard' : 'Take the Assessment'}
        </button>
      ) : (
        <button
          onClick={() => navigate('/role')}
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition-colors"
        >
          Get Started
        </button>
      )}

      <div className="grid sm:grid-cols-3 gap-4 mt-12 text-left">
        <FeatureCard title="20 questions" desc="Covering 5 core management dimensions, answered in about 8 minutes." />
        <FeatureCard title="5 management styles" desc="Including the Emotionally Intelligent Leader, built around empathy." />
        <FeatureCard title="Personal roadmap" desc="Concrete next steps based on your strengths and growth edges." />
      </div>
    </div>
  )
}

function FeatureCard({ title, desc }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  )
}
