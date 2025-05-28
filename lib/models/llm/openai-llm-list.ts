import { LLM } from "@/types"

const OPENAI_PLATORM_LINK = "https://platform.openai.com/docs/overview"

// OpenAI Models (UPDATED 1/25/24) -----------------------------
const GPT4o: LLM = {
  modelId: "gpt-4o",
  modelName: "GPT-4o",
  provider: "openai",
  hostedId: "gpt-4o",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 5,
    outputCost: 15
  }
}

// GPT-4 Turbo (UPDATED 1/25/24)
const GPT4Turbo: LLM = {
  modelId: "gpt-4-turbo-preview",
  modelName: "GPT-4 Turbo",
  provider: "openai",
  hostedId: "gpt-4-turbo-preview",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 10,
    outputCost: 30
  }
}

const GPT4TurboPLus: LLM = {
  modelId: "gpt-4-turbo",
  modelName: "GPT-4 Turbo - upgraded",
  provider: "openai",
  hostedId: "gpt-4-turbo",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true
}

// GPT-4 (UPDATED 1/29/24)
const GPT4: LLM = {
  modelId: "gpt-4",
  modelName: "GPT-4",
  provider: "openai",
  hostedId: "gpt-4",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 30,
    outputCost: 60
  }
}

// GPT-3.5 Turbo (UPDATED 1/25/24)
const GPT3_5Turbo: LLM = {
  modelId: "gpt-3.5-turbo",
  modelName: "GPT-3.5 Turbo",
  provider: "openai",
  hostedId: "gpt-3.5-turbo",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.5,
    outputCost: 1.5
  }
}

const GPT41PreviewNano: LLM = {
  modelId: "gpt-4.1-nano",
  modelName: "GPT 4.1 nano",
  provider: "openai",
  hostedId: "gpt-4.1-nano",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true
}

const GPT41PreviewMini: LLM = {
  modelId: "gpt-4.1-mini",
  modelName: "GPT 4.1 mini",
  provider: "openai",
  hostedId: "gpt-4.1-mini",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true
}

const o1: LLM = {
  modelId: "o1-preview",
  modelName: "o1",
  provider: "openai",
  hostedId: "o1-preview",
  platformLink: OPENAI_PLATORM_LINK,
  imageInput: true
}



export const OPENAI_LLM_LIST: LLM[] = [
  GPT3_5Turbo,
  GPT4,
  GPT41PreviewMini,
  GPT41PreviewNano,
  GPT4o,
  GPT4Turbo,
  GPT4TurboPLus,
  o1,
]
