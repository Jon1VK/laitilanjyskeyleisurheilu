import logger from '@lib/logger';
import trpcClient from '@lib/trpcClient';
import uploadImage from '@lib/uploadImage';
import {
  Context,
  createContext,
  createSignal,
  ParentComponent,
  useContext,
} from 'solid-js';
import type { AthleteProfileWithAthlete } from './types';

const createAthleteDetailsModifier = (
  initialAthleteProfile: AthleteProfileWithAthlete
) => {
  const [athleteProfile, setAthleteProfile] = createSignal(
    initialAthleteProfile
  );

  const updateHeroImage = async (image: File) => {
    try {
      const src = await uploadImage(image);
      await trpcClient.mutation('updateAthleteProfile', { heroImage: src });
      location.reload();
    } catch (error) {
      await logger.error(error as Error);
      alert('Kansikuvan lataus ei onnistunut. Yritä uudelleen!');
    }
  };

  const updateAvatar = async (image: File) => {
    try {
      const src = await uploadImage(image);
      const updatedAthleteProfile = await trpcClient.mutation(
        'updateAthleteProfile',
        { avatar: src }
      );
      setAthleteProfile(updatedAthleteProfile);
    } catch (error) {
      await logger.error(error as Error);
      alert('Henkilökuvan lataus ei onnistunut. Yritä uudelleen!');
    }
  };

  const updateProfile = async (formData: FormData) => {
    const updatedAthleteProfile = await trpcClient.mutation(
      'updateAthleteProfile',
      Object.fromEntries(formData)
    );
    setAthleteProfile(updatedAthleteProfile);
  };

  return {
    athleteProfile,
    updateHeroImage,
    updateAvatar,
    updateProfile,
  };
};

type AthleteDetailsModifier = ReturnType<typeof createAthleteDetailsModifier>;

const AthleteDetailsModifierContext =
  createContext() as Context<AthleteDetailsModifier>;

const AthleteDetailsModifierProvider: ParentComponent<{
  initialAthleteProfile: AthleteProfileWithAthlete;
}> = (props) => {
  const eventDetailsModifier = () =>
    createAthleteDetailsModifier(props.initialAthleteProfile);
  return (
    <AthleteDetailsModifierContext.Provider value={eventDetailsModifier()}>
      {props.children}
    </AthleteDetailsModifierContext.Provider>
  );
};

export default AthleteDetailsModifierProvider;

export const useAthleteDetailsModifier = () =>
  useContext(AthleteDetailsModifierContext);
