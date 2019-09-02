<script>
    import Section from '../../components/categories/Section.svelte';
    import SectionForm from '../../components/categories/SectionForm.svelte';

    import { get } from 'svelte/store'
    import { categories, sections } from '../../stores'

    const newSections = {};

    get(categories).forEach(category => newSections[category.id] = {
        id_category: category.id,
        label: '',
        path: '',
    });

    const addSection = event => {
        sections.add(event.detail);
    };

    const deleteSection = event => {
        sections.remove(event.detail);
    };
</script>

<h1>Gestion des categories</h1>
{#each $categories as category (category.id)}
<section>
    <h2>{category.label}</h2>
    <div class="section-title-wrapper">
        <div class="section-sort"></div>
        <div class="section-title">Label</div>
        <div class="section-title">URL</div>
        <div class="section-action"></div>
    </div>
    {#each $sections as section (section.id)}
    {#if section.id_category === category.id}
    <Section {section} on:delete={deleteSection} />
    {/if}
    {/each}
    <SectionForm idCategory={category.id} on:submit={addSection} />
</section>
{/each}

<style>
section {
    margin-bottom: 3rem;
}
.section-title-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: .5rem;
    border-bottom: var(--border);
}

.section-sort {
    width: 50px;
}

.section-title {
    flex: 1 0 200px;
    padding: 0 .5rem;
    font-weight: 600;
}

.section-action {
    width: 125px;
}

.section-title,
.section-action {
    margin-left: 2rem;
}
</style>
