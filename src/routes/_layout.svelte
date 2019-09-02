<script>
	import Nav from '../components/ui/Nav.svelte';
	import Footer from '../components/ui/Footer.svelte'

	import { onMount } from 'svelte'
	import { goto, stores } from '@sapper/app';
	import { user, niveaux, error } from '../stores';

	const { page } = stores();

	export let segment;

	const clearError = () => error.set(false)

	onMount(async () => {
		niveaux.fetch()

		page.subscribe(p => {
			if (p.path !== '/' && !$user) {
				goto('..')
			}
		})

		user.subscribe(loggedIn => {
			if (!loggedIn) {
				goto('..')
			}
		})
	})
</script>

<Nav {segment}/>

<slot></slot>

{#if $error !== false}
	<div class="error" on:click={clearError}>
		{$error}
	</div>
{/if}

<Footer />

<style>
	.error {
		padding: 1rem 0;
		text-align: center;
		color: var(--danger);
	}
</style>
