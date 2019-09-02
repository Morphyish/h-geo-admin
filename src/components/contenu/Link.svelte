<script>
    import Button from '../ui/Button.svelte'

    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    export let link
</script>

<div class="container">
    <a class="content" href={link.url} target="_blank">
        {link.label}
    </a>

    <Button color="danger" on:click="{e => dispatch('delete', link.id)}">
        SUPPRIMER
    </Button>
</div>

<style>
    .container {
        display: flex;
        align-items: center;
        margin: .5rem 0;
        padding: .5rem 1rem;
        border-radius: .125rem;
    }

    .container:hover {
        background: rgba(0, 0, 0, .03);
    }

    .content {
        flex-grow: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
