<script>
    import Loading from '../../components/ui/Loading.svelte'

    import { onMount } from 'svelte'
    import { categories, sections } from '../../stores'

    onMount(async () => {
        categories.fetch()
        sections.fetch()
    })
</script>

<main>
    {#if $categories === false || $sections === false}
        <Loading />
    {:else}
        <slot></slot>
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        padding: 1rem 2rem;
        justify-content: center;
    }
</style>
