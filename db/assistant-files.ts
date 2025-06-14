import { supabase } from "@/lib/supabase/browser-client"

export const getAssistantFilesByAssistantId = async (assistantId: string) => {
  const { data: assistantFiles, error } = await supabase
    .from("assistants")
    .select(
      `
        id, 
        name, 
        files (*)
      `
    )
    .eq("id", assistantId)
    .single()

  if (!assistantFiles) {
    throw new Error(error.message)
  }

  return assistantFiles
}
