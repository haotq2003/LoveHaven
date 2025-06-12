import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/user/HomePage'
import AboutPage from './pages/user/AboutPage'
import MainLayout from './layout/MainLayout'
import Login from './pages/auth/Login'
import ServicesPage from './pages/user/ServicesPage'
import ServiceDetail from './pages/user/ServiceDetail'
import ExpertsPage from './pages/user/ExpertsPage'
import ContactPage from './pages/user/ContactPage'
import Register from './pages/auth/Register'
import DoctorRegister from './pages/auth/DoctorRegister'
import Dashboard from './pages/manager/Dashboard';
import Services from './pages/manager/Services';
import Customers from './pages/manager/Customers';
import ManagerLayout from './components/manager/ManagerLayout'
import Blog from './pages/manager/Blog'
import BlogPage from './pages/user/BlogPage'
import BlogDetail from './pages/user/BlogDetail'
import ConsultantLayout from './components/consultant/ConsultantLayout'
import ConsultantDashboard from './pages/consultant/DashBoard'
import Profile from './pages/user/Profile'
import AppointmentDetail from './pages/consultant/AppointmentDetail'
import PaymentResult from './pages/user/PaymentResult'
import ExpertDetail from './pages/user/ExpertDetail'
import BookingHistory from './pages/user/BookingHistory'


function App() {
  return (
   <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="doctor-register" element={<DoctorRegister />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:id" element={<ServiceDetail />} />
        <Route path="experts" element={<ExpertsPage />} />
        <Route path="/experts/:accountId" element={<ExpertDetail />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/payment-result" element={<PaymentResult />} />
      </Route>
      <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="services" element={<Services />} />
          <Route path="users" element={<Customers />} />
          <Route path="blog" element={<Blog />} />
          {/* Thêm các routes khác cho manager ở đây */}
      </Route>
      <Route path="/consultant" element={<ConsultantLayout />}>
          <Route index element={<ConsultantDashboard />} />
          <Route path="/consultant/appointments/:id" element={<AppointmentDetail />} />
          {/* Thêm các routes khác cho consultant ở đây */}
      </Route>
   </Routes>
  )
}

export default App
