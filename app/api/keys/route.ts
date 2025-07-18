import { isUsingEnvironmentKey } from "@/lib/envs"
import { createResponse } from "@/lib/server/server-utils"
import { EnvKey } from "@/types/key-type"
import { VALID_ENV_KEYS } from "@/types/valid-keys"

export async function GET() {
  const envKeyMap: Record<string, VALID_ENV_KEYS> = {
    openai: VALID_ENV_KEYS.OPENAI_API_KEY,
    google: VALID_ENV_KEYS.GOOGLE_GEMINI_API_KEY,
    anthropic: VALID_ENV_KEYS.ANTHROPIC_API_KEY,
    mistral: VALID_ENV_KEYS.MISTRAL_API_KEY,
    groq: VALID_ENV_KEYS.GROQ_API_KEY,
    perplexity: VALID_ENV_KEYS.PERPLEXITY_API_KEY,
    xAi: VALID_ENV_KEYS.X_AI_API_KEY
  }

  const isUsingEnvKeyMap = Object.keys(envKeyMap).reduce<
    Record<string, boolean>
  >((acc, provider) => {
    const key = envKeyMap[provider]

    if (key) {
      acc[provider] = isUsingEnvironmentKey(key as EnvKey)
    }
    return acc
  }, {})

  return createResponse({ isUsingEnvKeyMap }, 200)
}
