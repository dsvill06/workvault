import { db } from '../drizzle';
import { users } from '../schema';
import { eq } from 'drizzle-orm';

export async function updateOnboardingStep(userId: number, step: number) {
  return await db
    .update(users)
    .set({ onboardingStep: step })
    .where(eq(users.id, userId));
} 