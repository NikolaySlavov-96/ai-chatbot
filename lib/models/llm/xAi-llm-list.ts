import { LLM } from "@/types"

const X_AI_PLATFORM_LINK = "https://api.x.ai/v1"

// xAi Grok Models -----------------------------
const GROK_3_LATEST: LLM = {
  modelId: "grok-3-latest",
  modelName: "Grok 3",
  provider: "xAi",
  hostedId: "grok-3-latest",
  platformLink: X_AI_PLATFORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.25,
    outputCost: 1.25
  }
}

export const X_AI_LLM_LIST: LLM[] = [
  GROK_3_LATEST,
]
