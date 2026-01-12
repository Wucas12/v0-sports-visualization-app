import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"
import fs from "fs"
import path from "path"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const voiceMap: Record<string, "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer"> = {
  calm: "nova",
  motivational: "echo",
  focused: "onyx",
  gentle: "shimmer",
}

const toneMap: Record<string, string> = {
  calm: "calm, soothing, and peaceful",
  motivational: "energetic, inspiring, and motivating",
  focused: "clear, direct, and focused",
  gentle: "gentle, nurturing, and supportive",
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sport, sessionType, scenario, voiceStyle, duration } = body

    if (!sport || !sessionType || !scenario) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const tone = toneMap[voiceStyle] || "calm and soothing"

    // Step 1: Generate script
    // Calculate max characters: TTS-1 limit is 4096, leave some buffer for safety
    const maxChars = 3800 // Safe limit below 4096
    const estimatedCharsPerMinute = 600 // Rough estimate: ~150 words/min * 4 chars/word
    const targetChars = Math.min(maxChars, Math.round(duration * estimatedCharsPerMinute))

    const prompt = `Create a ${duration}-minute sports visualization meditation script for ${sport}. 

Session Type: ${sessionType}
Scenario: ${scenario}
Voice Style: ${tone}

The script should:
- Be approximately ${duration} minutes when read at a natural pace
- Be NO MORE than ${targetChars} characters in length (this is a hard limit)
- Use proven sports psychology visualization techniques
- Guide the athlete through a detailed, immersive visualization
- Include breathing exercises and mental preparation
- Be written in second person ("you", "your")
- Have natural pauses and transitions
- Be suitable for audio narration

IMPORTANT: Keep the script concise and under ${targetChars} characters. Write only the script text, no titles or metadata. Start directly with the meditation content.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert sports psychology coach specializing in visualization and meditation techniques for athletes.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: Math.min(2000, Math.floor(targetChars / 4)), // Roughly 4 chars per token
    })

    const script = completion.choices[0]?.message?.content

    if (!script) {
      return NextResponse.json({ error: "Failed to generate script" }, { status: 500 })
    }

    // Step 2: Generate audio
    const voice = voiceMap[voiceStyle] || "nova"

    // Truncate script to TTS-1 limit (4096 characters) as a safety measure
    const truncatedScript = script.length > 4096 ? script.substring(0, 4096) : script

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice,
      input: truncatedScript,
    })

    const buffer = Buffer.from(await mp3.arrayBuffer())

    // Save audio file
    const filename = `audio-${Date.now()}.mp3`
    const audioDir = path.join(process.cwd(), "public", "audio")
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true })
    }

    const filepath = path.join(audioDir, filename)
    fs.writeFileSync(filepath, buffer)

    const audioUrl = `/audio/${filename}`

    // Generate title
    const title = `${sessionType === "pre-game" ? "Pre-Game" : sessionType.charAt(0).toUpperCase() + sessionType.slice(1)} Visualization for ${sport.charAt(0).toUpperCase() + sport.slice(1)}`

    return NextResponse.json({
      title,
      duration: `${duration} min`,
      audioUrl,
      script,
    })
  } catch (error) {
    console.error("Error generating session:", error)
    return NextResponse.json({ error: "Failed to generate session" }, { status: 500 })
  }
}

