import { GoogleGenAI } from "@google/genai"
import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"

export const runtime = "edge"

const getLastMessage = (data: {
  content: string
  parts: string[] | { text: string }[]
}) => {
  if (data.content) {
    return data.content
  } else if (data.parts && data.parts.length > 0) {
    return typeof data.parts[0] === "string"
      ? data.parts[0]
      : data.parts[0]?.text || ""
  }
  return ""
}

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages } = json as {
    chatSettings: ChatSettings
    messages: any[]
  }

  try {
    const profile = await getServerProfile()

    checkApiKey(profile.google_gemini_api_key, "Google")

    const genAI = new GoogleGenAI({
      apiKey: profile.google_gemini_api_key || ""
    })

    const lastMessage = messages.pop()

    let formattedHistory = []
    if (messages.length > 0) {
      if (messages[0].role !== "user") {
        formattedHistory = messages.slice(1)
      } else {
        formattedHistory = messages
      }
    }

    const response = await genAI.chats.create({
      model: chatSettings.model,
      history: formattedHistory.map(m => {
        let role = m.role
        if (role === "assistant") {
          role = "model"
        }

        const messageText = getLastMessage(m)
        return {
          role,
          parts: [{ text: messageText }]
        }
      })
    })

    const lastMessageText = getLastMessage(lastMessage)

    const stream = await response.sendMessageStream({
      message: lastMessageText
    })

    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const chunkText = chunk.text
          controller.enqueue(encoder.encode(chunkText))
        }
        controller.close()
      }
    })

    return new Response(readableStream, {
      headers: { "Content-Type": "text/plain" }
    })
  } catch (error: any) {
    let errorMessage = error.message || "An unexpected error occurred"
    const errorCode = error.status || 500

    if (errorMessage.toLowerCase().includes("api key not found")) {
      errorMessage =
        "Google Gemini API Key not found. Please set it in your profile settings."
    } else if (errorMessage.toLowerCase().includes("api key not valid")) {
      errorMessage =
        "Google Gemini API Key is incorrect. Please fix it in your profile settings."
    }

    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode
    })
  }
}
