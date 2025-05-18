import { NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { userId, step, data } = await request.json();
    
    const updateData = {
      onboardingStep: step,
      // Personal Information (step 0)
      fullName: data['0'].fullName,
      profileImage: data['0'].profileImage,
      jobTitle: data['0'].jobTitle,
      bio: data['0'].shortBio,
      // Business Information (step 1)
      businessName: data['1'].businessName,
      businessLogo: data['1'].customLogo,
      website: data['1'].website,
      socials: data['1'].socialLinks,
      // Preferences (step 2)
      timeZone: data['2'].timezone,
      currency: data['2'].defaultCurrency,
      language: data['2'].language,
      them: data['2'].theme 
    };

    await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId));
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    console.error('Error updating onboarding step:', error);
    return NextResponse.json(
      { error: 'Failed to update onboarding step' },
      { status: 500 }
    );
  }
} 