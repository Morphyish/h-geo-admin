<script>
    import Grid from '../../components/ui/Grid.svelte'

    import { currentClasses } from '../../stores';

    const formatUrl = path => `/cahiers-de-texte/${path}`;
</script>

<section>
    <h1>Cahiers de texte</h1>

    <Grid links={$currentClasses} {formatUrl} />
</section>

<style>
    section {
        flex-grow: 1;
        padding: 1rem 2rem;
    }

    @media (max-width: 959px) {
        section {
            padding: 0;
        }
    }
</style>
