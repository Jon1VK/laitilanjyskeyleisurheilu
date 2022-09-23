import { useAuth } from '@auth';
import logger from '@lib/logger';
import trpcClient from '@lib/trpcClient';
import uploadImage from '@lib/uploadImage';
import { BsImage } from 'solid-icons/bs';
import { createSignal, Show } from 'solid-js';
import type { AthleteProfileWithAthlete } from '../AthleteDetails/types';

type InputChangeHandler = (
  event: Event & { currentTarget: HTMLInputElement }
) => Promise<void>;

const AthleteHeroImage = (props: {
  athleteProfile: AthleteProfileWithAthlete;
}) => {
  const { isLoggedInUser } = useAuth();
  const initialHeroImage = () => props.athleteProfile.heroImage;
  const [heroImage, setHeroImage] = createSignal(
    initialHeroImage() || '/images/hero-placeholder.webp'
  );
  const handleHeroImageChange: InputChangeHandler = async (event) => {
    try {
      const file = event.currentTarget.files?.[0];
      if (!file) return;
      const src = await uploadImage(file);
      await trpcClient.mutation('updateAthleteProfile', { heroImage: src });
      setHeroImage(src);
    } catch (error) {
      await logger.error(error as Error);
      alert('Kansikuvan lataus ei onnistunut. Yritä uudelleen!');
    }
  };
  return (
    <>
      <img
        class="h-full w-full object-cover"
        src={heroImage()}
        alt="Kansikuva"
        aria-hidden="true"
      />
      <Show when={isLoggedInUser(props.athleteProfile.athlete)}>
        <label
          class="absolute bottom-10 left-1/2 z-50 flex -translate-x-1/2 cursor-pointer items-center gap-2 rounded-md bg-white p-2 px-3 text-left font-sans text-xs font-semibold text-gray-700 shadow-sm hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white sm:text-sm"
          for="heroImageButton"
        >
          <BsImage class="h-4 w-4" /> Vaihda kansikuva
        </label>
        <input
          class="hidden"
          id="heroImageButton"
          type="file"
          onChange={handleHeroImageChange}
        />
      </Show>
    </>
  );
};

export default AthleteHeroImage;
