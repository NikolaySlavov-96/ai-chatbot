import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getToolWorkspacesByWorkspaceId = async (workspaceId: string) => {
  const { data: workspace, error } = await supabase
    .from("workspaces")
    .select(
      `
      id,
      name,
      tools (*)
    `
    )
    .eq("id", workspaceId)
    .single()

  if (!workspace) {
    throw new Error(error.message)
  }

  return workspace
}

export const createTools = async (
  tools: TablesInsert<"tools">[],
  workspace_id: string
) => {
  const { data: createdTools, error } = await supabase
    .from("tools")
    .insert(tools)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  await createToolWorkspaces(
    createdTools.map(tool => ({
      user_id: tool.user_id,
      tool_id: tool.id,
      workspace_id
    }))
  )

  return createdTools
}

export const createToolWorkspaces = async (
  items: { user_id: string; tool_id: string; workspace_id: string }[]
) => {
  const { data: createdToolWorkspaces, error } = await supabase
    .from("tool_workspaces")
    .insert(items)
    .select("*")

  if (error) throw new Error(error.message)

  return createdToolWorkspaces
}

export const updateTool = async (
  toolId: string,
  tool: TablesUpdate<"tools">
) => {
  const { data: updatedTool, error } = await supabase
    .from("tools")
    .update(tool)
    .eq("id", toolId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return updatedTool
}
