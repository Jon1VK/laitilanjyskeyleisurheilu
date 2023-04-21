import { api } from "@laitjy/api";
import type { PressRelease } from "@laitjy/db";
import type { Context, ParentComponent } from "solid-js";
import { createContext, createSignal, useContext } from "solid-js";

const createPressReleasesModifier = (initialPressReleases: PressRelease[]) => {
  const [pressReleases, setPressReleases] = createSignal(initialPressReleases);

  const updatePressRelease = async (id: number, formData: FormData) => {
    const sendDate = new Date(formData.get("sendDate") as string);
    const newsBody = formData.get("newsBody") as string;
    const whatsappBody = formData.get("whatsappBody") as string;
    const updatedPressRelease = await api.pressRelease.update.mutate({
      id,
      update: {
        sendDate,
        newsBody,
        whatsappBody,
      },
    });
    setPressReleases(
      pressReleases().map((pressRelease) =>
        pressRelease.id !== id ? pressRelease : updatedPressRelease
      )
    );
  };

  const deletePressRelease = async (pressReleaseToDelete: PressRelease) => {
    await api.pressRelease.delete.mutate({
      id: pressReleaseToDelete.id,
    });
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
