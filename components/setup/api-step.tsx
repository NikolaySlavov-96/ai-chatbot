import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FC } from "react"
import { Button } from "../ui/button"

interface APIStepProps {
  openaiAPIKey: string
  anthropicAPIKey: string
  googleGeminiAPIKey: string
  mistralAPIKey: string
  groqAPIKey: string
  perplexityAPIKey: string
  onOpenaiAPIKeyChange: (value: string) => void
  onAnthropicAPIKeyChange: (value: string) => void
  onGoogleGeminiAPIKeyChange: (value: string) => void
  onMistralAPIKeyChange: (value: string) => void
  onGroqAPIKeyChange: (value: string) => void
  onPerplexityAPIKeyChange: (value: string) => void
}

export const APIStep: FC<APIStepProps> = ({
  openaiAPIKey,
  anthropicAPIKey,
  googleGeminiAPIKey,
  mistralAPIKey,
  groqAPIKey,
  perplexityAPIKey,
  onOpenaiAPIKeyChange,
  onAnthropicAPIKeyChange,
  onGoogleGeminiAPIKeyChange,
  onMistralAPIKeyChange,
  onGroqAPIKeyChange,
  onPerplexityAPIKeyChange
}) => {
  return (
    <>
      <div className="mt-5 space-y-2">
        <Input
          placeholder={"OpenAI API Key"}
          type="password"
          value={openaiAPIKey}
          onChange={e => onOpenaiAPIKeyChange(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label>Anthropic API Key</Label>

        <Input
          placeholder="Anthropic API Key"
          type="password"
          value={anthropicAPIKey}
          onChange={e => onAnthropicAPIKeyChange(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label>Google Gemini API Key</Label>

        <Input
          placeholder="Google Gemini API Key"
          type="password"
          value={googleGeminiAPIKey}
          onChange={e => onGoogleGeminiAPIKeyChange(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label>Mistral API Key</Label>

        <Input
          placeholder="Mistral API Key"
          type="password"
          value={mistralAPIKey}
          onChange={e => onMistralAPIKeyChange(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label>Groq API Key</Label>

        <Input
          placeholder="Groq API Key"
          type="password"
          value={groqAPIKey}
          onChange={e => onGroqAPIKeyChange(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <Label>Perplexity API Key</Label>

        <Input
          placeholder="Perplexity API Key"
          type="password"
          value={perplexityAPIKey}
          onChange={e => onPerplexityAPIKeyChange(e.target.value)}
        />
      </div>
    </>
  )
}
