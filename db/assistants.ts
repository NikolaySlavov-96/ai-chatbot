import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getAssistantWorkspacesByWorkspaceId = async (
  workspaceId: string
) => {
  const { data: workspace, error } = await supabase
    .from("workspaces")
    .select(
      `
      id,
      name,
      assistants (*)
    `
    )
    .eq("id", workspaceId)
    .single()

  if (!workspace) {
    throw new Error(error.message)
  }

  return workspace
}

export const createAssistants = async (
  assistants: TablesInsert<"assistants">[],
  workspace_id: string
) => {
  const { data: createdAssistants, error } = await supabase
    .from("assistants")
    .insert(assistants)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  await createAssistantWorkspaces(
    createdAssistants.map(assistant => ({
      user_id: assistant.user_id,
      assistant_id: assistant.id,
      workspace_id
    }))
  )

  return createdAssistants
}

export const createAssistantWorkspaces = async (
  items: { user_id: string; assistant_id: string; workspace_id: string }[]
) => {
  const { data: createdAssistantWorkspaces, error } = await supabase
    .from("assistant_workspaces")
    .insert(items)
    .select("*")

  if (error) throw new Error(error.message)

  return createdAssistantWorkspaces
}

export const updateAssistant = async (
  assistantId: string,
  assistant: TablesUpdate<"assistants">
) => {
  const { data: updatedAssistant, error } = await supabase
    .from("assistants")
    .update(assistant)
    .eq("id", assistantId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return updatedAssistant
}
