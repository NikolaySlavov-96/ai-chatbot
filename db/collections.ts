import { supabase } from "@/lib/supabase/browser-client"
import { TablesInsert, TablesUpdate } from "@/supabase/types"

export const getCollectionWorkspacesByWorkspaceId = async (
  workspaceId: string
) => {
  const { data: workspace, error } = await supabase
    .from("workspaces")
    .select(
      `
      id,
      name,
      collections (*)
    `
    )
    .eq("id", workspaceId)
    .single()

  if (!workspace) {
    throw new Error(error.message)
  }

  return workspace
}

export const createCollections = async (
  collections: TablesInsert<"collections">[],
  workspace_id: string
) => {
  const { data: createdCollections, error } = await supabase
    .from("collections")
    .insert(collections)
    .select("*")

  if (error) {
    throw new Error(error.message)
  }

  await createCollectionWorkspaces(
    createdCollections.map(collection => ({
      user_id: collection.user_id,
      collection_id: collection.id,
      workspace_id
    }))
  )

  return createdCollections
}

export const createCollectionWorkspaces = async (
  items: { user_id: string; collection_id: string; workspace_id: string }[]
) => {
  const { data: createdCollectionWorkspaces, error } = await supabase
    .from("collection_workspaces")
    .insert(items)
    .select("*")

  if (error) throw new Error(error.message)

  return createdCollectionWorkspaces
}

export const updateCollection = async (
  collectionId: string,
  collection: TablesUpdate<"collections">
) => {
  const { data: updatedCollection, error } = await supabase
    .from("collections")
    .update(collection)
    .eq("id", collectionId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return updatedCollection
}
