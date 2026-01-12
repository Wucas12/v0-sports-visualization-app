"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download, Heart, RotateCcw } from "lucide-react"

interface AudioPlayerProps {
  title: string
  duration: string
}

export function AudioPlayer({ title, duration }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(600) // 10 minutes in seconds
  const [volume, setVolume] = useState([80])
  const [isMuted, setIsMuted] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Parse duration string to seconds
  useEffect(() => {
    const minutes = Number.parseInt(duration.replace(" min", ""))
    setTotalDuration(minutes * 60)
  }, [duration])

  // Simulate playback progress
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, totalDuration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0])
  }

  const handleSkipBack = () => {
    setCurrentTime(Math.max(0, currentTime - 15))
  }

  const handleSkipForward = () => {
    setCurrentTime(Math.min(totalDuration, currentTime + 15))
  }

  const handleRestart = () => {
    setCurrentTime(0)
    setIsPlaying(true)
  }

  return (
    <div className="space-y-6">
      {/* Visualization */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary">
        <img
          src="/abstract-meditation-visualization-with-calming-wav.jpg"
          alt="Session visualization"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary transition-colors flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause className="w-10 h-10 text-primary-foreground" />
            ) : (
              <Play className="w-10 h-10 text-primary-foreground ml-1" />
            )}
          </button>
        </div>

        {/* Playing indicator */}
        {isPlaying && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <div className="flex items-end gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 16 + 8}px`,
                    animationDelay: `${i * 100}ms`,
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-foreground font-medium">Playing</span>
          </div>
        )}
      </div>

      {/* Title & Actions */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{duration} visualization</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
            className={isFavorite ? "text-red-500" : "text-muted-foreground"}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Download className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <Slider value={[currentTime]} onValueChange={handleSeek} max={totalDuration} step={1} className="w-full" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalDuration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="text-muted-foreground">
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
          <Slider value={isMuted ? [0] : volume} onValueChange={setVolume} max={100} step={1} className="w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleRestart}>
            <RotateCcw className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleSkipBack}>
            <SkipBack className="w-5 h-5" />
          </Button>
          <Button size="icon" className="w-12 h-12 rounded-full" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleSkipForward}>
            <SkipForward className="w-5 h-5" />
          </Button>
        </div>
        <div className="w-[88px]" /> {/* Spacer for alignment */}
      </div>
    </div>
  )
}
