import { getSupabaseClient } from "../supabaseConfig.ts";

const SUPABASE_BUCKET_NAME = process.env.REACT_APP_SUPABASE_BUCKET_NAME || ""

export const uploadFileToSupabase = async (filename: string, file: File, userId: string) => {
  if (!file) {
    alert("Please select a file first.");
    return;
  }

  try {
    const fileName = `${Date.now()}-${filename}`;
    const { data, error } = await getSupabaseClient().storage
      .from(SUPABASE_BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        metadata: { user_id: userId },
      });

    if (error) {
      throw error;
    }
    return fileName;
  } catch (error) {
    alert("Failed to UPLOAD file.");
    return null;
  }
};


export const fetchFileFromSupabase = async (fileName: string) => {
  try {
    const { data, error } = await getSupabaseClient().storage
      .from(SUPABASE_BUCKET_NAME)
      .download(fileName);
    if (error) throw error;
    return data;
  } catch (error) {
    alert("Failed to FETCH file.");
    return null;
  }
};

export const deleteFileFromSupabase = async (filename: string) => {

  try {
    const { data, error } = await getSupabaseClient().storage
      .from(SUPABASE_BUCKET_NAME)
      .remove([filename]);

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    alert("Failed to DELETE file.");
    return null;
  }
};
