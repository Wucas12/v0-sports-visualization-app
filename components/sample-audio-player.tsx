"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Global audio instance to prevent multiple plays
let globalAudioInstance: HTMLAudioElement | null = null

export function SampleAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [volume, setVolume] = useState([80])
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio and ensure sample exists
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        setIsLoading(true)
        // Ensure the sample exists
        const response = await fetch("/api/generate-boxing-sample")
        if (!response.ok) {
          throw new Error("Failed to load sample audio")
        }

        // Use global instance or create new one
        if (!globalAudioInstance) {
          globalAudioInstance = new Audio("/audio/boxing-sample.mp3")
        }
        
        audioRef.current = globalAudioInstance

        // Set up event listeners
        audioRef.current.addEventListener("loadedmetadata", () => {
          setTotalDuration(Math.floor(audioRef.current?.duration || 0))
          setIsLoading(false)
        })

        audioRef.current.addEventListener("timeupdate", () => {
          setCurrentTime(Math.floor(audioRef.current?.currentTime || 0))
        })

        audioRef.current.addEventListener("ended", () => {
          setIsPlaying(false)
          setCurrentTime(0)
        })

        audioRef.current.addEventListener("error", () => {
          setError("Failed to load audio. Please try again.")
          setIsLoading(false)
        })

        // Load the audio
        audioRef.current.load()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to initialize audio")
        setIsLoading(false)
      }
    }

    initializeAudio()

    return () => {
      // Don't clean up global instance, just pause if playing
      if (audioRef.current && isPlaying) {
        audioRef.current.pause()
      }
    }
  }, [])

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        // Stop any other audio instances
        if (globalAudioInstance && globalAudioInstance !== audioRef.current) {
          globalAudioInstance.pause()
          globalAudioInstance.currentTime = 0
        }
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error)
          setIsPlaying(false)
          setError("Failed to play audio. Please try again.")
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

  const togglePlayPause = () => {
    if (audioRef.current && totalDuration > 0) {
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-3xl">Boxing Visualization Sample</CardTitle>
        <CardDescription className="text-lg">
          A short sample of our AI-generated sports visualization meditation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive">
            {error}
          </div>
        )}

        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            onValueChange={handleSeek}
            max={totalDuration || 100}
            step={1}
            className="w-full"
            disabled={isLoading || totalDuration === 0}
          />
          <div className="flex justify-between text-base text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              size="lg"
              onClick={togglePlayPause}
              disabled={isLoading || totalDuration === 0 || !!error}
              className="w-16 h-16 rounded-full p-0"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="text-muted-foreground"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              <Slider
                value={isMuted ? [0] : volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="w-24"
              />
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            {isLoading ? "Loading..." : isPlaying ? "Playing" : "Paused"}
          </div>
        </div>

        {/* Audio Info */}
        <div className="pt-4 border-t border-border">
          <p className="text-base text-muted-foreground">
            This sample demonstrates our AI-powered visualization meditation for boxing. Create your own personalized session tailored to your sport, scenario, and goals.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

