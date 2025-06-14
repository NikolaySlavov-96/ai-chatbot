import { supabase } from "@/lib/supabase/browser-client"

export const getAssistantToolsByAssistantId = async (assistantId: string) => {
  const { data: assistantTools, error } = await supabase
    .from("assistants")
    .select(
      `
        id, 
        name, 
        tools (*)
      `
    )
    .eq("id", assistantId)
    .single()

  if (!assistantTools) {
    throw new Error(error.message)
  }

  return assistantTools
}
