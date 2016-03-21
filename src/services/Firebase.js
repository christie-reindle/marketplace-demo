import Firebase from 'firebase'
import Settings from './Settings'

let FB = new Firebase(Settings.get('firebase-url'))

export default FB
