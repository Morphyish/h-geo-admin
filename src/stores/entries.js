import { get, writable } from 'svelte/store'
import { firestore } from '../common/firebase'
import { addItem, removeById, restoreItems, updateId } from '../common/utils'

function entriesStore() {
    const allEntries = writable([])
    const entries = writable(false)

    let currentClass
    const loadedClasses = []
    let isLoaded = id_classe => loadedClasses.indexOf(id_classe) !== -1
    let loading = false

    const selectEntries = () => {
        if (currentClass) {
            const selectedEntries = get(allEntries).filter(entry => entry.id_classe === currentClass)
            entries.set(selectedEntries)
        }
    }

    const load = classe => {
        if (classe && !isLoaded(classe.id)) {
            fetch(classe.id)
            entries.set(false)
        } else {
            currentClass = (classe || {}).id
            selectEntries()
        }
    }

    const fetch = id_classe => {
        if (loading || isLoaded(id_classe)) return
        loading = true
        firestore.collection('entries')
            .where('id_classe', '==', id_classe)
            .orderBy('date', 'desc')
            .get()
            .then(
                snapshot => {
                    const results = []
                    snapshot.forEach(doc => results.push({
                        id: doc.id,
                        ...doc.data(),
                    }))

                    loadedClasses.push(id_classe)
                    loading = false
                    allEntries.update(entries => [
                        ...entries,
                        ...results,
                    ])
                    entries.set(results)
                },
                () => {
                    loading = false
                    allEntries.update(entries => [
                        ...entries,
                    ])
                }
            )
    }

    const add = newEntry => {
        const id = addItem(allEntries, newEntry)
        allEntries.update(entriesSnapshot =>
            entriesSnapshot.sort((a, b) => a.date.toDate() - b.date.toDate())
        )

        firestore.collection('entries')
            .add(newEntry)
            .then(
                docRef => {
                    updateId(allEntries, id, docRef.id)
                    selectEntries()
                },
                () => removeById(allEntries, id),
            );
    }

    const remove = id => {
        const proceed = window.confirm('Confirmer la suppression');
        if (!proceed) return

        const deletedEntries = removeById(allEntries, id)

        firestore.collection('entries')
            .doc(id)
            .delete()
            .then(
                () => selectEntries(),
                () => {
                    restoreItems(allEntries, deletedEntries)
                    allEntries.update(entriesSnapshot =>
                        entriesSnapshot.sort((a, b) => a.date.toDate() - b.date.toDate())
                    )
                },
            );
    }

    return {
        ...entries,
        load,
        add,
        remove,
    }
}

export const entries = entriesStore()
