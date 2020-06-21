import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/firebase-analytics';

window.addEventListener('load', () => {

    const actusFirestore = firebase.firestore().collection('actus');

    actusFirestore.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            // Get id who is clicked
            const elClicked = document.querySelector(`.fai-delete-actus${doc.id}`);

            elClicked.addEventListener('click', (event) => {
                event.preventDefault();


                // Delete element on firebase
                actusFirestore.doc(doc.id).delete().then(function () {
                    console.log("Document successfully deleted!");
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });

            })

        })
    })

})
