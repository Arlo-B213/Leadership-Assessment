import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Welcome from './pages/Welcome'
import RoleSelect from './pages/RoleSelect'
import AuthForm from './pages/AuthForm'
import Assessment from './pages/Assessment'
import Results from './pages/Results'
import Roadmap from './pages/Roadmap'
import ManagerDashboard from './pages/ManagerDashboard'
import { logEvent } from './utils/firebase'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    logEvent('page_view', { page_path: location.pathname })
  }, [location.pathname])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/role" element={<RoleSelect />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/results/:id" element={<Results />} />
        <Route path="/roadmap/:id" element={<Roadmap />} />
        <Route path="/dashboard" element={<ManagerDashboard />} />
      </Routes>
    </Layout>
  )
}
