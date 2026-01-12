"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { AudioPlayer } from "@/components/audio-player"
import { Loader2, Sparkles, Volume2 } from "lucide-react"

const sports = [
  "Basketball",
  "Soccer",
  "Tennis",
  "Golf",
  "Swimming",
  "Running",
  "Baseball",
  "Football",
  "Hockey",
  "Volleyball",
  "MMA/Boxing",
  "Cycling",
  "Gymnastics",
  "Skiing/Snowboarding",
  "Other",
]

const voiceStyles = [
  { value: "calm", label: "Calm & Soothing" },
  { value: "motivational", label: "Motivational" },
  { value: "focused", label: "Focused & Direct" },
  { value: "gentle", label: "Gentle & Nurturing" },
]

const sessionTypes = [
  { value: "pre-game", label: "Pre-Game Visualization" },
  { value: "recovery", label: "Recovery & Relaxation" },
  { value: "skill", label: "Skill Visualization" },
  { value: "confidence", label: "Confidence Building" },
  { value: "focus", label: "Focus & Concentration" },
]

export function CreateSessionSection() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedSession, setGeneratedSession] = useState<{
    title: string
    duration: string
    audioUrl: string
  } | null>(null)
  const [formData, setFormData] = useState({
    sport: "",
    sessionType: "",
    scenario: "",
    voiceStyle: "calm",
    duration: [10],
  })

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/generate-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sport: formData.sport,
          sessionType: formData.sessionType,
          scenario: formData.scenario,
          voiceStyle: formData.voiceStyle,
          duration: formData.duration[0],
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to generate session")
      }

      const data = await response.json()
      setGeneratedSession({
        title: data.title,
        duration: data.duration,
        audioUrl: data.audioUrl,
      })
    } catch (error) {
      console.error("Error generating session:", error)
      alert(error instanceof Error ? error.message : "Failed to generate session. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section id="create" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Create Your Session</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tell us about your sport, scenario, and goals. Our AI will craft a personalized visualization meditation
            just for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Session Details
              </CardTitle>
              <CardDescription>Customize your visualization experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sport">Sport</Label>
                  <Select value={formData.sport} onValueChange={(value) => setFormData({ ...formData, sport: value })}>
                    <SelectTrigger id="sport">
                      <SelectValue placeholder="Select your sport" />
                    </SelectTrigger>
                    <SelectContent>
                      {sports.map((sport) => (
                        <SelectItem key={sport} value={sport.toLowerCase()}>
                          {sport}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-type">Session Type</Label>
                  <Select
                    value={formData.sessionType}
                    onValueChange={(value) => setFormData({ ...formData, sessionType: value })}
                  >
                    <SelectTrigger id="session-type">
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                    <SelectContent>
                      {sessionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scenario">Describe Your Scenario</Label>
                <Textarea
                  id="scenario"
                  placeholder="E.g., 'I'm preparing for the championship game. I want to visualize making the game-winning shot in front of a packed stadium...'"
                  rows={4}
                  value={formData.scenario}
                  onChange={(e) => setFormData({ ...formData, scenario: e.target.value })}
                  className="bg-input resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="voice">Voice Style</Label>
                <Select
                  value={formData.voiceStyle}
                  onValueChange={(value) => setFormData({ ...formData, voiceStyle: value })}
                >
                  <SelectTrigger id="voice">
                    <SelectValue placeholder="Select voice style" />
                  </SelectTrigger>
                  <SelectContent>
                    {voiceStyles.map((voice) => (
                      <SelectItem key={voice.value} value={voice.value}>
                        {voice.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Session Duration</Label>
                  <span className="text-sm text-muted-foreground">{formData.duration[0]} minutes</span>
                </div>
                <Slider
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  min={5}
                  max={30}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 min</span>
                  <span>30 min</span>
                </div>
              </div>

              <Button
                className="w-full gap-2"
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating || !formData.sport || !formData.sessionType || !formData.scenario}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating Your Session...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Visualization
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Preview / Player */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-primary" />
                Your Session
              </CardTitle>
              <CardDescription>Preview and listen to your generated visualization</CardDescription>
            </CardHeader>
            <CardContent>
              {generatedSession ? (
                <AudioPlayer 
                  title={generatedSession.title} 
                  duration={generatedSession.duration}
                  audioUrl={generatedSession.audioUrl}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-80 text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6">
                    <Volume2 className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No Session Yet</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Fill out the form and click generate to create your personalized visualization meditation.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
