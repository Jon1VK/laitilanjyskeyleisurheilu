import supabaseClient from "./supabaseClient";

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;

const uploadImage = async (file: File) => {
  const hash = Math.random().toString(36).slice(2);
  const uploadURL = `images/${hash}_${file.name}`;
  const { data, error } = await supabaseClient.storage
    .from("files")
    .upload(uploadURL, file);
  if (error) throw error;
  return `${SUPABASE_URL}/storage/v1/object/public/${data?.Key as string}`;
};

export default uploadImage;
