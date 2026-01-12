import React from "react"
import { Brain, Mic, Headphones, Trophy } from "lucide-react"

const steps = [
  {
    icon: Brain,
    title: "Describe Your Vision",
    description: "Tell us your sport, the scenario you want to visualize, and the mental state you want to achieve.",
  },
  {
    icon: Mic,
    title: "AI Generates Script",
    description: "Our AI crafts a personalized meditation script using proven sports psychology techniques.",
  },
  {
    icon: Headphones,
    title: "Listen & Visualize",
    description: "Experience your custom audio session with calming narration and ambient soundscapes.",
  },
  {
    icon: Trophy,
    title: "Achieve Peak Performance",
    description: "Regular practice builds neural pathways that translate to real-world performance gains.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl sm:text-7xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to unlock your mental potential and visualize success
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-px bg-accent/30" />
              )}

              <div className="relative flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-2xl bg-secondary border-2 border-accent/30 flex items-center justify-center mb-6 relative z-10">
                  {React.createElement(step.icon, { className: "w-10 h-10 text-accent" })}
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-base font-bold text-accent-foreground translate-x-1/4 -translate-y-1/4">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-base text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
