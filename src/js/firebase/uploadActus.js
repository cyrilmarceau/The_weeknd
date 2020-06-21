// import * as firebase from 'firebase/app';
// import './database.js'
// import 'firebase/firebase-firestore';
// import 'firebase/firebase-storage'

// import flatpickr from "flatpickr";
// import { French } from "flatpickr/dist/l10n/fr.js"
// import '../../../node_modules/flatpickr/dist/flatpickr.min.css'

// window.addEventListener('load', () => {

//     // Initialise datepicker
//     flatpickr(".flatpickr-actus", {
//         "locale": French,
//         dateFormat: "d-m-Y",
//         time_24hr: true
//     });

//     const actusFirestore = firebase.firestore().collection('actus');

//     // Must title is display for unlock file input
//     document.querySelector('#actus-title').addEventListener('keyup', () => {
//         document.querySelector('#actus-picture').removeAttribute('disabled');
//     })

//     function onSelectFile(event) {

//         const file = event.target.files[0];
//         const storageRef = firebase.storage().ref();

//         // Upload picture
//         const uploadPicture = storageRef.child(`${document.querySelector('#actus-title').value}`).put(file);
//         uploadPicture.on('state_changed', onStateChanged, onError, onComplete);

//         function onStateChanged(snapshot) {
//             snapshot.state;
//             snapshot.bytesTransferred;
//             snapshot.totalBytes;
//         }

//         function onError(error) {
//             console.error('Oops…', error);
//         }

//         function onComplete() {
//             console.log('File uploaded!');

//             // Select form
//             const form = document.querySelector('#add-actus');
//             const cancelBtn = document.querySelector('#actus-cencel');

//             // Remove disabled when picture is upload
//             document.querySelector('#actus-submit').removeAttribute('disabled');

//             form.addEventListener('submit', (e) => {
//                 e.preventDefault();

//                 const err = []
//                 const ActusDateValue = document.querySelector('#actus-date').value;
//                 const ActusTitleValue = document.querySelector('#actus-title').value;
//                 const ActusTexteValue = document.querySelector('#actus-text').value;
//                 const ActusPictureValue = document.querySelector('#actus-picture');

//                 const ActusDate = document.querySelector('#actus-date');
//                 const ActusTitle = document.querySelector('#actus-title');
//                 const ActusTexte = document.querySelector('#actus-text');
//                 const ActusPicture = document.querySelector('#actus-picture');

//                 // Verify input
//                 if (ActusDateValue == '') {
//                     ActusDate.style.border = '1px solid red';
//                     ActusDate.placeholder = 'Veuillez remplir ce champ';
//                     err.push('date vide');
//                 } else {
//                     ActusDate.style.border = '1px solid black';
//                 }

//                 if (ActusTitleValue.length <= 0) {
//                     ActusTitle.style.border = '1px solid red';
//                     ActusTitle.placeholder = 'Veuillez remplir ce champ';
//                     err.push(ActusTitleValue)
//                 } else {
//                     ActusTitle.style.border = '1px solid black';
//                 }

//                 if (ActusTexteValue.length <= 0) {
//                     ActusTexte.style.border = '1px solid red';
//                     ActusTexte.placeholder = 'Veuillez remplir ce champ';
//                     err.push(ActusTexteValue);
//                 } else {
//                     ActusTexte.style.border = '1px solid black';
//                 }

//                 if (err.length === 0) {
//                     // Upload on firebase
//                     actusFirestore.doc().set({
//                         dateActus: ActusDateValue,
//                         titleActus: ActusTitleValue,
//                         textActus: ActusTexteValue,
//                         photoUrl: '',
//                         timestamp: Date.now()
//                     });
//                     form.reset()

//                     storageRef.listAll().then(function (res) {
//                         res.items.forEach(async function (itemRef) {

//                             // Get URL picture
//                             const downloadURL = await itemRef.getDownloadURL();

//                             actusFirestore.get().then(function (querySnapshot) {
//                                 querySnapshot.forEach(function (doc) {

//                                     // Compare name in firebase-auth and in firestore
//                                     if (itemRef.name == doc.data().titleActus) {

//                                         actusFirestore.doc(doc.id).update({
//                                             photoUrl: downloadURL
//                                         });

//                                     }

//                                 })
//                             })

//                         })
//                     }).catch(function (error) {
//                         console.log(error);
//                     });
//                 }

//             });

//         }

//     }

//     // Select input
//     const file = document.querySelector('#actus-picture');
//     file.addEventListener('change', onSelectFile);

// }) 