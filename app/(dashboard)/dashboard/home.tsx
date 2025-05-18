'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { customerPortalAction } from '@/lib/payments/actions';
import { useActionState } from 'react';
import { TeamDataWithMembers, User } from '@/lib/db/schema';
import { removeTeamMember } from '@/app/(login)/actions';
import { InviteTeamMember } from './team/invite-team';
import { useRouter } from 'next/navigation';
import { 
  Briefcase, 
  FileText, 
  Users, 
  Settings, 
  BarChart3,
  Calendar
} from 'lucide-react';

type ActionState = {
  error?: string;
  success?: string;
};

export function Home({ teamData, user }: { teamData: TeamDataWithMembers , user: any }) {
  const router = useRouter();
  const [removeState, removeAction, isRemovePending] = useActionState<
    ActionState,
    FormData
  >(removeTeamMember, { error: '', success: '' });

  const getUserDisplayName = (user: Pick<User, 'id' | 'fullName' | 'email'>) => {
    return user?.fullName || user?.email || 'Unknown User';
  };
  const user_id = teamData.teamMembers[0].id;

  // const sampleProjects = [
  //   {
  //     id: 1,
  //     createdAt: new Date().toISOString(),
  //     userId: user_id,
  //     clientId: 1,
  //     title: "Website Redesign",
  //     description: "Complete overhaul of company website with modern design and improved UX",
  //     status: "In Progress",
  //     startDate: "2024-03-01",
  //     dueDate: "2024-04-15",
  //     budget: 15000,
  //     currency: "USD"
  //   },
  //   {
  //     id: 2,
  //     createdAt: new Date().toISOString(),
  //     userId: user_id,
  //     clientId: 2,
  //     title: "Mobile App Development",
  //     description: "Development of a new mobile application for iOS and Android",
  //     status: "Planning",
  //     startDate: "2024-04-01",
  //     dueDate: "2024-06-30",
  //     budget: 25000,
  //     currency: "USD"
  //   },
  //   {
  //     id: 3,
  //     createdAt: new Date().toISOString(),
  //     userId: user_id,
  //     clientId: 3,
  //     title: "E-commerce Platform",
  //     description: "Building a new e-commerce platform with payment integration",
  //     status: "Completed",
  //     startDate: "2024-01-15",
  //     dueDate: "2024-03-01",
  //     budget: 30000,
  //     currency: "USD"
  //   }
  // ];
  const sampleProjects = [];

  const dashboardItems = [
    {
      title: 'Projects',
      description: 'Manage your active projects and track their progress',
      icon: Briefcase,
      href: '/dashboard/projects',
      color: 'text-blue-500'
    },
    {
      title: 'Invoices',
      description: 'View and manage client invoices and payments',
      icon: FileText,
      href: '/dashboard/invoices',
      color: 'text-green-500'
    },
    {
      title: 'Contracts',
      description: 'Write custome contracts for your clients',
      icon: FileText,
      href: '/dashboard/contracts',
      color: 'text-purple-500'
    },
    {
      title: 'Calendar',
      description: 'View project timelines and deadlines',
      icon: Calendar,
      href: '/dashboard/calendar',
      color: 'text-orange-500'
    },
    {
      title: 'Analytics',
      description: 'Track project metrics and performance',
      icon: BarChart3,
      href: '/dashboard/analytics',
      color: 'text-red-500'
    },
    {
      title: 'Settings',
      description: 'Configure your workspace settings',
      icon: Settings,
      href: '/dashboard/settings',
      color: 'text-gray-500'
    }
  ];

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium mb-6">Welcome Back, {getUserDisplayName(user)}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dashboardItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card 
              key={item.title}
              className="hover:shadow-lg transition-shadow dark:shadow-[#282828] cursor-pointer"
              onClick={() => router.push(item.href)}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-gray-100 ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">{item.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
