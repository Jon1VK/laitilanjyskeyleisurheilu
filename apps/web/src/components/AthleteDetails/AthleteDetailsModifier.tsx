import { api } from "@laitjy/api";
import { logger } from "@laitjy/axiom";
import type { Prisma } from "@laitjy/db";
import { uploadImageToStorage } from "@laitjy/supabase";
import {
  type Context,
  createContext,
  createSignal,
  type ParentComponent,
  useContext,
} from "solid-js";

const createAthleteDetailsModifier = (
  initialAthleteProfile: Prisma.AthleteProfileGetPayload<{
    include: { athlete: true };
  }>
) => {
  const [athleteProfile, setAthleteProfile] = createSignal(
    initialAthleteProfile
  );

  const updateHeroImage = async (image: File) => {
    try {
      const src = await uploadImageToStorage(image);
      await api.athleteProfile.update.mutate({ heroImage: src });
      location.reload();
    } catch (error) {
      await logger.error(error as Error);
      alert("Kansikuvan lataus ei onnistunut. Yritä uudelleen!");
    }
  };

  const updateAvatar = async (image: File) => {
    try {
      const src = await uploadImageToStorage(image);
      const updatedAthleteProfile = await api.athleteProfile.update.mutate({
        avatar: src,
      });
      setAthleteProfile(updatedAthleteProfile);
    } catch (error) {
      await logger.error(error as Error);
      alert("Henkilökuvan lataus ei onnistunut. Yritä uudelleen!");
    }
  };

  const updateProfile = async (formData: FormData) => {
    const updatedAthleteProfile = await api.athleteProfile.update.mutate(
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
  initialAthleteProfile: Prisma.AthleteProfileGetPayload<{
    include: { athlete: true };
  }>;
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
