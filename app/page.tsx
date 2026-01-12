import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CreateSessionSection } from "@/components/create-session-section"
import { SessionLibrary } from "@/components/session-library"
import { HowItWorks } from "@/components/how-it-works"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CreateSessionSection />
      <HowItWorks />
      <SessionLibrary />
    </main>
  )
}
