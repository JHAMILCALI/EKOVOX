import './App.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import WhatWeAccept from './components/WhatWeAccept'
import Benefits from './components/Benefits'
import LocationPreview from './components/LocationPreview'
import Impact from './components/Impact'
import AppPreview from './components/AppPreview'
import ForBusiness from './components/ForBusiness'
import CircularChain from './components/CircularChain'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

function App() {
  const scrollToBusinessForm = () => {
    const el = document.getElementById('empresas')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero
          onOpenAllyForm={scrollToBusinessForm}
        />
        <HowItWorks />
        <WhatWeAccept />
        <Benefits />
        <LocationPreview />
        <Impact />
        <AppPreview />
        <ForBusiness />
        <CircularChain />
        <FAQ />
        <FinalCTA
          onOpenAllyForm={scrollToBusinessForm}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
