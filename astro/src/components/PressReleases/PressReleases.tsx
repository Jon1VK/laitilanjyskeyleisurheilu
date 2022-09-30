import type { PressRelease } from '@prisma/client';
import PressReleasesList from './PressReleasesList';
import PressReleasesModifierProvider from './PressReleasesModifier';

const PressReleases = (props: { pressReleases: PressRelease[] }) => {
  return (
    <PressReleasesModifierProvider initialPressReleases={props.pressReleases}>
      <PressReleasesList />
    </PressReleasesModifierProvider>
  );
};

export default PressReleases;
