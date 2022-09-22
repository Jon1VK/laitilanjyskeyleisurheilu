import { useAuth } from '@auth';
import {
  FaBrandsInstagram,
  FaBrandsLinkedin,
  FaSolidCameraRetro,
} from 'solid-icons/fa';
import { HiOutlinePencilAlt } from 'solid-icons/hi';
import { createSignal, Show } from 'solid-js';
import ImageForm from '../ImageForm';
import Modal from '../Modal';
import AthleteDetailsForm from './AthleteDetailsForm';
import { useAthleteDetailsModifier } from './AthleteDetailsModifier';

const EventDetailsHeader = () => {
  const { isLoggedInUser } = useAuth();
  const { athleteProfile, updateAvatar, updateProfile } =
    useAthleteDetailsModifier();
  const [showImageForm, setShowImageForm] = createSignal(false);
  const [showAthleteProfileForm, setShowAthleteProfileForm] =
    createSignal(false);
  const handleImageFormSubmit = async (src: string) => {
    await updateAvatar(src);
    setShowImageForm(false);
  };
  const handleAthleteProfileFormSubmit = async (formData: FormData) => {
    await updateProfile(formData);
    setShowAthleteProfileForm(false);
  };
  return (
    <>
      <header class="mx-auto max-w-prose space-y-6">
        <div class="relative mx-auto h-40 w-40 xl:h-56 xl:w-56">
          <img
            class="h-40 w-40 rounded-full object-cover xl:h-56 xl:w-56"
            src={athleteProfile().avatar || '/images/avatar-placeholder.jpg'}
            alt="Profiilikuva"
          />
          <Show when={isLoggedInUser(athleteProfile().athlete)}>
            <button
              onClick={() => setShowImageForm(true)}
              class="absolute right-1.5 bottom-1.5 rounded-full bg-blue-700 p-2.5 text-white xl:right-3 xl:bottom-3 xl:p-3"
            >
              <FaSolidCameraRetro />
            </button>
          </Show>
        </div>
        <div class="space-y-4 text-center">
          <Show when={isLoggedInUser(athleteProfile().athlete)}>
            <button
              onClick={() => setShowAthleteProfileForm(true)}
              class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 shadow-sm hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white"
            >
              <div class="flex items-center px-1 text-sm">
                <HiOutlinePencilAlt class="mr-2 h-5 w-5" /> Muokkaa profiilia
              </div>
            </button>
          </Show>
          <div class="space-y-1 text-lg font-medium leading-6">
            <h3>{athleteProfile().athlete.name}</h3>
            <p class="text-blue-700">{athleteProfile().mainEvents}</p>
          </div>

          <div class="flex justify-center space-x-4">
            <Show when={athleteProfile().instagram}>
              <a
                target="_blank"
                href={athleteProfile().instagram as string}
                class="text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only">Instagram</span>
                <FaBrandsInstagram class="h-6 w-6" />
              </a>
            </Show>
            <Show when={athleteProfile().linkedin}>
              <a
                target="_blank"
                href={athleteProfile().linkedin as string}
                class="text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only">LinkedIn</span>
                <FaBrandsLinkedin class="h-6 w-6" />
              </a>
            </Show>
          </div>
        </div>
      </header>
      <Show when={showImageForm()}>
        <Modal close={() => setShowImageForm(false)}>
          <ImageForm onSubmit={handleImageFormSubmit} />
        </Modal>
      </Show>
      <Show when={showAthleteProfileForm()}>
        <Modal close={() => setShowAthleteProfileForm(false)}>
          <AthleteDetailsForm
            athleteProfile={athleteProfile()}
            onSubmit={handleAthleteProfileFormSubmit}
          />
        </Modal>
      </Show>
    </>
  );
};

export default EventDetailsHeader;
