import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
import { config } from '../../firebase.config'

firebase.initializeApp(config)

export const timestamp = firebase.firestore.Timestamp
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const TaskState = firebase.storage.TaskState
export const auth = firebase.auth
