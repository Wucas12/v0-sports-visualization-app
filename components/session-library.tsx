"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, Heart, MoreHorizontal } from "lucide-react"

const sessions = [
  {
    id: 1,
    title: "Pre-Game Championship Focus",
    sport: "Basketball",
    duration: "10 min",
    type: "Pre-Game",
    plays: 24,
    favorite: true,
    image: "/basketball-court-visualization-mental-focus.jpg",
  },
  {
    id: 2,
    title: "Perfect Serve Visualization",
    sport: "Tennis",
    duration: "8 min",
    type: "Skill",
    plays: 18,
    favorite: false,
    image: "/tennis-court-serve-visualization-mindfulness.jpg",
  },
  {
    id: 3,
    title: "Marathon Mental Endurance",
    sport: "Running",
    duration: "15 min",
    type: "Focus",
    plays: 32,
    favorite: true,
    image: "/running-marathon-visualization-peaceful.jpg",
  },
  {
    id: 4,
    title: "Recovery & Muscle Relaxation",
    sport: "Swimming",
    duration: "20 min",
    type: "Recovery",
    plays: 45,
    favorite: false,
    image: "/swimming-pool-relaxation-meditation-calm-water.jpg",
  },
  {
    id: 5,
    title: "Penalty Kick Confidence",
    sport: "Soccer",
    duration: "7 min",
    type: "Confidence",
    plays: 12,
    favorite: true,
    image: "/soccer-penalty-kick-visualization-stadium.jpg",
  },
  {
    id: 6,
    title: "Perfect Swing Mechanics",
    sport: "Golf",
    duration: "12 min",
    type: "Skill",
    plays: 28,
    favorite: false,
    image: "/golf-course-swing-visualization-serene.jpg",
  },
]

const typeColors: Record<string, string> = {
  "Pre-Game": "bg-primary/20 text-primary",
  Skill: "bg-blue-500/20 text-blue-400",
  Focus: "bg-green-500/20 text-green-400",
  Recovery: "bg-cyan-500/20 text-cyan-400",
  Confidence: "bg-amber-500/20 text-amber-400",
}

export function SessionLibrary() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredSessions = activeTab === "favorites" ? sessions.filter((s) => s.favorite) : sessions

  return (
    <section id="library" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Session Library</h2>
            <p className="text-muted-foreground">Your personalized collection of visualization sessions</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Sessions</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((session) => (
            <Card
              key={session.id}
              className="bg-card border-border overflow-hidden group hover:border-primary/50 transition-colors"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={session.image || "/placeholder.svg"}
                  alt={session.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="lg" className="gap-2">
                    <Play className="w-5 h-5" />
                    Play Now
                  </Button>
                </div>
                <Badge className={`absolute top-3 left-3 ${typeColors[session.type]}`}>{session.type}</Badge>
                {session.favorite && <Heart className="absolute top-3 right-3 w-5 h-5 text-red-500 fill-red-500" />}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground line-clamp-1">{session.title}</h3>
                    <p className="text-sm text-muted-foreground">{session.sport}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0 -mr-2">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {session.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Play className="w-4 h-4" />
                    {session.plays} plays
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" size="lg">
            View All Sessions
          </Button>
        </div>
      </div>
    </section>
  )
}
