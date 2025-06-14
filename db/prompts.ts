import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getPromptWorkspacesByWorkspaceId = async (workspaceId: string) => {
  const { data: workspace, error } = await supabase
    .from("workspaces")
    .select(
      `
      id,
      name,
      prompts (*)
    `
    )
    .eq("id", workspaceId)
    .single()

  if (!workspace) {
    throw new Error(error.message)
  }

  return workspace
}

export const createPrompts = async (
  prompts: TablesInsert<"prompts">[],
  workspace_id: string
) => {
  const { data: createdPrompts, error } = await supabase
    .from("prompts")
    .insert(prompts)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  await createPromptWorkspaces(
    createdPrompts.map(prompt => ({
      user_id: prompt.user_id,
      prompt_id: prompt.id,
      workspace_id
    }))
  )

  return createdPrompts
}

export const createPromptWorkspaces = async (
  items: { user_id: string; prompt_id: string; workspace_id: string }[]
) => {
  const { data: createdPromptWorkspaces, error } = await supabase
    .from("prompt_workspaces")
    .insert(items)
    .select("*")

  if (error) throw new Error(error.message)

  return createdPromptWorkspaces
}

export const updatePrompt = async (
  promptId: string,
  prompt: TablesUpdate<"prompts">
) => {
  const { data: updatedPrompt, error } = await supabase
    .from("prompts")
    .update(prompt)
    .eq("id", promptId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return updatedPrompt
}
