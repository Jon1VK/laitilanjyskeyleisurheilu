import { stringUtils } from "@laitjy/utils";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const PRIVATE_SUPABASE_KEY = import.meta.env.PRIVATE_SUPABASE_KEY;
const PUBLIC_SUPABASE_KEY = import.meta.env.PUBLIC_SUPABASE_KEY;
const SUPABASE_KEY = PRIVATE_SUPABASE_KEY || PUBLIC_SUPABASE_KEY;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export const deleteFilesFromStorage = (files: string[]) => {
  return supabaseClient.storage.from("files").remove(files);
};

export const uploadImageToStorage = async (file: File) => {
  const hash = Math.random().toString(36).slice(2);
  const uploadURL = `images/${hash}_${file.name}`;
  const { data, error } = await supabaseClient.storage
    .from("files")
    .upload(uploadURL, file);
  if (error) throw error;
  return `${SUPABASE_URL}/storage/v1/object/public/${data?.Key as string}`;
};

export const uploadTimetableToStorage = async (timetableData: {
  file: File;
  title: string;
  date: Date;
}) => {
  const { data, error } = await supabaseClient.storage.from("files").upload(
    `timetables/${timetableData.date.toLocaleDateString(
      "sv"
    )}__${stringUtils.parameterize(timetableData.title, {
      separator: " ",
      preserveCase: true,
    } as { separator: string })}__Aikataulu`,
    timetableData.file
  );
  if (error) throw error;
  return data?.Key as string;
};

export const uploadResultsToStorage = async (resultsData: {
  file: File;
  title: string;
  date: Date;
}) => {
  const { data, error } = await supabaseClient.storage.from("files").upload(
    `results/${resultsData.date.toLocaleDateString(
      "sv"
    )}__${stringUtils.parameterize(resultsData.title, {
      separator: " ",
      preserveCase: true,
    } as { separator: string })}__Tulokset`,
    resultsData.file
  );
  if (error) throw error;
  return data?.Key as string;
};

export const getResultsFromStorage = async () => {
  const { data } = await supabaseClient.storage
    .from("files")
    .list("results", { sortBy: { column: "name", order: "desc" } });
  return data;
};
