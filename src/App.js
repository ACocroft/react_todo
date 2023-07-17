import React from 'react'
import './App.css'
import Navigation from './components/Navigation'
import ProtectedRoute from './components/Routing/ProtectedRoute'
import NotFound from './components/NotFound'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ToDos from './components/ToDos/ToDos'
import AuthProvider from './Contexts/AuthContext'
import Login from './components/Auth/Login'
import Categories from './components/Categories/Categories'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<ProtectedRoute><ToDos /></ProtectedRoute>} />
            <Route path='login' element={<Login />} />
            <Route path='/todos' element={<ProtectedRoute><ToDos /></ProtectedRoute>} />
            <Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  )
}
