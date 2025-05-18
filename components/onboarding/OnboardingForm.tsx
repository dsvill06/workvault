'use client'
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { redirect, useRouter } from 'next/navigation';

// Step 1: Basic Profile Info
const profileSchema = z.object({
  fullName: z.string().min(2, 'Full Name is required'),
  profileImage: z.string().url('Profile Image must be a valid URL'),
  jobTitle: z.string().min(2, 'Job Title is required'),
  shortBio: z.string().min(2, 'Short Bio is required'),
});

// Step 2: Business Identity
const businessSchema = z.object({
  businessName: z.string().optional(),
  customLogo: z.string().url('Custom Logo must be a valid URL'),
  website: z.string().url('Website must be a valid URL'),
  socialLinks: z.string().optional(), 
});

// Step 3: Defaults & Preferences
const preferencesSchema = z.object({
  timezone: z.enum(["UTC", "GMT", "CST", "EST", "PST"], {
    required_error: 'Timezone is required',
    invalid_type_error: 'Timezone must be one of the specified options',
  }),
  defaultCurrency: z.enum(["USD", "EUR", "GBP", "JPY"], {
    required_error: 'Default Currency is required',
    invalid_type_error: 'Default Currency must be one of the specified options',
  }),
  language: z.enum(["English", "Spanish", "French", "Danish"], {
    required_error: 'Language is required',
    invalid_type_error: 'Language must be one of the specified options',
  }),
  theme: z.enum(['dark', 'light']),
});

const steps = [
  {
    title: 'Basic Profile Info',
    schema: profileSchema,
    fields: [
      { name: 'fullName', label: 'Full Name', type: 'text' },
      { name: 'profileImage', label: 'Profile Image (URL)', type: 'text' },
      { name: 'jobTitle', label: 'Job Title', type: 'text' },
      { name: 'shortBio', label: 'Short Bio', type: 'textarea' },
    ],
  },
  {
    title: 'Business Identity',
    schema: businessSchema,
    fields: [
      { name: 'businessName', label: 'Business Name (optional)', type: 'text' },
      { name: 'customLogo', label: 'Custom Logo (URL, optional)', type: 'text' },
      { name: 'website', label: 'Website / Portfolio URL', type: 'text' },
      { name: 'socialLinks', label: 'Social Links (comma separated, optional)', type: 'text' },
    ],
  },
  {
    title: 'Defaults & Preferences',
    schema: preferencesSchema,
    fields: [
      { name: 'timezone', label: 'Timezone', type: 'select', options: [
        { value: 'UTC', label: 'UTC' },
        { value: 'GMT', label: 'GMT' },
        { value: 'CST', label: 'CST' },
        { value: 'EST', label: 'EST' },
        { value: 'PST', label: 'PST' },
      ] },
      { name: 'defaultCurrency', label: 'Default Currency', type: 'select', options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'JPY', label: 'JPY' },
      ] },
      { name: 'language', label: 'Language', type: 'select', options: [
        { value: 'English', label: 'English' },
        { value: 'Spanish', label: 'Spanish' },
        { value: 'French', label: 'French' },
        { value: 'Danish', label: 'Danish' },
      ] },
      { name: 'theme', label: 'Theme Preference', type: 'select', options: [
        { value: 'dark', label: 'Dark' },
        { value: 'light', label: 'Light' },
      ] },
    ],
  },
];

async function updateOnboarding(userId: string, step: number, data: any) {
  await fetch('/api/onboarding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, step, data}),
  });
}

type FormData = {
  [key: number]: z.infer<typeof profileSchema> | z.infer<typeof businessSchema> | z.infer<typeof preferencesSchema>;
};

type StepSchema = typeof profileSchema | typeof businessSchema | typeof preferencesSchema;

export function OnboardingForm({ user, onboardingStep }: { user: any, onboardingStep: number }) {
  const router = useRouter();
  const [step, setStep] = useState(Math.min(Math.max(0, onboardingStep || 0), steps.length - 1));
  const [formData, setFormData] = useState<FormData>({});

  if(onboardingStep === 3){
    redirect('/dashboard');
  }
  const currentStep = steps[step];
  if (!currentStep) {
    return <div>Invalid step</div>;
  }

  const currentSchema = currentStep.schema as StepSchema;
  type CurrentStepSchema = z.infer<typeof currentSchema>;
  
  const form = useForm<CurrentStepSchema>({
    resolver: zodResolver(currentSchema as any),
    defaultValues: formData[step] || {},
    mode: 'onChange',
  });

  const onSubmit = async (data: CurrentStepSchema) => {
    setFormData((prev) => ({ ...prev, [step]: data }));
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      console.log('Final Data:', { ...formData, [step]: data });
      await updateOnboarding(user.id, step + 1, formData);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{currentStep.title}</h2>
      <form onSubmit={form.handleSubmit(onSubmit as any)}>
        {currentStep.fields.map((field) => {
          const fieldName = field.name as keyof CurrentStepSchema;
          return (
            <div className="mb-4" key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === 'textarea' ? (
                <Textarea id={field.name} {...form.register(fieldName)} />
              ) : field.type === 'select' ? (
                <select id={field.name} {...form.register(fieldName)} className="w-full border rounded p-2">
                  <option value="">Select...</option>
                  {'options' in field && field.options?.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <Input id={field.name} type={field.type} {...form.register(fieldName)} />
              )}
              {form.formState.errors[fieldName] && (
                <p className="text-red-500 text-sm mt-1">
                  {(form.formState.errors[fieldName] as any)?.message}
                </p>
              )}
            </div>
          );
        })}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">Step {step + 1} of {steps.length}</p>
          <p className="text-sm text-gray-500">{currentStep.title}</p>
        </div>
        <div className="flex justify-between mt-6">
          <Button type="button" variant="outline" className={`${step == 0 ? "hidden": ""}`} onClick={handlePrev} disabled={step === 0}>
            Previous
          </Button>
          <Button type="submit" className={`${step == 0 ? " place-self-end justify-end justify-self-end ": ""}`} disabled={!form.formState.isValid}>
            {step === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  );
}
