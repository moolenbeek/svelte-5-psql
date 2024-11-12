<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/nav/nav.svelte';
	import type { PageData } from './$types';
	const { data } = $props<{ data: PageData }>();
</script>

<Nav user={data.user} />

<slot />
