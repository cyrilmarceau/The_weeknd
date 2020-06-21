import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/firebase-storage'
import 'firebase/firebase-analytics';



import flatpickr from "flatpickr";
import { French } from "flatpickr/dist/l10n/fr.js"
import '../../../node_modules/flatpickr/dist/flatpickr.min.css'

window.addEventListener('load', () => {

    // container div
    const ctnrForm = document.querySelector('.add-actus');

    // Section
    const crud = document.getElementById('actus');

    // Display form for add date
    document.querySelector('.display-form-add-actus').addEventListener('click', () => {
        ctnrForm.style.display = 'flex';
        crud.style.filter = "brightness(0.5)";
    })

    // Initialise datepicker
    flatpickr(".flatpickr-actus", {
        "locale": French,
        dateFormat: "d-m-Y",
        time_24hr: true
    });

    const actusFirestore = firebase.firestore().collection('actus');

    // Must title is display for unlock file input
    document.querySelector('#actus-title').addEventListener('keyup', () => {
        document.querySelector('#actus-picture').removeAttribute('disabled');
    })

    function onSelectFile(event) {

        const file = event.target.files[0];
        const storageRef = firebase.storage().ref();

        // Upload picture
        const uploadPicture = storageRef.child(`${document.querySelector('#actus-title').value}`).put(file);
        uploadPicture.on('state_changed', onStateChanged, onError, onComplete);

        function onStateChanged(snapshot) {
            snapshot.state;
            snapshot.bytesTransferred;
            snapshot.totalBytes;
        }

        function onError(error) {
            console.error('Oops…', error);
        }

        function onComplete() {
            console.log('File uploaded!');

            // Select form
            const form = document.querySelector('#add-actus');
            const cancelBtn = document.querySelector('#actus-cencel');

            // Remove disabled when picture is upload
            document.querySelector('#actus-submit').removeAttribute('disabled');

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const err = []
                const ActusDateValue = document.querySelector('#actus-date').value;
                const ActusTitleValue = document.querySelector('#actus-title').value;
                const ActusTexteValue = document.querySelector('#actus-text').value;
                const ActusPictureValue = document.querySelector('#actus-picture');

                const ActusDate = document.querySelector('#actus-date');
                const ActusTitle = document.querySelector('#actus-title');
                const ActusTexte = document.querySelector('#actus-text');
                const ActusPicture = document.querySelector('#actus-picture');

                // Verify input
                if (ActusDateValue == '') {
                    ActusDate.style.border = '1px solid red';
                    ActusDate.placeholder = 'Veuillez remplir ce champ';
                    err.push('date vide');
                } else {
                    ActusDate.style.border = '1px solid black';
                }

                if (ActusTitleValue.length <= 0) {
                    ActusTitle.style.border = '1px solid red';
                    ActusTitle.placeholder = 'Veuillez remplir ce champ';
                    err.push(ActusTitleValue)
                } else {
                    ActusTitle.style.border = '1px solid black';
                }

                if (ActusTexteValue.length <= 0) {
                    ActusTexte.style.border = '1px solid red';
                    ActusTexte.placeholder = 'Veuillez remplir ce champ';
                    err.push(ActusTexteValue);
                } else {
                    ActusTexte.style.border = '1px solid black';
                }

                if (err.length === 0) {
                    // Upload on firebase
                    actusFirestore.doc().set({
                        dateActus: ActusDateValue,
                        titleActus: ActusTitleValue,
                        textActus: ActusTexteValue,
                        photoUrl: '',
                        timestamp: Date.now()
                    });
                    form.reset()

                    storageRef.listAll().then(function (res) {
                        res.items.forEach(async function (itemRef) {

                            // Get URL picture
                            const downloadURL = await itemRef.getDownloadURL();

                            actusFirestore.get().then(function (querySnapshot) {
                                querySnapshot.forEach(function (doc) {

                                    // Compare name in firebase-auth and in firestore
                                    if (itemRef.name == doc.data().titleActus) {

                                        actusFirestore.doc(doc.id).update({
                                            photoUrl: downloadURL
                                        });

                                    }

                                })
                            })

                        })
                    }).catch(function (error) {
                        console.log(error);
                    });
                }

            });

        }

    }

    // Select input
    const file = document.querySelector('#actus-picture');
    file.addEventListener('change', onSelectFile);


    // Cancel btn
    const backBtn = document.querySelector('.back-actus');

    // Delete add date
    backBtn.addEventListener('click', () => {
        ctnrForm.style.display = 'none';
        crud.style.filter = "brightness(1)";
    })

    const dateFirestore = firebase.firestore().collection('actus');

    // Append datas in tbody
    const formToAppend = document.querySelector('#ctnr-datas-firebase');

    // Display all date
    dateFirestore.onSnapshot(function (querySnapshot) {

        let displayDate = '';

        querySnapshot.forEach(function (doc) {

            displayDate += `
                        <tr class="row-class">
                            <td> ${doc.data().dateActus} </td>
                            <td> ${doc.data().titleActus} </td>
                            <td> <p> ${doc.data().textActus} </p> </td>
                            <td> <p> ${doc.data().photoUrl} </p> </td>
                            <td class="edit"> <i class="fas fa-edit fai-edit-actus${doc.id}"></i> </td>
                            <td class="delete"> <i class="fas fa-trash-alt fai-delete-actus${doc.id}"></i> </td>
                        </tr>
                    `
        })

        formToAppend.innerHTML = displayDate;

    })


})