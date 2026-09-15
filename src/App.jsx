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
import Progress from './pages/Progress'
import ScenarioList from './pages/ScenarioList'
import ScenarioPlay from './pages/ScenarioPlay'
import FeedbackHub from './pages/FeedbackHub'
import FeedbackManage from './pages/FeedbackManage'
import FeedbackRespond from './pages/FeedbackRespond'
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
        <Route path="/progress" element={<Progress />} />
        <Route path="/practice" element={<ScenarioList />} />
        <Route path="/practice/:id" element={<ScenarioPlay />} />
        <Route path="/feedback" element={<FeedbackHub />} />
        <Route path="/feedback/respond/:id" element={<FeedbackRespond />} />
        <Route path="/feedback/:id" element={<FeedbackManage />} />
      </Routes>
    </Layout>
  )
}
