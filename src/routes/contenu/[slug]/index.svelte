<script context="module">
    export async function preload({ params }) {
        return params
    }
</script>

<script>
    import Link from '../../../components/contenu/Link.svelte'
    import Button from '../../../components/ui/Button.svelte'
    import SideNav from '../../../components/ui/SideNav.svelte'
    import Loading from '../../../components/ui/Loading.svelte'

    import { goto } from '@sapper/app'
    import { categories, sections, links } from '../../../stores'

    export let slug = ''

    let currentCategory
    let currentSections
    let filteredLinks

    $: {
        currentCategory = $categories.find(category => category.path === slug)
        if (currentCategory) {
            currentSections = $sections.filter(section => section.id_category === currentCategory.id)
            filteredLinks = $links.filter(link => link.id_category === currentCategory.id)
        }
    }

    const add = () => {
        goto(`/contenu/${slug}/add`)
    }

    const deleteLink = event => {
        links.remove(event.detail)
    }
</script>

<div class="sidenav-wrapper">
    {#if $categories && currentCategory}
        <SideNav url="/contenu/" path={currentCategory.path} links={$categories} />
    {/if}
</div>

<div class="content-wrapper">
    <div class="content">
        {#if currentCategory}
            <h1 class="class-title">
                {currentCategory.label}
                <Button color="primary" outline type="button" className="add-button" on:click={add}>NOUVEAU</Button>
            </h1>

            {#if filteredLinks === false}
                <Loading/>
            {:else}
                {#each currentSections as section (section.id)}
                    <section>
                        <h2 id={section.path}>{section.label}</h2>

                        {#each filteredLinks as link (link.id)}
                            {#if link.id_section === section.id}
                                <Link {link} on:delete={deleteLink} />
                            {/if}
                        {/each}
                    </section>
                {/each}
            {/if}
        {/if}
    </div>
</div>

<style>
    .sidenav-wrapper {
        min-width: 15rem;
    }

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

    .class-title :global(.add-button) {
        margin-left: auto;
    }

    section {
        margin: 2rem;
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

    @media (max-width: 599px) {
        .content-wrapper {
            margin: 1rem 0;
        }

        section {
            margin: 1rem;
        }
    }
</style>
