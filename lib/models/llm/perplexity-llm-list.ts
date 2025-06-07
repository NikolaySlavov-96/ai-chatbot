import { LLM } from "@/types"

const PERPLEXITY_PLATFORM_LINK =
  "https://docs.perplexity.ai/docs/getting-started"

// Perplexity Models (UPDATED 07/06/25) -----------------------------
const PERPLEXITY_SONAR: LLM = {
  modelId: "sonar",
  modelName: "Sonar",
  provider: "perplexity",
  hostedId: "sonar",
  platformLink: PERPLEXITY_PLATFORM_LINK,
  imageInput: false
}

const PERPLEXITY_SONAR_PRO: LLM = {
  modelId: "sonar-pro",
  modelName: "Sonar Pro",
  provider: "perplexity",
  hostedId: "sonar-pro",
  platformLink: PERPLEXITY_PLATFORM_LINK,
  imageInput: false
}

const PERPLEXITY_SONAR_REASONING: LLM = {
  modelId: "sonar-reasoning",
  modelName: "Sonar Reasoning",
  provider: "perplexity",
  hostedId: "sonar-reasoning",
  platformLink: PERPLEXITY_PLATFORM_LINK,
  imageInput: false
}

const PERPLEXITY_SONAR_REASONING_PRO: LLM = {
  modelId: "sonar-reasoning-pro",
  modelName: "Sonar Reasoning Pro",
  provider: "perplexity",
  hostedId: "sonar-reasoning-pro",
  platformLink: PERPLEXITY_PLATFORM_LINK,
  imageInput: false
}

const PERPLEXITY_SONAR_DEEP_RESEARCH: LLM = {
  modelId: "sonar-deep-research",
  modelName: "Sonar Deep Research",
  provider: "perplexity",
  hostedId: "sonar-deep-research",
  platformLink: PERPLEXITY_PLATFORM_LINK,
  imageInput: false
}

export const PERPLEXITY_LLM_LIST: LLM[] = [
  PERPLEXITY_SONAR,
  PERPLEXITY_SONAR_PRO,
  PERPLEXITY_SONAR_REASONING,
  PERPLEXITY_SONAR_REASONING_PRO,
  PERPLEXITY_SONAR_DEEP_RESEARCH,
]
