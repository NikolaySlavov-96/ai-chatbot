import { supabase } from "@/lib/supabase/browser-client"

export const getAssistantCollectionsByAssistantId = async (
  assistantId: string
) => {
  const { data: assistantCollections, error } = await supabase
    .from("assistants")
    .select(
      `
        id, 
        name, 
        collections (*)
      `
    )
    .eq("id", assistantId)
    .single()

  if (!assistantCollections) {
    throw new Error(error.message)
  }

  return assistantCollections
}
