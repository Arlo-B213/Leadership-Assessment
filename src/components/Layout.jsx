import { Link, useNavigate } from 'react-router-dom'
import { useSession } from '../context/useSession'
import { logOut } from '../utils/authApi'
import CheckInBanner from './CheckInBanner'

const TOOL_LINKS = [
  { to: '/progress', label: 'Progress' },
  { to: '/practice', label: 'Practice Scenarios' },
  { to: '/feedback', label: '360 Feedback' },
  { to: '/conversations', label: 'Conversation Coach' },
  { to: '/team', label: 'Team Standards' },
]

export default function Layout({ children }) {
  const { session } = useSession()
  const navigate = useNavigate()

  async function handleLogOut() {
    await logOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg text-indigo-600">
            Management Assessment
          </Link>
          {session && (
            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-500 hidden sm:inline">
                {session.name || session.email} · {session.role === 'manager' ? 'Manager' : 'Team Member'}
              </span>
              <details className="relative">
                <summary className="text-indigo-600 hover:underline cursor-pointer list-none">Tools</summary>
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg py-1 z-20">
                  {TOOL_LINKS.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </details>
              {session.role === 'manager' && (
                <Link to="/dashboard" className="text-indigo-600 hover:underline">
                  Dashboard
                </Link>
              )}
              <button onClick={handleLogOut} className="text-slate-400 hover:text-slate-600">
                Log out
              </button>
            </div>
          )}
        </div>
        {session && <CheckInBanner uid={session.uid} />}
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">{children}</main>
    </div>
  )
}
