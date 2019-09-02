<script context="module">
    export async function preload({ params }) {
        return params
    }
</script>

<script>
    import Button from '../../../components/ui/Button.svelte'
    import TextArea from '../../../components/ui/TextArea.svelte'
    import Entry from '../../../components/cahiers-de-texte/Entry.svelte'

    import { goto } from '@sapper/app'
    import { parser } from '../../../common/markdown'
    import { timestamp } from '../../../common/firebase'
    import { currentClasses, entries } from '../../../stores'

    export let slug = ''

    let currentClasse
    let content = ''
    let exercices = ''

    let entry = {
        id_classe: '',
        date: timestamp.fromDate(new Date()),
        content: '',
        exercices: '',
    }

    $: {
        currentClasse = $currentClasses.find(classe => classe.path === slug);
        if (currentClasse) entry.id_classe = currentClasse.id
    }
    $: entry.content = parser(content)
    $: entry.exercices = parser(exercices)

    const goBack = () => goto(`/cahiers-de-texte/${slug}`)

    const addEntry = () => {
        if (entry.content) {
            entries.add(entry)
            goBack()
        }
    }
</script>

<div class="content-wrapper">
    <div class="content">
        {#if currentClasse && entry}
            <h1 class="class-title">
                {currentClasse.label}

                <div class="actions">
                    <Button type="button"
                            on:click={goBack}
                    >
                        ANNULER
                    </Button>
                    <Button type="button"
                            color="primary"
                            outline
                            on:click={addEntry}
                    >
                        ENREGISTRER
                    </Button>
                </div>
            </h1>

            <TextArea bind:value={content}
                      label="Séquence"
                      className="entry-textarea"
                      rows="8"
                      required
            />

            <TextArea bind:value={exercices}
                      label="Evaluations et Travail"
                      className="entry-textarea"
                      rows="6"
                      required
            />

            <h2>Prévisualisation</h2>

            <Entry {entry} previsualization/>
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

    .actions {
        display: flex;
        margin-left: auto;
    }

    .actions :global(button + button) {
        margin-left: 1rem;
    }

    .content :global(.entry-textarea) {
        margin-bottom: 2rem;
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
