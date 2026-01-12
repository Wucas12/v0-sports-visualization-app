import { NextResponse } from "next/server"
import OpenAI from "openai"
import fs from "fs"
import path from "path"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET() {
  try {
    const samplePath = path.join(process.cwd(), "public", "audio", "boxing-sample.mp3")
    
    // Check if sample already exists
    if (fs.existsSync(samplePath)) {
      return NextResponse.json({ exists: true, url: "/audio/boxing-sample.mp3" })
    }

    // Generate a short boxing visualization script
    const script = `Find a comfortable position and close your eyes. Take a deep breath in, and slowly exhale. 

You're standing in the ring, feeling the canvas beneath your feet. The crowd's energy surrounds you, but you're focused, calm, and ready. 

Take another breath. Feel your body strong, your muscles loose, your mind clear. You've trained for this moment. You know every move, every combination. 

Breathe in confidence. Breathe out doubt. You are a champion. You are ready to perform at your absolute best. 

When you open your eyes, carry this confidence with you.`

    // Generate audio using OpenAI TTS-1
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "echo", // Motivational voice
      input: script,
    })

    const buffer = Buffer.from(await mp3.arrayBuffer())

    // Ensure audio directory exists
    const audioDir = path.join(process.cwd(), "public", "audio")
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true })
    }

    // Save the sample
    fs.writeFileSync(samplePath, buffer)

    return NextResponse.json({ 
      success: true, 
      url: "/audio/boxing-sample.mp3",
      message: "Boxing sample audio generated successfully"
    })
  } catch (error) {
    console.error("Error generating boxing sample:", error)
    return NextResponse.json({ error: "Failed to generate sample" }, { status: 500 })
  }
}

