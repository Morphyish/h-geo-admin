<script>
    import Button from '../ui/Button.svelte';

    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let classe = {};
</script>

<div class="classe-wrapper">
    <div class="classe-data">{classe.label}</div>
    <div class="classe-data">{classe.path}</div>
    <Button className="classe-delete" color="danger" on:click="{e => dispatch('delete', classe.id)}">
        SUPPRIMER
    </Button>
</div>

<style>
.classe-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-radius: .25rem;
    margin-bottom: .5rem;
}

.classe-wrapper:hover {
    background-color: rgba(var(--font-color-rgb), .05);
}

.classe-data {
    flex: 1 0 200px;
    padding: 0 .5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.classe-wrapper :global(.classe-delete) {
    width: 125px;
}

.classe-data + .classe-data,
.classe-wrapper :global(.classe-delete) {
    margin-left: 2rem;
}
</style>
