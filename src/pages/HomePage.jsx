import React from 'react'
import Header from '../components/Home/Header'

import Footer from '../components/Home/Footer'
import HeroSection from '../components/Home/HeroSection'
import SearchSection from '../components/Home/ServicesSection'
import ServicesSection from '../components/Home/ServicesSection'
import PsychologistsSection from '../components/Home/PsychologistsSection'
import WhyChooseUsSection from '../components/Home/WhyChooseUsSection'
import TestimonialsSection from '../components/Home/TestimonialsSection'
import FaqSection from '../components/Home/FaqSection'
import CallToActionSection from '../components/Home/CallToActionSection'

const HomePage = () => {
  
  return (
    <div className='bg-white min-h-screen '>
   <HeroSection/>
   <ServicesSection/>
   <PsychologistsSection/>
   <WhyChooseUsSection/>
   <TestimonialsSection/>
   <FaqSection/>
   
    </div>
  )
}

export default HomePage
