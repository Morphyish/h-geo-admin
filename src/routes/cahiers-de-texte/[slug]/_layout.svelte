<script context="module">
    export async function preload({ params }) {
        return params
    }
</script>

<script>
    import SideNav from '../../../components/ui/SideNav.svelte'

    import { goto } from '@sapper/app'
    import { currentClasses, entries } from '../../../stores'

    export let slug = ''

    let currentClasse

    $: {
        currentClasse = $currentClasses.find(classe => classe.path === slug);
        if ($currentClasses.length && currentClasse === undefined) {
            goto('/cahiers-de-texte')
        } else {
            entries.load(currentClasse)
        }
    }
</script>

<div class="sidenav-wrapper">
    {#if $currentClasses && currentClasse}
        <SideNav url="/cahiers-de-texte/" path={currentClasse.path} links={$currentClasses} />
    {/if}
</div>

<slot></slot>

<style>
    .sidenav-wrapper {
        min-width: 15rem;
    }
</style>
