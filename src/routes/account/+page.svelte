<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Dialog from "$lib/components/ui/dialog";
	import { superForm } from "sveltekit-superforms";

	export let data;

	const { user } = data;
	const { form, errors, enhance } = superForm(user);
	let formElement: HTMLFormElement;
</script>

<div class="container mx-auto py-10">
	<h1 class="mb-6 text-3xl font-bold">Account Settings</h1>
	<div class="grid gap-6">
		<Card>
			<CardHeader>
				<CardTitle>Personal Information</CardTitle>
				<CardDescription>Update your personal details here.</CardDescription>
			</CardHeader>
			<form method="POST" use:enhance bind:this={formElement}>
				<CardContent class="space-y-4">
					<div class="grid grid-cols-2 gap-4">
						<div class="space-y-2">
							<Label for="firstName">First name</Label>
							<Input
								type="text"
								id="firstName"
								name="firstName"
								placeholder="First Name"
								bind:value={$form.firstName}
								required
							/>
							{#if $errors.firstName}<p class="mt-1 text-sm text-red-500">
									{$errors.firstName}
								</p>{/if}
						</div>
						<div class="space-y-2">
							<Label for="lastName">Last name</Label>
							<Input
								type="text"
								id="lastName"
								name="lastName"
								placeholder="Last Name"
								bind:value={$form.lastName}
								required
							/>
							{#if $errors.lastName}<p class="mt-1 text-sm text-red-500">{$errors.lastName}</p>{/if}
						</div>
					</div>
					<div class="space-y-2">
						<Label for="email">Email</Label>
						<Input
							type="email"
							id="email"
							name="email"
							placeholder="Email"
							bind:value={$form.email}
							required
						/>
						{#if $errors.email}<p class="mt-1 text-sm text-red-500">{$errors.email}</p>{/if}
					</div>
				</CardContent>
				<CardFooter>
					<Button type="submit">Save Changes</Button>
				</CardFooter>
			</form>
		</Card>
		<Card>
			<CardHeader>
				<CardTitle>Delete Account</CardTitle>
				<CardDescription>Permanently delete your account and all associated data.</CardDescription>
			</CardHeader>
			<CardContent>
				<p class="text-sm text-muted-foreground">
					Once you delete your account, there is no going back. Please be certain.
				</p>
			</CardContent>
			<CardFooter>
				<Dialog.Root>
					<Dialog.Trigger><Button variant="destructive">Delete Account</Button></Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Are you absolutely sure?</Dialog.Title>
							<Dialog.Description>
								This action cannot be undone. This will permanently delete your account and remove
								your data from our servers.
							</Dialog.Description>
						</Dialog.Header>
						<Dialog.Footer>
							<Dialog.Close asChild>
								<form method="POST" action="/account/delete">
									<Button variant="destructive" type="submit">Delete Account</Button>
								</form>
							</Dialog.Close>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</CardFooter>
		</Card>
	</div>
</div>
