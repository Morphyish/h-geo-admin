<script context="module">
    export async function preload({ params }) {
        return params
    }
</script>

<script>
    import SideNav from '../../../components/ui/SideNav.svelte'
    import Input from '../../../components/ui/Input.svelte'
    import Loading from '../../../components/ui/Loading.svelte'
    import FileUpload from '../../../components/ui/FileUpload.svelte'
    import Button from '../../../components/ui/Button.svelte'

    import { goto } from '@sapper/app'
    import { storage, timestamp, TaskState } from '../../../common/firebase'
    import { categories, sections, links, currentNiveau } from '../../../stores'

    export let slug = ''

    let uploading = false
    let progress = 0
    let mode = 'file'
    let rawFiles

    let currentCategory
    let currentSections

    let link = {
        id_category: '',
        id_niveau: $currentNiveau.id,
        id_section: '',
        date: timestamp.fromDate(new Date()),
        label: '',
        url: '',
    }

    $: {
        currentCategory = $categories.find(category => category.path === slug)
        if (currentCategory) {
            currentSections = $sections.filter(section => section.id_category === currentCategory.id)
            link.id_category = currentCategory.id
            link.id_section = link.id_section || currentSections[0].id
        }
    }

    const updateLabel = () => {
        console.log('updateLabel')
        const file = (rawFiles || [])[0]
        link.label = (file || {}).name || ''
    }

    const toggle = mod => {
        link.label = ''
        link.url = ''
        mode = mod
    }

    const goBack = () => goto(`/contenu/${slug}`)

    const addLink = () => {
        if (uploading) return
        if (mode === 'file' && rawFiles && link.label) {
            upload()
        } else if (mode === 'link' && link.url && link.label) {
            links.add(link)
            goBack()
        }
    }

    const upload = () => {
        uploading = true
        const file = (rawFiles || [])[0]
        if (file) {
            const fileName = file.name
            const fileType = file.type

            if (fileName && fileType) {
                const fileRef = storage.ref().child(`ressources/${fileName}`)
                const metadata = {
                    contentType: fileType,
                }
                const uploadTask = fileRef.put(file, metadata)

                uploadTask.on('state_changed',
                        snapshot => {
                            progress = Math.ceil(snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        },
                        error => {
                            console.log('ERROR', error)
                            uploading = false
                        },
                        () => {
                            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                                link.url = downloadURL
                                links.add(link)
                                goBack()
                            })
                        })
            }
        }
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

                <div class="actions">
                    {#if !uploading}
                        <Button type="button"
                                on:click={goBack}
                        >
                            ANNULER
                        </Button>
                        <Button type="button"
                                color="primary"
                                outline
                                on:click={addLink}
                        >
                            ENREGISTRER
                        </Button>
                    {/if}
                </div>
            </h1>

            {#if uploading}
                <div class="progress-wrapper">
                    <Loading />
                    <span class="progress">
                        Upload is {progress}% done
                    </span>
                </div>
            {:else}

                <div class="mode-selection">
                    <Button type="button"
                            color="{mode === 'file' ? 'primary' : ''}"
                            outline
                            on:click="{() => toggle('file')}"
                    >
                        Fichier à uploader
                    </Button>
                    <Button type="button"
                            color="{mode === 'link' ? 'primary' : ''}"
                            outline
                            on:click="{() => toggle('link')}"
                    >
                        Lien Externe
                    </Button>
                </div>

                <select bind:value={link.id_section} class="link-input">
                    {#each currentSections as section (section.id)}
                        <option value={section.id}>{section.label}</option>
                    {/each}
                </select>

                {#if mode === 'file'}
                    <FileUpload bind:files={rawFiles}
                                label="Fichier à uploader"
                                on:change={updateLabel}
                                required
                                className="link-input"
                    />
                {:else}
                    <Input bind:value={link.url}
                           label="Lien externe"
                           required
                           className="link-input"
                    />
                {/if}

                <Input bind:value={link.label}
                       label="Libellé affiché"
                       required
                       className="link-input"
                />
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

    .progress-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .progress {
        font-weight: 600;
        color: var(--primary);
    }

    .actions {
        display: flex;
        margin-left: auto;
    }

    .actions :global(button + button) {
        margin-left: 1rem;
    }

    .mode-selection {
        display: flex;
        justify-content: space-around;
    }

    .mode-selection,
    .content :global(.link-input) {
        margin-top: 1rem;
    }

    select {
        width: 100%;
        padding: .5rem 1rem;
        border: 1px solid rgba(var(--font-color-rgb), .2);
        border-radius: .25rem;
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
    }
</style>
