import { Link } from 'react-router-dom'
import { useSession } from '../context/SessionContext'

export default function Layout({ children }) {
  const { session, resetSession } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg text-indigo-600">
            Management Assessment
          </Link>
          {session.role && (
            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-500 hidden sm:inline">
                {session.name || session.email} · {session.role === 'manager' ? 'Manager' : 'Team Member'}
              </span>
              {session.role === 'manager' && (
                <Link to="/dashboard" className="text-indigo-600 hover:underline">
                  Dashboard
                </Link>
              )}
              <Link
                to="/"
                onClick={resetSession}
                className="text-slate-400 hover:text-slate-600"
              >
                Exit
              </Link>
            </div>
          )}
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">{children}</main>
    </div>
  )
}
