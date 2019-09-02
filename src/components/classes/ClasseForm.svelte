<script>
    import Input from '../ui/Input.svelte';
    import Button from '../ui/Button.svelte';

    import {createEventDispatcher} from 'svelte';
    import {sanitize} from '../../common/utils';

    const dispatch = createEventDispatcher();

    export let idNiveau;

    let classe = {
        label: '',
        path: '',
    };

    const updateUrl = () => {
        classe = {
            ...classe,
            path: sanitize(classe.label),
        };
    };

    const handleSubmit = () => {
        dispatch('submit', {
            ...classe,
            id_niveau: idNiveau,
        });
        classe = {
            label: '',
            path: '',
        };
    };
</script>

<form on:submit|preventDefault={handleSubmit}>
    <Input  bind:value={classe.label}
            label="Label"
            required
            className="form-input"
            on:keyup="{updateUrl}"
    />
    <Input  bind:value={classe.path}
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

form :global(.form-input) {
    flex: 1 0 200px;
}

form :global(.form-button) {
    width: 125px;
}

form :global(.form-input + .form-input),
form :global(.form-button) {
    margin-left: 2rem;
}
</style>
