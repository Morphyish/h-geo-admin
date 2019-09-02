<script>
    import Classe from '../../components/classes/Classe.svelte';
    import ClasseForm from '../../components/classes/ClasseForm.svelte';

    import { niveaux, classes } from '../../stores'

    const addClasse = event => {
        classes.add(event.detail);
    };

    const deleteClasse = event => {
        classes.remove(event.detail);
    };
</script>

<h1>Gestion des classes</h1>
{#each $niveaux as niveau (niveau.id)}
<section>
    <h2>{niveau.label}</h2>
    <div class="classe-title-wrapper">
        <div class="classe-title">Label</div>
        <div class="classe-title">URL</div>
        <div class="classe-action"></div>
    </div>
    {#each $classes as classe (classe.id)}
    {#if classe.id_niveau === niveau.id}
    <Classe {classe} on:delete={deleteClasse} />
    {/if}
    {/each}
    <ClasseForm idNiveau={niveau.id} on:submit={addClasse} />
</section>
{/each}

<style>
section {
    margin-bottom: 3rem;
}
.classe-title-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: .5rem;
    border-bottom: var(--border);
}

.classe-title {
    flex: 1 0 200px;
    padding: 0 .5rem;
    font-weight: 600;
}

.classe-action {
    width: 125px;
}

.classe-title + .classe-title,
.classe-action {
    margin-left: 2rem;
}
</style>
