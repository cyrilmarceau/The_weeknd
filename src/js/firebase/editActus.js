import * as firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import 'firebase/firebase-analytics';

// Datepicker
import flatpickr from "flatpickr";
import { French } from "flatpickr/dist/l10n/fr.js"
import '../../../node_modules/flatpickr/dist/flatpickr.min.css'


window.addEventListener('load', () => {

    // Firebase
    const actusFirestore = firebase.firestore().collection('actus');

    // Initialise datepicker
    flatpickr(".flatpickreee", {
        "locale": French,
        dateFormat: "d-m-Y",
        time_24hr: true,
    });

    // Form
    const formEdit = document.querySelector('#edit-actus');

    // Ctnr to display none after submit or cancel
    const ctnrForm = document.querySelector('.edit-actus');

    // Section
    const crud = document.getElementById('actus');


    // Variable for get id
    let elToUpdate;

    // Cancel
    let backEdit;

    actusFirestore.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            // Get id who is clicked
            const elementClicked = document.querySelector(`.fai-edit-actus${doc.id}`);

            elementClicked.addEventListener('click', () => {
                event.preventDefault();

                // Update variable with id for submit
                elToUpdate = doc.id;

                ctnrForm.style.display = 'flex';
                crud.style.filter = "brightness(0.5)";


                const createEl = (_type, _attribute1, _attribute2, _placeholder, _firebase, _class, _a) => {
                    const el = document.createElement(_type);

                    el.setAttribute(_attribute1, _attribute2);
                    el.placeholder = _placeholder;
                    el.value = _firebase;
                    el.classList.add(_class);
                    _a.appendChild(el);
                }

                const createLabel = (_type, _content, _a) => {
                    const el = document.createElement(_type);
                    el.textContent = _content;
                    _a.appendChild(el);
                }

                createLabel("label", "Date de l'actualité", document.querySelector('.ctnr-actus-1'));
                document.querySelector('.date-actus-edit').value = doc.data().dateActus;

                createLabel("label", "Titre de l'actualité", document.querySelector('.ctnr-actus-2'));
                createEl("input", "type", "text", "Titre de l'actualité", doc.data().titleActus, "title-actus-edit", document.querySelector('.ctnr-actus-2'));

                createLabel("label", "Texte de l'actualité", document.querySelector('.ctnr-actus-3'));
                createEl("textarea", null, null, "Texte de l'actualité", doc.data().textActus, "texte-actus-edit", document.querySelector('.ctnr-actus-3'));

                createEl("input", "type", "button", null, "annuler", "back-actus-edit", document.querySelector('.ctnr-actus-6'));
                createEl("input", "type", "submit", null, "Valider", "valide-actus-edit", document.querySelector('.ctnr-actus-6'));

                // Cancel
                backEdit = document.querySelector('.back-actus-edit');
                backEdit.addEventListener('click', () => {

                    ctnrForm.style.display = 'none';
                    crud.style.filter = "brightness(1)";
                    while (document.querySelector('.ctnr-actus-1').firstChild) { document.querySelector('.ctnr-actus-1').removeChild(document.querySelector('.ctnr-actus-1').lastChild); };
                    while (document.querySelector('.ctnr-actus-2').firstChild) { document.querySelector('.ctnr-actus-2').removeChild(document.querySelector('.ctnr-actus-2').lastChild); };
                    while (document.querySelector('.ctnr-actus-3').firstChild) { document.querySelector('.ctnr-actus-3').removeChild(document.querySelector('.ctnr-actus-3').lastChild); };
                    // while (document.querySelector('.ctnr-4').firstChild) { document.querySelector('.ctnr-4').removeChild(document.querySelector('.ctnr-4').lastChild); };
                    // while (document.querySelector('.ctnr-5').firstChild) { document.querySelector('.ctnr-5').removeChild(document.querySelector('.ctnr-5').lastChild); };
                    while (document.querySelector('.ctnr-actus-6').firstChild) { document.querySelector('.ctnr-actus-6').removeChild(document.querySelector('.ctnr-actus-6').lastChild); };

                })
            })
        })
    })

    formEdit.addEventListener('submit', (event) => {
        event.preventDefault()

        const err = []

        // Get new value for input
        const newTitleActusEdit = document.querySelector('.title-actus-edit');
        const newTitleActusEditValue = document.querySelector('.title-actus-edit').value;

        const newTextEdit = document.querySelector('.texte-actus-edit');
        const newTextEditValue = document.querySelector('.texte-actus-edit').value;

        if (newTitleActusEditValue.length <= 0) {
            newTitleActusEdit.style.border = '1px solid red';
            newTitleActusEdit.placeholder = 'Veuillez remplir ce champ';
            err.push(newTitleActusEditValue);
        } else {
            newTitleActusEdit.style.border = '1px solid black';
        }

        if (newTextEditValue.length <= 0) {
            newTextEdit.style.border = '1px solid red';
            newTextEdit.placeholder = 'Veuillez remplir ce champ';
            err.push(newTextEditValue);
        } else {
            newTextEdit.style.border = '1px solid black';
        }

        if (err.length === 0) {
            // Update in firebase
            actusFirestore.doc(elToUpdate).update({
                titleActus: newTitleActusEditValue,
                textActus: newTextEditValue,
            })

            const storageRef = firebase.storage().ref();

            storageRef.listAll().then(function (res) {
                res.items.forEach(async function (itemRef) {

                                itemRef.name = newTitleActusEditValue

                })
            }).catch(function (error) {
                console.log(error);
            });

            ctnrForm.style.display = 'none';
            crud.style.filter = "brightness(1)";

            while (document.querySelector('.ctnr-actus-1').firstChild) { document.querySelector('.ctnr-actus-1').removeChild(document.querySelector('.ctnr-actus-1').lastChild); };
            while (document.querySelector('.ctnr-actus-2').firstChild) { document.querySelector('.ctnr-actus-2').removeChild(document.querySelector('.ctnr-actus-2').lastChild); };
            while (document.querySelector('.ctnr-actus-3').firstChild) { document.querySelector('.ctnr-actus-3').removeChild(document.querySelector('.ctnr-actus-3').lastChild); };
            while (document.querySelector('.ctnr-actus-6').firstChild) { document.querySelector('.ctnr-actus-6').removeChild(document.querySelector('.ctnr-actus-6').lastChild); };

        }

    })




});