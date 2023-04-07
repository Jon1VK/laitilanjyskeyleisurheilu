import AthleteDetailsDescription from "./AthleteDetailsDescription";
import AthleteDetailsHeader from "./AthleteDetailsHeader";
import AthleteDetailsModifierProvider from "./AthleteDetailsModifier";
import type { AthleteProfileWithAthlete } from "./types";

const AthleteDetails = (props: {
  athleteProfile: AthleteProfileWithAthlete;
}) => (
  <AthleteDetailsModifierProvider initialAthleteProfile={props.athleteProfile}>
    <article class="relative mx-auto max-w-prose space-y-10 px-6 text-lg sm:px-6 lg:px-8">
      <AthleteDetailsHeader />
      <AthleteDetailsDescription />
    </article>
  </AthleteDetailsModifierProvider>
);

export default AthleteDetails;
