import { useAuth } from '@auth';
import trpcClient from '@lib/trpcClient';
import { BsImage } from 'solid-icons/bs';
import { createSignal, Show } from 'solid-js';
import type { AthleteProfileWithAthlete } from '../AthleteDetails/types';
import ImageForm from '../ImageForm';
import Modal from '../Modal';

const AthleteHeroImage = (props: {
  athleteProfile: AthleteProfileWithAthlete;
}) => {
  const { isLoggedInUser } = useAuth();
  const initialHeroImage = () => props.athleteProfile.heroImage;
  const [heroImage, setHeroImage] = createSignal(
    initialHeroImage() || '/images/hero-placeholder.webp'
  );
  const [showImageForm, setShowImageForm] = createSignal(false);
  const handleImageFormSubmit = async (src: string) => {
    const updatedAthleteProfile = await trpcClient.mutation(
      'updateAthleteProfile',
      { heroImage: src }
    );
    setHeroImage(
      updatedAthleteProfile.heroImage || '/images/hero-placeholder.webp'
    );
    setShowImageForm(false);
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
        <button
          onClick={() => setShowImageForm(true)}
          class="absolute bottom-10 left-1/2 z-50 -translate-x-1/2 rounded-md bg-white p-2 text-left font-sans text-xs font-semibold text-gray-700 shadow-sm hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white sm:text-sm"
        >
          <div class="flex items-center px-1 text-sm">
            <BsImage class="mr-2 h-4 w-4" /> Vaihda kansikuva
          </div>
        </button>
      </Show>
      <Show when={showImageForm()}>
        <Modal close={() => setShowImageForm(false)}>
          <ImageForm onSubmit={handleImageFormSubmit} />
        </Modal>
      </Show>
    </>
  );
};

export default AthleteHeroImage;
