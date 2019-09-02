<script context="module">
    export async function preload({ params }) {
        return params
    }
</script>

<script>
    import Button from '../../../components/ui/Button.svelte'
    import Loading from '../../../components/ui/Loading.svelte'
    import Entry from '../../../components/cahiers-de-texte/Entry.svelte'

    import { goto } from '@sapper/app'
    import { currentClasses, entries } from '../../../stores'

    export let slug = ''

    $: currentClasse = $currentClasses.find(classe => classe.path === slug)

    const add = () => {
        goto(`/cahiers-de-texte/${slug}/add`)
    }

    const deleteEntry = event => {
        entries.remove(event.detail);
    };
</script>

<div class="content-wrapper">
    <div class="content">
        {#if currentClasse}
            <h1 class="class-title">
                {currentClasse.label}
                <Button color="primary" outline type="button" className="add-button" on:click={add}>NOUVEAU</Button>
            </h1>

            {#if $entries === false}
                <Loading />
            {:else}
                {#each $entries as entry (entry.id)}
                    <Entry {entry} on:delete={deleteEntry} />
                {:else}
                    <div class="empty">Ce cahier de texte est actuellement vide.</div>
                {/each}
            {/if}
        {/if}
    </div>
</div>

<style>
    .content-wrapper {
        display: flex;
        flex-grow: 1;
        margin: 1rem 2rem;
    }
    .content {
        flex-grow: 1;
    }
    .class-title {
        display: flex;
        align-items: center;
    }
    .class-title :global(.add-button) {
        margin-left: auto;
    }

    @media (max-width: 959px) {
        .content {
            margin-right: 0;
        }
    }

    @media (max-width: 599px) {
        .content-wrapper {
            margin: 1rem 0;
        }
    }
</style>
