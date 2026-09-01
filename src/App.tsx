import { useState } from 'react'
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
import PilotForm from './components/PilotForm'

function App() {
  const [pilotFormOpen, setPilotFormOpen] = useState(false)

  const scrollToBusinessForm = () => {
    const el = document.getElementById('empresas')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar onOpenPilotForm={() => setPilotFormOpen(true)} />
      <main>
        <Hero
          onOpenPilotForm={() => setPilotFormOpen(true)}
          onOpenAllyForm={scrollToBusinessForm}
        />
        <HowItWorks />
        <WhatWeAccept />
        <Benefits />
        <LocationPreview />
        <Impact />
        <AppPreview onOpenPilotForm={() => setPilotFormOpen(true)} />
        <ForBusiness />
        <CircularChain />
        <FAQ />
        <FinalCTA
          onOpenPilotForm={() => setPilotFormOpen(true)}
          onOpenAllyForm={scrollToBusinessForm}
        />
      </main>
      <Footer />
      <PilotForm
        open={pilotFormOpen}
        onClose={() => setPilotFormOpen(false)}
      />
    </>
  )
}

export default App
