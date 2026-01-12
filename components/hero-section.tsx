import { Button } from "@/components/ui/button"
import { Play, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-accent/30 mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-lg text-accent">AI-Powered Mental Training</span>
          </div>

          <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tight text-foreground mb-6 text-balance">
            Vantage
          </h1>

          <p className="text-3xl sm:text-4xl font-semibold text-foreground mb-4 max-w-2xl mx-auto">
            Pro-level sports psychology, <span className="text-accent">on demand</span>.
          </p>

          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
            Personalized, AI-guided audio sessions to help you focus, steady nerves, and perform at your best—whenever it matters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2 px-8" asChild>
              <a href="#create">
                <Sparkles className="w-5 h-5" />
                Create Your First Session
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-transparent border-accent text-accent hover:bg-accent/10 hover:text-accent" asChild>
              <a href="/sample">
                <Play className="w-5 h-5" />
                Listen to Sample
              </a>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "10K+", label: "Athletes" },
            { value: "50K+", label: "Sessions Created" },
            { value: "15+", label: "Sports" },
            { value: "4.9", label: "Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-5xl sm:text-6xl font-bold text-accent">{stat.value}</div>
              <div className="text-base text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
