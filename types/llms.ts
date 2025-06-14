import { ModelProvider } from "."

export type LLMID =
  | OpenAILLMID
  | GoogleLLMID
  | AnthropicLLMID
  | MistralLLMID
  | GroqLLMID
  | PerplexityLLMID
  | xAiLLMID

// OpenAI Models (UPDATED 5/13/24)
export type OpenAILLMID =
  | "gpt-4o" // GPT-4o
  | "gpt-4-turbo-preview" // GPT-4 Turbo
  | "gpt-4" // GPT-4
  | "gpt-3.5-turbo" // Updated GPT-3.5 Turbo
  | "gpt-4-turbo"
  | "gpt-4.1-nano"
  | "gpt-4.1-mini"
  | "gpt-4.1-nano"
  | "gpt-4.1-mini"

// Google Models
export type GoogleLLMID =
  | "gemini-1.5-pro-latest" // Gemini 1.5 Pro
  | "gemini-1.5-flash" // Gemini 1.5 Flash
  | "gemini-2.5-pro-preview-05-06"

// Anthropic Models
export type AnthropicLLMID =
  | "claude-3-haiku-20240307" // Claude 3 Haiku
  | "claude-3-opus-20240229" // Claude 3 Opus
  | "claude-3-5-sonnet-20240620" // Claude 3.5 Sonnet
  | "claude-3-7-sonnet-latest" // Claude 3.7 Sonnet
  | "claude-opus-4-20250514" // Claude 4 Opus
  | "claude-sonnet-4-20250514" // Claude Sonnet

export type xAiLLMID =
  | "grok-3-latest"
  | "grok-3-mini-latest"
  | "grok-2-vision-latest"
  | "grok-2-image-latest"
  | "grok-2-latest"

// Mistral Models
export type MistralLLMID =
  | "mistral-tiny" // Mistral Tiny
  | "mistral-small-latest" // Mistral Small
  | "mistral-medium-latest" // Mistral Medium
  | "mistral-large-latest" // Mistral Large
  | "open-mistral-nemo" // Open Mistral Nemo
  | "codestral-mamba-2407" // CodeStral Mamba 2407
  | "codestral-2405" // CodeStral 2405
  | "mistral-large-2407" // Mistral Large 2407

export type GroqLLMID =
  | "llama3-8b-8192" // LLaMA3-8b
  | "llama3-70b-8192" // LLaMA3-70b
  | "mixtral-8x7b-32768" // Mixtral-8x7b
  | "llama-3.1-70b-versatile" // LLaMA31-405b Instruct
  | "llama-3.1-8b-instant" // LLaMA31-405b Chat
  | "llama3-groq-8b-8192-tool-use-preview" // LLaMA3 Groq 70B Translation

// Perplexity Models (UPDATED 1/31/24)
export type PerplexityLLMID =
  | "sonar" // Sonar
  | "sonar-pro" // Sonar Pro
  | "sonar-reasoning" // Sonar Reasoning
  | "sonar-reasoning-pro" // Sonar Reasoning Pro
// TODO Nikolay: As of "14.06.2025" this model remains inaccessible for now
// | "sonar-deep-research" // Sonar Deep Research

export interface LLM {
  modelId: LLMID
  modelName: string
  provider: ModelProvider
  hostedId: string
  platformLink: string
  imageInput: boolean
  pricing?: {
    currency: string
    unit: string
    inputCost: number
    outputCost?: number
  }
}
