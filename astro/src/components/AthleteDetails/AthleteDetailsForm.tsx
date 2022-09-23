import type { AthleteProfile } from '@prisma/client';
import { FaBrandsInstagram, FaBrandsLinkedinIn } from 'solid-icons/fa';
import { createSignal } from 'solid-js';
import RichTextEditor from '../RichTextEditor';

type SubmitHandler = (
  event: Event & { currentTarget: HTMLFormElement }
) => void;

const AthleteDetailsForm = (props: {
  athleteProfile: AthleteProfile;
  onSubmit: (formData: FormData) => void;
}) => {
  const [richTextDescription, setRichTextDescription] = createSignal('');
  const handleSubmit: SubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set('description', richTextDescription());
    props.onSubmit(formData);
  };
  return (
    <>
      <h3 class="mb-6 text-lg font-medium leading-6 text-gray-900">
        Muokkaa profiilia
      </h3>
      <form onSubmit={handleSubmit} class="space-y-6 text-sm">
        <div class="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label for="mainEvents" class="flex items-center">
              Päälaji(t)
            </label>
            <input
              type="text"
              placeholder="Pikajuoksu"
              name="mainEvents"
              value={props.athleteProfile.mainEvents || ''}
              id="mainEvents"
              class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
            />
          </div>
          <div class="space-y-1 sm:col-span-2">
            <p>Sosiaalinen media</p>
            <div class="flex items-center">
              <label for="instagram" class="mr-2">
                <FaBrandsInstagram class="h-5 w-5" />
              </label>
              <input
                type="text"
                placeholder="Käyttäjätunnus"
                name="instagram"
                value={props.athleteProfile.instagram || ''}
                id="instagram"
                class="w-full rounded-md border-gray-300 text-sm shadow-sm"
              />
            </div>
            <div class="flex items-center">
              <label for="linkedin" class="mr-2">
                <FaBrandsLinkedinIn class="h-5 w-5" />
              </label>
              <input
                type="text"
                placeholder="https://www.linkedin.com/in/tunnus"
                name="linkedin"
                value={props.athleteProfile.linkedin || ''}
                id="linkedin"
                class="w-full rounded-md border-gray-300 text-sm shadow-sm"
              />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label>Kuvaus</label>
            <div class="mt-1 w-full">
              <RichTextEditor
                initialHTML={props.athleteProfile.description || ''}
                onChange={setRichTextDescription}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="w-full rounded-md bg-blue-700 py-2 px-4 font-medium text-white shadow-sm hover:bg-blue-800 sm:w-1/2"
        >
          Tallenna
        </button>
      </form>
    </>
  );
};

export default AthleteDetailsForm;
