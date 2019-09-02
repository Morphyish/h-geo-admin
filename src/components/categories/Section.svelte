<script>
    import Button from '../ui/Button.svelte';

    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let section = {};
</script>

<div class="section-wrapper">
    <div class="section-sort">{section.sort}</div>
    <div class="section-data">{section.label}</div>
    <div class="section-data">{section.path}</div>
    <Button className="section-delete" color="danger" on:click="{e => dispatch('delete', section.id)}">
        SUPPRIMER
    </Button>
</div>

<style>
.section-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-radius: .25rem;
    margin-bottom: .5rem;
}

.section-wrapper:hover {
    background-color: rgba(var(--font-color-rgb), .05);
}

.section-sort {
    width: 50px;
    padding: 0 .5rem;
}

.section-data {
    flex: 1 0 200px;
    padding: 0 .5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.section-wrapper :global(.section-delete) {
    width: 125px;
}

.section-data,
.section-wrapper :global(.section-delete) {
    margin-left: 2rem;
}
</style>
