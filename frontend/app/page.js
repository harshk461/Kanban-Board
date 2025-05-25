'use client'

import React from 'react'
import KanbanBoard from './KanbanBoard'
import Navbar from './Components/Navbar'
import HeroBanner from './Components/HeroBanner';
import FeaturesSection from './Components/FeatureSection';
import TestimonialsSection from './Components/TestinomialSection';
import PricingSection from './Components/PricingSection';
import FAQSection from './Components/FAQSection';
import NewsletterSignup from './Components/NewsLetterSection';
import Footer from './Components/Footer';

export default function Home() {
  const user = {
    name: "Jane Doe",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  };

  return (
    <div>
      <HeroBanner/>
      <FeaturesSection/>
      <TestimonialsSection/>
      <PricingSection/>
      <FAQSection/>
      <NewsletterSignup/>
      <Footer/>
    </div>
  )
}
