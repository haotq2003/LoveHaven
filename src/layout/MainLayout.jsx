import React from 'react'
import Header from '../components/Home/Header'
import { Outlet } from "react-router-dom";
import Footer from '../components/Home/Footer';
const MainLayout = () => {
  return (
    <div>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
