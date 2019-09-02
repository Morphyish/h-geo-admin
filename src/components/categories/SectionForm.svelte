<script>
    import Input from '../ui/Input.svelte';
    import Button from '../ui/Button.svelte';

    import {createEventDispatcher} from 'svelte';
    import {sanitize} from '../../common/utils';

    const dispatch = createEventDispatcher();

    export let idCategory;

    let section = {
        sort: 0,
        label: '',
        path: '',
    };

    const updateUrl = () => {
        section = {
            ...section,
            path: sanitize(section.label),
        };
    };

    const handleSubmit = () => {
        section.sort = parseInt(section.sort, 10);
        dispatch('submit', {
            ...section,
            id_category: idCategory,
        });
        section = {
            sort: 0,
            label: '',
            path: '',
        };
    };
</script>

<form on:submit|preventDefault={handleSubmit}>
    <Input  bind:value={section.sort}
            required
            className="form-sort"
    />
    <Input  bind:value={section.label}
            label="Label"
            required
            className="form-input"
            on:keyup="{updateUrl}"
    />
    <Input  bind:value={section.path}
            label="Url"
            required
            className="form-input"
    />
    <Button className="form-button"
            type="submit"
            color="primary"
            outline
    >
        AJOUTER
    </Button>
</form>

<style>
form {
    display: flex;
    flex-wrap: wrap;
}

form :global(.form-sort) {
    width: 50px;
}

form :global(.form-input) {
    flex: 1 0 200px;
}

form :global(.form-button) {
    width: 125px;
}

form :global(.form-input),
form :global(.form-button) {
    margin-left: 2rem;
}
</style>
