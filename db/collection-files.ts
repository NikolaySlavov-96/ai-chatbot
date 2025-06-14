import { supabase } from "@/lib/supabase/browser-client"

export const getCollectionFilesByCollectionId = async (
  collectionId: string
) => {
  const { data: collectionFiles, error } = await supabase
    .from("collections")
    .select(
      `
        id, 
        name, 
        files ( id, name, type )
      `
    )
    .eq("id", collectionId)
    .single()

  if (!collectionFiles) {
    throw new Error(error.message)
  }

  return collectionFiles
}
