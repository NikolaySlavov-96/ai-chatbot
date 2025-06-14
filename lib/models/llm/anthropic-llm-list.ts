import { LLM } from "@/types"

const ANTHROPIC_PLATFORM_LINK =
  "https://docs.anthropic.com/claude/reference/getting-started-with-the-api"

// Anthropic Models -----------------------------
// Claude 3 Haiku (UPDATED 03/13/24)
const CLAUDE_3_HAIKU: LLM = {
  modelId: "claude-3-haiku-20240307",
  modelName: "Claude 3 Haiku",
  provider: "anthropic",
  hostedId: "claude-3-haiku-20240307",
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.25,
    outputCost: 1.25
  }
}

// Claude 3 Opus (UPDATED 03/04/24)
const CLAUDE_3_OPUS: LLM = {
  modelId: "claude-3-opus-20240229",
  modelName: "Claude 3 Opus",
  provider: "anthropic",
  hostedId: "claude-3-opus-20240229",
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 15,
    outputCost: 75
  }
}

// Claude 3.5 Sonnet (UPDATED 06/20/24)
const CLAUDE_3_5_SONNET: LLM = {
  modelId: "claude-3-5-sonnet-20240620",
  modelName: "Claude 3.5 Sonnet",
  provider: "anthropic",
  hostedId: "claude-3-5-sonnet-20240620",
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 3,
    outputCost: 15
  }
}

// Claude 3.7 Sonnet (UPDATED 03/03/25)
const CLAUDE_3_7_SONNET: LLM = {
  modelId: "claude-3-7-sonnet-latest",
  modelName: "Claude 3.7 Sonnet",
  provider: "anthropic",
  hostedId: "claude-3-7-sonnet-latest",
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: true
}

const CLAUDE_OPUS_4: LLM = {
  modelId: "claude-opus-4-20250514",
  modelName: "Claude 4 Opus",
  provider: "anthropic",
  hostedId: "claude-opus-4-20250514",
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: true
}

const CLAUDE_SONNET_4: LLM = {
  modelId: "claude-sonnet-4-20250514",
  modelName: "Claude 4 Sonnet",
  provider: "anthropic",
  hostedId: "claude-sonnet-4-20250514",
  platformLink: ANTHROPIC_PLATFORM_LINK,
  imageInput: true
}

export const ANTHROPIC_LLM_LIST: LLM[] = [
  CLAUDE_3_HAIKU,
  CLAUDE_3_OPUS,
  CLAUDE_3_5_SONNET,
  CLAUDE_3_7_SONNET,
  CLAUDE_OPUS_4,
  CLAUDE_SONNET_4
]
