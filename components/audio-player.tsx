"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Download, Heart, RotateCcw } from "lucide-react"

interface AudioPlayerProps {
  title: string
  duration: string
  audioUrl?: string
}

export function AudioPlayer({ title, duration, audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(600) // 10 minutes in seconds
  const [volume, setVolume] = useState([80])
  const [isMuted, setIsMuted] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl)
      audioRef.current.addEventListener("loadedmetadata", () => {
        setTotalDuration(Math.floor(audioRef.current?.duration || 600))
      })
      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(Math.floor(audioRef.current?.currentTime || 0))
      })
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false)
        setCurrentTime(0)
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [audioUrl])

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
          setIsPlaying(false)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  // Handle volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume[0] / 100
    }
  }, [volume, isMuted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleSkipBack = () => {
    if (audioRef.current) {
      const newTime = Math.max(0, currentTime - 15)
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleSkipForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(totalDuration, currentTime + 15)
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
      setIsPlaying(true)
    }
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
            <span className="text-base text-foreground font-medium">Playing</span>
          </div>
        )}
      </div>

      {/* Title & Actions */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="text-base text-muted-foreground">{duration} visualization</p>
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
        <div className="flex justify-between text-base text-muted-foreground">
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

