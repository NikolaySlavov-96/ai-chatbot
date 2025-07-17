import { LLM } from "@/types"

const X_AI_PLATFORM_LINK = "https://api.x.ai/v1"

// xAi Grok Models -----------------------------
const GROK_4_LATEST: LLM = {
  modelId: "grok-4-latest",
  modelName: "Grok 4",
  provider: "xAi",
  hostedId: "grok-4-latest",
  platformLink: X_AI_PLATFORM_LINK,
  imageInput: false
}

const GROK_3_LATEST: LLM = {
  modelId: "grok-3-latest",
  modelName: "Grok 3",
  provider: "xAi",
  hostedId: "grok-3-latest",
  platformLink: X_AI_PLATFORM_LINK,
  imageInput: false
}

const GROK_3_MINI_LATEST: LLM = {
  modelId: "grok-3-mini-latest",
  modelName: "Grok 3 mini",
  provider: "xAi",
  hostedId: "grok-3-mini-latest",
  platformLink: X_AI_PLATFORM_LINK,
  imageInput: false
}

const GROK_2_VISION_LATEST: LLM = {
  modelId: "grok-2-vision-latest",
  modelName: "Grok 2 Vision",
  provider: "xAi",
  hostedId: "grok-2-vision-latest",
  platformLink: X_AI_PLATFORM_LINK,
  imageInput: true
}
const GROK_2_IMAGE_LATEST: LLM = {
  modelId: "grok-2-image-latest",
  modelName: "Grok 2 Image",
  provider: "xAi",
  hostedId: "grok-2-image-latest",
  platformLink: X_AI_PLATFORM_LINK,
  imageInput: true
}

const GROK_2_LATEST: LLM = {
  modelId: "grok-2-latest",
  modelName: "Grok 2",
  provider: "xAi",
  hostedId: "grok-2-image-latest",
  platformLink: X_AI_PLATFORM_LINK,
  imageInput: false
}

export const X_AI_LLM_LIST: LLM[] = [
  GROK_4_LATEST,
  GROK_3_LATEST,
  GROK_3_MINI_LATEST,
  GROK_2_VISION_LATEST,
  GROK_2_IMAGE_LATEST,
  GROK_2_LATEST
]
