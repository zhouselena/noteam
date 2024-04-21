import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDdWVCmk2SJWVtqHSO6eVthfNBSY_mZUWw',
  authDomain: 'noteam-ea1fd.firebaseapp.com',
  databaseURL: 'https://noteam-ea1fd-default-rtdb.firebaseio.com',
  projectId: 'noteam-ea1fd',
  storageBucket: 'noteam-ea1fd.appspot.com',
  messagingSenderId: '498799670137',
  appId: '1:498799670137:web:e33772f5c09820156ef5a8',
  measurementId: 'G-ZR22NB7LXY',
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export function addNote() {
  database.ref('notes').push({
    title: 'Edit me!',
    text: 'This is a lovely description.',
    x: 200,
    y: -500,
    size: 300,
    zIndex: 0,
    color: 'lightblue',
  });
}

export function updateNoteDB(noteID, updatedFields) {
  database.ref('notes').child(noteID).update(updatedFields);
}

export function deleteNote(noteID) {
  database.ref('notes').child(noteID).remove();
}

export function onNotesValueChange(callback) {
  database.ref('notes').on('value', (snapshot) => {
    const newNoteState = snapshot.val();
    callback(newNoteState);
  });
}
