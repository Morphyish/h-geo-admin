import { writable } from 'svelte/store'
import { firestore } from '../common/firebase'
import { addItem, removeById, restoreItems, updateId } from '../common/utils'

function sectionsStore() {
    const sections = writable(false)
    let loaded = false
    let loading = false

    const fetch = () => {
        if (loading || loaded) return
        loading = true
        firestore.collection('sections')
            .orderBy('sort', 'asc')
            .get()
            .then(
                snapshot => {
                    const results = []
                    snapshot.forEach(doc => {
                        const section = doc.data()
                        results.push({
                            id: doc.id,
                            ...section,
                        })
                    })

                    loaded = true
                    loading = false
                    sections.set(results)
                },
                () => {
                    loading = false
                    sections.set([])
                },
            )
    }

    const add = async newSection => {
        const id = addItem(sections, newSection)
        sections.update(sectionsSnapshot => sectionsSnapshot.sort((a, b) => a.sort - b.sort))

        firestore.collection('sections')
            .add(newSection)
            .then(
                docRef => updateId(sections, id, docRef.id),
                () => removeById(sections, id),
            );
    }

    const remove = async id => {
        const proceed = window.confirm('Confirmer la suppression');
        if (!proceed) return

        const deletedSections = removeById(sections, id)

        firestore.collection('sections')
            .doc(id)
            .delete()
            .then(
                undefined,
                () => {
                    restoreItems(sections, deletedSections)
                    sections.update(entriesSnapshot =>
                        entriesSnapshot.sort((a, b) => a.sort - b.sort),
                    )
                },
            );
    }

    return {
        ...sections,
        fetch,
        add,
        remove,
    }
}

export const sections = sectionsStore()
