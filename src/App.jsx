import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MainLayout from './layout/MainLayout'
import Login from './pages/Login'
import ServicesPage from './pages/ServicesPage'
import ExpertsPage from './pages/ExpertsPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
   <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<Login />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="experts" element={<ExpertsPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
   </Routes>
  )
}

export default App
