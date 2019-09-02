import { writable } from 'svelte/store'
import { firestore } from '../common/firebase'
import { addItem, removeById, restoreItems, updateId } from '../common/utils'

function categoriesStore() {
    const categories = writable(false)
    let loaded = false
    let loading = false

    const fetch = () => {
        if (loading || loaded) return
        loading = true
        firestore.collection('categories')
            .orderBy('sort', 'asc')
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
                    categories.set(results)
                },
                () => {
                    loading = false
                    categories.set([])
                },
            )
    }

    const add = async newCategory => {
        const id = addItem(categories, newCategory)

        firestore.collection('categories')
            .add(newCategory)
            .then(
                docRef => updateId(categories, id, docRef.id),
                () => removeById(categories, id),
            );
    }

    const remove = async id => {
        const proceed = window.confirm('Confirmer la suppression');
        if (!proceed) return

        const deletedCategories = removeById(categories, id)

        firestore.collection('categories')
            .doc(id)
            .delete()
            .then(
                undefined,
                () => restoreItems(categories, deletedCategories),
            );
    }

    return {
        ...categories,
        fetch,
        add,
        remove,
    }
}

export const categories = categoriesStore()
