import React from 'react'
import Header from './Header'
import BannerSection from './BannerSection'
import { FeedbackOutlined } from '@mui/icons-material'
import { FeaturesSection } from './FeaturesSection'
import { ContactUs } from './ContactUs'
import Footer from './Footer'

const HomeScreen = () => {
  return (
    <div>
        <Header/>
        <BannerSection/>
        <FeaturesSection/>
        <ContactUs/>
        <Footer/>
    </div>
  )
}

export default HomeScreen