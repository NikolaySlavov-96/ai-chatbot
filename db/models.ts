import { supabase } from "@/lib/supabase/browser-client"
import { TablesUpdate } from "@/supabase/types"

export const getModelWorkspacesByWorkspaceId = async (workspaceId: string) => {
  const { data: workspace, error } = await supabase
    .from("workspaces")
    .select(
      `
      id,
      name,
      models (*)
    `
    )
    .eq("id", workspaceId)
    .single()

  if (!workspace) {
    throw new Error(error.message)
  }

  return workspace
}

export const updateModel = async (
  modelId: string,
  model: TablesUpdate<"models">
) => {
  const { data: updatedModel, error } = await supabase
    .from("models")
    .update(model)
    .eq("id", modelId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return updatedModel
}
