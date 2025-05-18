'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { customerPortalAction } from '@/lib/payments/actions';
import { useActionState } from 'react';
import { TeamDataWithMembers, User } from '@/lib/db/schema';
import { removeTeamMember } from '@/app/(login)/actions';
import { getTeamForUser, getUser } from '@/lib/db/queries';

type ActionState = {
  error?: string;
  success?: string;
};

export default  function  Home() {
//     const user = await getUser();
//     const teamData = await getTeamForUser(user.id);
//   const [removeState, removeAction, isRemovePending] = useActionState<
//     ActionState,
//     FormData
//   >(removeTeamMember, { error: '', success: '' });

//   const getUserDisplayName = (user: Pick<User, 'id' | 'fullName' | 'email'>) => {
//     return user.fullName || user.email || 'Unknown User';
//   };
//   const user_id = teamData.teamMembers[0].id;

  const sampleProjects = [
    {
      id: 1,
      createdAt: new Date().toISOString(),
      userId: 1,
      clientId: 1,
      title: "Website Redesign",
      description: "Complete overhaul of company website with modern design and improved UX",
      status: "In Progress",
      startDate: "2024-03-01",
      dueDate: "2024-04-15",
      budget: 15000,
      currency: "USD"
    },
    {
      id: 2,
      createdAt: new Date().toISOString(),
      userId: 1,
      clientId: 2,
      title: "Mobile App Development",
      description: "Development of a new mobile application for iOS and Android",
      status: "Planning",
      startDate: "2024-04-01",
      dueDate: "2024-06-30",
      budget: 25000,
      currency: "USD"
    },
    {
      id: 3,
      createdAt: new Date().toISOString(),
      userId: 1,
      clientId: 3,
      title: "E-commerce Platform",
      description: "Building a new e-commerce platform with payment integration",
      status: "Completed",
      startDate: "2024-01-15",
      dueDate: "2024-03-01",
      budget: 30000,
      currency: "USD"
    }
  ];

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium mb-6">Current Projects</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleProjects.length === 0 && (
          <div className="col-span-3 text-center">
            <p className="text-sm text-gray-500">
              No projects available. Start a new project to get started!
            </p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => alert('Create a new project')}
            >
              Create Project
              </Button>
          </div>
        )}
        {sampleProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">{project.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{project.status}</span>
                <span className="text-sm">
                  {project.currency} {project.budget.toLocaleString()}
                </span>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <p>Start: {new Date(project.startDate).toLocaleDateString()}</p>
                <p>Due: {new Date(project.dueDate).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
