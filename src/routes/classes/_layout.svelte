<script>
    import Loading from '../../components/ui/Loading.svelte'

    import { onMount } from 'svelte'
    import { niveaux, classes } from '../../stores'

    onMount(async () => {
        classes.fetch()
    })
</script>

<main>
    {#if $niveaux === false || $classes === false}
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
