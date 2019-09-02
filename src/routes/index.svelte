<script>
	import Grid from '../components/ui/Grid.svelte'
	import Button from '../components/ui/Button.svelte'

	import { user } from '../stores/user'

	const login = () => user.login()

	const links = [
		{
			id: 0,
			path: 'classes',
			label: 'Classes',
		},
		{
			id: 1,
			path: 'categories',
			label: 'Categories',
		},
		{
			id: 2,
			path: 'contenu',
			label: 'Contenu',
		},
		{
			id: 3,
			path: 'cahiers-de-texte',
			label: 'Cahiers de texte',
		},
	]
</script>

<main>
	{#if $user === false}
		<div class="login">
			<Button color='primary' outline type='signup' on:click={login}>Log In</Button>
		</div>
	{:else}
		<Grid {links} />
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		padding: 1rem 2rem;
		justify-content: center;
	}

	.login {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 2rem;
	}
</style>
