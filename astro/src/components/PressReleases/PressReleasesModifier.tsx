import trpcClient from '@lib/trpcClient';
import type { PressRelease } from '@prisma/client';
import {
  Context,
  createContext,
  createSignal,
  ParentComponent,
  useContext,
} from 'solid-js';

const createPressReleasesModifier = (initialPressReleases: PressRelease[]) => {
  const [pressReleases, setPressReleases] = createSignal(initialPressReleases);

  const updatePressRelease = async (id: number, formData: FormData) => {
    const sendDate = new Date(formData.get('sendDate') as string);
    const newsBody = formData.get('newsBody') as string;
    const whatsappBody = formData.get('whatsappBody') as string;
    const updatedPressRelease = await trpcClient.mutation(
      'updatePressRelease',
      {
        id,
        sendDate,
        newsBody,
        whatsappBody,
      }
    );
    setPressReleases(
      pressReleases().map((pressRelease) =>
        pressRelease.id !== id ? pressRelease : updatedPressRelease
      )
    );
  };

  const deletePressRelease = async (pressReleaseToDelete: PressRelease) => {
    await trpcClient.mutation('deletePressRelease', pressReleaseToDelete.id);
    setPressReleases(
      pressReleases().filter(
        (pressRelease) => pressRelease.id !== pressReleaseToDelete.id
      )
    );
  };

  return {
    pressReleases,
    updatePressRelease,
    deletePressRelease,
  };
};

type PressReleasesModifier = ReturnType<typeof createPressReleasesModifier>;

const PressReleasesModifierContext =
  createContext() as Context<PressReleasesModifier>;

const PressReleasesModifierProvider: ParentComponent<{
  initialPressReleases: PressRelease[];
}> = (props) => {
  const pressReleasesModifier = () =>
    createPressReleasesModifier(props.initialPressReleases);
  return (
    <PressReleasesModifierContext.Provider value={pressReleasesModifier()}>
      {props.children}
    </PressReleasesModifierContext.Provider>
  );
};

export default PressReleasesModifierProvider;

export const usePressReleasesModifier = () =>
  useContext(PressReleasesModifierContext);
