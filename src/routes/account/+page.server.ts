import { updateUser } from "../../db/router/users";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

// superform validation
import { userSchema } from "$lib/config/zod-schemas";
import { setError, superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";

const updateUserSchema = userSchema.pick({
	firstName: true,
	lastName: true,
	email: true
});

export const load = async (event) => {
	if (!event.locals.user) {
		redirect(302, "/login");
	}
	const form = await superValidate(event, zod(updateUserSchema));
	return {
		form
	};
};

export const actions: Actions = {
	default: async function ({ request, locals }) {
		const form = await superValidate(request, zod(updateUserSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		let { firstName, lastName, email } = form.data;

		const id = locals.user.id;
		try {
			await updateUser({ id, email, firstName, lastName });
		} catch (err) {
			console.error(err);
			return setError(form, "email", "Could not update user");
		}
	}
};
