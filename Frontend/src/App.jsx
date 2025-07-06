import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/landingPage'
import Homepage from './pages/Homepage.jsx'
import Authentication from './pages/Authentication.jsx'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import VideoMeet from './pages/VideoMeet.jsx'
import ProtectedRoute from './contexts/ProtectedRoute.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
// import VideoMeets from './pages/VideoMeets.jsx'

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Authentication />} />
            <Route
              path="/:meetingCode"
              element={
                <ProtectedRoute>
                  <VideoMeet />
                </ProtectedRoute>
              }
            />
            <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
            <Route path="/home" element={<Homepage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
