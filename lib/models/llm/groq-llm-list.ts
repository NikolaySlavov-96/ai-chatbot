import { LLM } from "@/types"

const GROQ_PLATORM_LINK = "https://groq.com/"

const LLaMA3_8B: LLM = {
  modelId: "llama3-8b-8192",
  modelName: "LLaMA3-8b-chat",
  provider: "groq",
  hostedId: "llama3-8b-8192",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.05,
    outputCost: 0.1
  }
}

const LLaMA3_70B: LLM = {
  modelId: "llama3-70b-8192",
  modelName: "LLaMA3-70b-chat",
  provider: "groq",
  hostedId: "llama3-70b-4096",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.59,
    outputCost: 0.79
  }
}

const GEMMA_7B_IT: LLM = {
  modelId: "gemma-7b-it",
  modelName: "Gemma-7b-It",
  provider: "groq",
  hostedId: "gemma-7b-it",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false,
  pricing: {
    currency: "USD",
    unit: "1M tokens",
    inputCost: 0.15,
    outputCost: 0.15
  }
}


const LLaMA31_405B: LLM = {
  modelId: "llama-3.1-405b-reasoning",
  modelName: "LLaMA31-405b-chat",
  provider: "groq",
  hostedId: "llama-3.1-405b-reasoning",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false
}

const LLaMA31_8B: LLM = {
  modelId: "llama-3.1-8b-instant",
  modelName: "LLaMA31-8b-chat",
  provider: "groq",
  hostedId: "llama-3.1-8b-instant",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false
}

const LLaMA3_70B_TOOL: LLM = {
  modelId: "llama3-groq-70b-8192-tool-use-preview",
  modelName: "LLaMA3-Groq-70b-Tool-Use",
  provider: "groq",
  hostedId: "llama3-groq-70b-8192-tool-use-preview",
  platformLink: GROQ_PLATORM_LINK,
  imageInput: false
}

export const GROQ_LLM_LIST: LLM[] = [
  LLaMA3_8B,
  LLaMA3_70B,
  GEMMA_7B_IT,
  LLaMA31_405B,
  LLaMA3_70B_TOOL,
  LLaMA31_8B,
]
