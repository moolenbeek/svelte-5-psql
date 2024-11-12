import { lucia } from "../../../db/lucia";
import { deleteUser } from "../../../db/router/users";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals, cookies }) => {
	if (!locals.user) {
		throw redirect(302, "/");
	}

	const userId = locals.user.id;

	// Delete the user from the database
	await deleteUser(userId);

	// Invalidate the user's session
	await lucia.invalidateSession(locals.user.sessionId);

	// Remove the session cookie
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: ".",
		...sessionCookie.attributes
	});

	locals.user = null;

	throw redirect(302, "/");
};
