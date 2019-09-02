<script>
    import Button from './Button.svelte'

    import { niveaux, currentNiveau, user } from '../../stores'

    export let segment

    const logout = () => user.logout()
</script>

<nav>
    <div class="title">
        <a class="home" href="..">H.GEO</a>
    </div>
    {#if $user !== false}
        <ul>
            <li><a rel=prefetch class='{segment === "classes" ? "selected" : ""}' href='classes'>Classes</a></li>
            <li><a rel=prefetch class='{segment === "categories" ? "selected" : ""}' href='categories'>Categories</a>
            </li>
            <li><a rel=prefetch class='{segment === "contenu" ? "selected" : ""}' href='contenu'>Contenu</a></li>
            <li><a rel=prefetch class='{segment === "cahiers-de-texte" ? "selected" : ""}' href='cahiers-de-texte'>Cahiers
                de texte</a></li>
        </ul>

        {#if $currentNiveau}
            <Button color="primary"
                    outline
                    on:click={niveaux.next}
                    className="nav-button"
            >
                {$currentNiveau.label}
            </Button>
        {/if}

        <Button color='danger'
                type='button'
                on:click={logout}
                className="nav-button"
        >
            <svg class="logout" height="24" viewBox="0 0 1024 1024">
                <path d="M831.744569 105.073778h-0.568889a49.834667 49.834667 0 0 0-34.133333-14.051556 51.541333 51.541333 0 0 0-51.2 51.2 48.981333 48.981333 0 0 0 13.653333 35.726222 409.6 409.6 0 1 1-494.933333 0 50.005333 50.005333 0 0 0 15.36-36.295111 51.2 51.2 0 0 0-51.2-51.2 54.613333 54.613333 0 0 0-36.408889 14.563556 512 512 0 1 0 639.431111 0v0.056889zM512.029013 564.337778a51.2 51.2 0 0 0 51.2-51.768889V51.2a51.2 51.2 0 0 0-102.4 0v461.312a51.2 51.2 0 0 0 51.2 51.825778z" />
            </svg>
        </Button>
    {/if}
</nav>

<style>
    nav {
        position: sticky;
        top: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        border-bottom: var(--border);
        font-weight: 500;
        font-size: .875rem;
        padding: 0 1rem;
        background-color: var(--background);
    }

    .title {
        color: var(--primary);
        margin: 0 1.5rem;
        font-size: 1.25rem;
        font-weight: 600;
    }

    ul {
        margin: 0;
        padding: 0;
        display: flex;
        flex-grow: 1;
    }

    li {
        display: block;
    }

    .selected {
        position: relative;
        display: inline-block;
    }

    .selected::after {
        position: absolute;
        content: '';
        width: calc(100% - 1rem);
        height: 2px;
        background-color: var(--primary);
        display: block;
        bottom: -1px;
    }

    a {
        display: block;
    }

    a.home {
        padding: .75rem 0;
    }

    a:not(.home) {
        padding: 1rem 0.5rem;
    }

    nav :global(.nav-button + .nav-button) {
        margin-left: 1rem;
    }

    .logout path {
        fill: var(--danger);
    }
</style>
