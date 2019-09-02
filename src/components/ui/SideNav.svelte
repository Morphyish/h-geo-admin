<script>
    export let url = '';
    export let path = '';
    export let links;

    const formatUrl = newPath => `${url}${newPath}`;
</script>

<div class="side-nav">
    {#each links as link (link.id)}
    <a
        class:selected="{link.path === path}"
        href={formatUrl(link.path)}
    >
        {link.label}
    </a>
    {/each}
</div>

<style>
.side-nav {
    width: 15rem;
    font-size: .875rem;
    padding: .5rem 1rem;
    border: var(--border);
    border-radius: .25rem;
    margin: auto;
}
a {
    display: block;
    padding: .5rem .75rem;
    font-weight: 600;
}
a:hover,
a:active,
a.selected {
    color: var(--primary);
}
</style>
