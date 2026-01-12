import { SampleAudioPlayer } from "@/components/sample-audio-player"
import { Header } from "@/components/header"

export default function SamplePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-6xl sm:text-7xl font-bold text-foreground mb-4">
              Sample Audio
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience a sample boxing visualization meditation to see how Vantage can help you prepare for peak performance.
            </p>
          </div>

          <div className="mt-12">
            <SampleAudioPlayer />
          </div>

          <div className="mt-16 text-center">
            <a
              href="#create"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors"
            >
              Create Your Own Session
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

