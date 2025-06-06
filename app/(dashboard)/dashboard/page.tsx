import { redirect } from 'next/navigation';
import { Home } from './home';
import { getTeamForUser, getUser } from '@/lib/db/queries';

export default async function DashboardHome() {
  const user = await getUser();
  if (!user) {
    redirect('/sign-in');
  }
  const onbarding = user.onboardingStep ? Number(user.onboardingStep): 0;

  if (onbarding < 3) {
    redirect('/onboarding');
  }

  const teamData = await getTeamForUser(user.id);

  if (!teamData) {
    throw new Error('Team not found');
  }

  return <Home teamData={teamData} user={user} />;
}
