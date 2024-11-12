import { eq } from "drizzle-orm";
import db from "../index";
import { userTable, sessionTable } from "../schema";
import type { User } from "../schema";

export const getUserByEmail = async (email: string) => {
	const user = await db.select().from(userTable).where(eq(userTable.email, email));
	if (user.length === 0) {
		return null;
	} else {
		return user[0];
	}
};

export const createUser = async (user: User) => {
	const result = await db.insert(userTable).values(user).onConflictDoNothing().returning();
	if (result.length === 0) {
		return null;
	} else {
		return result[0];
	}
};

export const getUserByToken = async (token: string) => {
	const user = await db.select().from(userTable).where(eq(userTable.token, token));
	if (user.length === 0) {
		return null;
	} else {
		return user[0];
	}
};

export const updateUser = async (user: User) => {
	const result = await db.update(userTable).set(user).where(eq(userTable.id, user.id));
	return result;
};

export const deleteUser = async (userId: string) => {
	await db.delete(sessionTable).where(eq(sessionTable.userId, userId));
	await db.delete(userTable).where(eq(userTable.id, userId));
};