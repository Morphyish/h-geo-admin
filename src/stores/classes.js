import { get, writable } from 'svelte/store'
import { firestore } from '../common/firebase'
import { addItem, removeById, restoreItems, updateId } from '../common/utils'

function classesStore() {
    const classes = writable(false)

    let currentNiveau
    let loaded = false
    let loading = false

    const load = niveau => {
        if (niveau === undefined) {
            currentClasses.set(false)
            return
        }
        const selectedClasses = (get(classes) || []).filter(classe => classe.id_niveau === niveau.id)
        currentClasses.set(selectedClasses)
        currentNiveau = niveau.id
    }

    const fetch = () => {
        if (loading || loaded) return
        loading = true
        firestore.collection('classes')
            .orderBy('path', 'asc')
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
                    classes.set(results)
                    if (currentNiveau) {
                        const selectedClasses = get(classes).filter(classe => classe.id_niveau === currentNiveau)
                        currentClasses.set(selectedClasses)
                    }
                },
                () => {
                    loading = false
                    classes.set([])
                },
            )
    }

    const add = async newClasse => {
        const id = addItem(classes, newClasse)
        classes.update(classesSnapshot =>
            classesSnapshot.sort((a, b) => a.path.localeCompare(b.path)),
        )

        firestore.collection('classes')
            .add(newClasse)
            .then(
                docRef => {
                    updateId(classes, id, docRef.id)
                    if (currentNiveau) {
                        const selectedClasses = get(classes).filter(classe => classe.id_niveau === currentNiveau)
                        currentClasses.set(selectedClasses)
                    }
                },
                () => removeById(classes, id),
            );
    }

    const remove = async id => {
        const proceed = window.confirm('Confirmer la suppression');
        if (!proceed) return

        const deletedClasses = removeById(classes, id)

        firestore.collection('classes')
            .doc(id)
            .delete()
            .then(
                () => {
                    if (currentNiveau) {
                        const selectedClasses = get(classes).filter(classe => classe.id_niveau === currentNiveau)
                        currentClasses.set(selectedClasses)
                    }
                },
                () => {
                    restoreItems(classes, deletedClasses)
                    classes.update(classesSnapshot =>
                            classesSnapshot.sort((a, b) => a.path.localeCompare(b.path)),
                    )
                },
            );
    }

    return {
        ...classes,
        fetch,
        load,
        add,
        remove,
    }
}

function currentClassesStore() {
    return writable(false)
}

export const classes = classesStore()
export const currentClasses = currentClassesStore()
