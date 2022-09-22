import trpcClient from '@lib/trpcClient';
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

  const updateAvatar = async (src: string) => {
    const updatedAthleteProfile = await trpcClient.mutation(
      'updateAthleteProfile',
      { avatar: src }
    );
    setAthleteProfile(updatedAthleteProfile);
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
