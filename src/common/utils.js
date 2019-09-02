export const createClass = (...args) => args.join(' ')

export const formatDate = date => date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
})

export const sanitize = url => {
    url = url.toLocaleLowerCase()
    url = url.normalize('NFD')
    url = url.replace(/[\u0300-\u036f]/g, '')
    url = url.replace(/[^a-z0-9\-]+/g, '-')
    url = url.replace(/^\-+|\-+$/g, '')

    return url
}

export const addItem = (store, item) => {
    const id = new Date().getTime()
    store.update(storeSnapshot =>
        [
            ...storeSnapshot,
            {
                ...item,
                id,
            },
        ],
    )

    return id
}

export const updateId = (store, currentId, newId) => {
    store.update(storeSnapshot => {
        const index = storeSnapshot.findIndex(item => item.id === currentId)
        if (index > -1) {
            storeSnapshot[index] = {
                ...storeSnapshot[index],
                id: newId
            }
        }
        return storeSnapshot
    })
}

export const removeById = (store, id) => {
    let deletedItems = []

    store.update(storeSnapshot => {
        const index = storeSnapshot.findIndex(item => item.id === id)
        if (index > -1) {
            deletedItems = storeSnapshot.splice(index, 1)
        }
        return storeSnapshot
    })

    return deletedItems
}

export const restoreItems = (store, items) => {
    store.update(storeSnapshot => [
        ...storeSnapshot,
        ...items,
    ])
}
