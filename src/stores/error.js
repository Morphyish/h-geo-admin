import { writable } from 'svelte/store'

function errorStore() {
    return writable(false)
}

export const error = errorStore()
