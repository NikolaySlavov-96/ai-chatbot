import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getPresetWorkspacesByWorkspaceId = async (workspaceId: string) => {
  const { data: workspace, error } = await supabase
    .from("workspaces")
    .select(
      `
      id,
      name,
      presets (*)
    `
    )
    .eq("id", workspaceId)
    .single()

  if (!workspace) {
    throw new Error(error.message)
  }

  return workspace
}

export const createPresets = async (
  presets: TablesInsert<"presets">[],
  workspace_id: string
) => {
  const { data: createdPresets, error } = await supabase
    .from("presets")
    .insert(presets)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  await createPresetWorkspaces(
    createdPresets.map(preset => ({
      user_id: preset.user_id,
      preset_id: preset.id,
      workspace_id
    }))
  )

  return createdPresets
}

export const createPresetWorkspaces = async (
  items: { user_id: string; preset_id: string; workspace_id: string }[]
) => {
  const { data: createdPresetWorkspaces, error } = await supabase
    .from("preset_workspaces")
    .insert(items)
    .select("*")

  if (error) throw new Error(error.message)

  return createdPresetWorkspaces
}

export const updatePreset = async (
  presetId: string,
  preset: TablesUpdate<"presets">
) => {
  const { data: updatedPreset, error } = await supabase
    .from("presets")
    .update(preset)
    .eq("id", presetId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return updatedPreset
}
