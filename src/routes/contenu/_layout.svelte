<script>
	import Loading from '../../components/ui/Loading.svelte'

	import { onMount } from 'svelte'
	import { links, categories, sections, currentNiveau } from '../../stores'

	onMount(async () => {
		categories.fetch()
		sections.fetch()
		links.fetch()
	})

	$: links.load($currentNiveau)
</script>

<main>
	{#if $categories === false || $links === false || $sections === false || $currentNiveau === false}
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
