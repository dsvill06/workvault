import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { getUser } from "@/lib/db/queries";

export default async function OnboardingPage() {
  const user = await getUser();
  if (!user) {
    return <div>User not found</div>;
  }
  const onboardingStep = user.onboardingStep ? Number(user.onboardingStep) : 0;
  return (
    <div className="max-w-md mx-auto my-auto flex flex-row h-screen p-6  rounded-lg justify-items-center align-middle place-items-center ">
      <OnboardingForm user={user} onboardingStep={onboardingStep} />
    </div>
  );
}
