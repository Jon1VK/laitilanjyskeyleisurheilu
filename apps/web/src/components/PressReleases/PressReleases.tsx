import PressReleasesList from "./PressReleasesList";
import PressReleasesModifierProvider from "./PressReleasesModifier";
import type { PressRelease } from "@laitjy/db";

const PressReleases = (props: { pressReleases: PressRelease[] }) => {
  return (
    <PressReleasesModifierProvider initialPressReleases={props.pressReleases}>
      <PressReleasesList />
    </PressReleasesModifierProvider>
  );
};

export default PressReleases;
