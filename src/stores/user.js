import { writable } from 'svelte/store'
import { auth } from '../common/firebase'
import { whitelist } from '../../firebase.config'
import { error } from './error'

function userStore() {
    const user = writable(false)

    const login = () => {
        const provider = new auth.GoogleAuthProvider()
        auth().signInWithPopup(provider).then(result => {
            if (whitelist.length === 0 || whitelist.indexOf(result.user.email) > -1) {
                user.set(result.user)
            } else {
                error.set('Authentication error. Please try again.')
                logout()
            }
        }).catch(() => {
            error.set('Authentication error. Please try again.')
            logout()
        })
    }

    const logout = () => auth().signOut().then(() => user.set(false))

    return {
        ...user,
        login,
        logout,
    }
}

export const user = userStore()
