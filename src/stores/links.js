import { get, writable } from 'svelte/store'
import { firestore } from '../common/firebase'
import { currentClasses } from './classes'
import { addItem, removeById, restoreItems, updateId } from '../common/utils'

function linksStore() {
    const allLinks = writable([])
    const links = writable(false)

    let currentNiveau
    let loaded = false
    let loading = false

    const selectLinks = () => {
        if (currentNiveau) {
            const selectedLinks = (get(allLinks) || []).filter(link => link.id_niveau === currentNiveau)
            links.set(selectedLinks)
        }
    }

    const load = niveau => {
        if (niveau === undefined) {
            links.set(false)
            return
        }
        currentNiveau = niveau.id
        selectLinks()
    }

    const fetch = () => {
        if (loading || loaded) return
        loading = true
        firestore.collection('links')
            .orderBy('date', 'desc')
            .get()
            .then(
                snapshot => {
                    const results = []
                    snapshot.forEach(doc => results.push({
                        id: doc.id,
                        ...doc.data(),
                    }))

                    loaded = true
                    loading = false
                    allLinks.set(results)
                    selectLinks()
                },
                () => {
                    loading = false
                    allLinks.set([])
                }
            )
    }

    const add = newLink => {
        const id = addItem(allLinks, newLink)
        allLinks.update(linksSnapshot =>
            linksSnapshot.sort((a, b) => a.date.toDate() - b.date.toDate())
        )

        firestore.collection('links')
            .add(newLink)
            .then(
                docRef => {
                    updateId(allLinks, id, docRef.id)
                    selectLinks()
                },
                () => removeById(allLinks, id),
            );
    }

    const remove = id => {
        const proceed = window.confirm('Confirmer la suppression');
        if (!proceed) return

        const deletedLinks = removeById(allLinks, id)

        firestore.collection('links')
            .doc(id)
            .delete()
            .then(
                () => selectLinks(),
                () => {
                    restoreItems(allLinks, deletedLinks)
                    allLinks.update(linksSnapshot =>
                        linksSnapshot.sort((a, b) => a.date.toDate() - b.date.toDate())
                    )
                },
            );
    }

    return {
        ...links,
        fetch,
        load,
        add,
        remove,
    }
}

export const links = linksStore()
