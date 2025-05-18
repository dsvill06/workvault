import { relations } from "drizzle-orm/relations";
import { teams, teamMembers, users, activityLogs, invitations, clients, projects } from "./schema";

export const teamMembersRelations = relations(teamMembers, ({one}) => ({
	team: one(teams, {
		fields: [teamMembers.teamId],
		references: [teams.id]
	}),
	user: one(users, {
		fields: [teamMembers.userId],
		references: [users.id]
	}),
}));

export const teamsRelations = relations(teams, ({many}) => ({
	teamMembers: many(teamMembers),
	activityLogs: many(activityLogs),
	invitations: many(invitations),
}));

export const usersRelations = relations(users, ({many}) => ({
	teamMembers: many(teamMembers),
	activityLogs: many(activityLogs),
	invitations: many(invitations),
	clients: many(clients),
	projects: many(projects),
}));

export const activityLogsRelations = relations(activityLogs, ({one}) => ({
	team: one(teams, {
		fields: [activityLogs.teamId],
		references: [teams.id]
	}),
	user: one(users, {
		fields: [activityLogs.userId],
		references: [users.id]
	}),
}));

export const invitationsRelations = relations(invitations, ({one}) => ({
	user: one(users, {
		fields: [invitations.invitedBy],
		references: [users.id]
	}),
	team: one(teams, {
		fields: [invitations.teamId],
		references: [teams.id]
	}),
}));

export const clientsRelations = relations(clients, ({one, many}) => ({
	user: one(users, {
		fields: [clients.userId],
		references: [users.id]
	}),
	projects: many(projects),
}));

export const projectsRelations = relations(projects, ({one}) => ({
	client: one(clients, {
		fields: [projects.clientId],
		references: [clients.id]
	}),
	user: one(users, {
		fields: [projects.userId],
		references: [users.id]
	}),
}));