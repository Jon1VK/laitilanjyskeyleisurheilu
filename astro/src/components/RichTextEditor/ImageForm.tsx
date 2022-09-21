import supabaseClient from '@lib/supabaseClient';

type ChangeHandler = (
  event: Event & { currentTarget: HTMLInputElement }
) => Promise<void>;

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;

const ImageForm = (props: { onSubmit: (src: string) => void }) => {
  const handleChange: ChangeHandler = async (event) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    const hash = Math.random().toString(36).slice(2);
    const uploadURL = `images/${hash}_${file.name}`;
    const { data } = await supabaseClient.storage
      .from('files')
      .upload(uploadURL, file);
    const src = `${SUPABASE_URL}/storage/v1/object/public/${
      data?.Key as string
    }`;
    props.onSubmit(src);
  };
  return (
    <>
      <header class="text-gray-600">
        <h3 class="mb-4 text-lg font-medium leading-6 text-gray-900">
          Lisää kuva
        </h3>
      </header>
      <input
        required
        type="file"
        id="image"
        onChange={handleChange}
        class="w-full cursor-pointer rounded-md border border-gray-300 text-sm shadow-sm file:mr-3 file:cursor-pointer file:border-0 file:bg-gray-200 file:py-2 file:px-4 file:font-medium file:hover:bg-gray-300"
      />
    </>
  );
};

export default ImageForm;
