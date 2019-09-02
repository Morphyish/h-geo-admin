<script>
	import Loading from '../../components/ui/Loading.svelte'

	import { onMount } from 'svelte'
	import { currentNiveau, classes } from '../../stores'

	onMount(() => {
		classes.fetch()
	})

	$: classes.load($currentNiveau)
</script>

<main>
	{#if $classes === false}
		<Loading />
	{:else}
		<slot></slot>
	{/if}
</main>

<style>
	main {
		display: flex;
		padding: 1rem 2rem;
		justify-content: center;
	}

	@media (max-width: 959px) {
		main {
			flex-direction: column;
		}
	}
</style>
