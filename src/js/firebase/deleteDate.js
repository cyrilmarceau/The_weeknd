import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/firebase-analytics';

window.addEventListener('load', () => {

    const dateFirestore = firebase.firestore().collection('date');

    dateFirestore.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            // Get id who is clicked
            const elClicked = document.querySelector(`.fai-delete${doc.id}`)

            elClicked.addEventListener('click', (event) => {
                event.preventDefault()
                console.log(doc.data())

                // Delete element on firebase
                dateFirestore.doc(doc.id).delete().then(function () {
                    console.log("Document successfully deleted!");
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });

            })

        })
    })

})



