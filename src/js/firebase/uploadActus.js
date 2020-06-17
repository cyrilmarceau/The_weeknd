import * as firebase from 'firebase/app';
import './database.js'
import 'firebase/firebase-firestore';
import 'firebase/firebase-storage'

window.addEventListener('load', () => {

    const actusFirestore = firebase.firestore().collection('actus');

    const onSelectFile = (event) => {

        const file = event.target.files[0]
        const storageRef = firebase.storage().ref();

        // Upload picture
        const uploadPicture = storageRef.child(`${document.querySelector('#actus-title').value}`).put(file);
        uploadPicture.on('state_changed', onStateChanged, onError, onComplete);

        function onStateChanged(snapshot){
            snapshot.state;
            snapshot.bytesTransferred;
            snapshot.totalBytes;
        }

        function onError(error){
            console.error('Oops…', error);
        }

        function onComplete (){
            console.log('File uploaded!');

            // Select form
            const form = document.querySelector('#add-actus')
            const cancelBtn = document.querySelector('#actus-cencel')

            // Remove disabled when picture is upload
            document.querySelector('#actus-submit').removeAttribute('disabled')

            form.addEventListener('submit', (e) => {
                e.preventDefault()

                const err = []
                const ActusDateValue = document.querySelector('#actus-date').value
                const ActusTitleValue = document.querySelector('#actus-title').value
                const ActusTexteValue = document.querySelector('#actus').value
                const ActusPictureValue = document.querySelector('#actus-picture')

                const ActusDate = document.querySelector('#actus-date')
                const ActusTitle = document.querySelector('#actus-title')
                const ActusTexte = document.querySelector('#actus')
                const ActusPicture = document.querySelector('#actus-picture')

                console.log(ActusTexteValue)

                // Upload on firebase
                actusFirestore.doc().set({
                    dateActus: ActusDateValue,
                    titleActus: ActusTitleValue,
                    textActus: ActusTexteValue,
                    photoUrl: '',
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

            });

        }

    }

    // Select input
    const file = document.querySelector('#actus-picture')
    file.addEventListener('change', onSelectFile)

})