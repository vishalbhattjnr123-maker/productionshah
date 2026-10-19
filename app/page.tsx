import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import IntroductionSection from '@/components/IntroductionSection'
import FeaturedPortfolio from '@/components/FeaturedPortfolio'
import ServicesSection from '@/components/ServicesSection'
import ExperienceSection from '@/components/ExperienceSection'
import FilmsSection from '@/components/FilmsSection'
import AboutSection from '@/components/AboutSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import JournalSection from '@/components/JournalSection'
import AutoplayCinemaSection from '@/components/AutoplayCinemaSection'
import EnquirySection from '@/components/EnquirySection'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <IntroductionSection />
      <FeaturedPortfolio />
      <ServicesSection />
      <ExperienceSection />
      <FilmsSection />
      <AboutSection />
      <TestimonialsSection />
      <JournalSection />
      <AutoplayCinemaSection />
      <EnquirySection />
      <Footer />
      <FloatingContact />
    </main>
  )
}
