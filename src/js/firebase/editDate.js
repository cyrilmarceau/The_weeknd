import * as firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import 'firebase/firebase-analytics';

import flatpickr from "flatpickr";
import '../../../node_modules/flatpickr/dist/flatpickr.min.css'


window.addEventListener('load', () => {

        // Initialise datepicker
        flatpickr(".flatpickre", {
            dateFormat: "d-m-Y",
            time_24hr: true
        });

    // Firebase
    const dateFirestore = firebase.firestore().collection('date');

    // Form
    const formEdit = document.querySelector('#edit-date')

    // Ctnr to display none after submit or cancel
    const ctnrForm = document.querySelector('.edit-date')

    // Section
    const crud = document.getElementById('crud')

    // Variable for get id
    let elToUpdate;

    // Cancel
    let backEdit;

    dateFirestore.onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            // Get id who is clicked
            const elClicked = document.querySelector(`.fai-edit${doc.id}`)

            elClicked.addEventListener('click', (event) => {
                event.preventDefault()

                // Update variable with id for submit
                elToUpdate = doc.id

                // Display caontainer
                ctnrForm.style.display = 'flex'
                crud.style.filter = "brightness(0.5)"

                // function for create input / radio / label in new form for update
                const createEl = (_type, _attribute1, _attribute2, _placeholder, _firebase, _class, _a) => {
                    const el = document.createElement(_type)

                    el.setAttribute(_attribute1, _attribute2)
                    el.placeholder = _placeholder
                    el.value = _firebase
                    el.classList.add(_class)
                    _a.appendChild(el)
                }
                const createRadio = (_type, _attribute1, _attribute2, _attribute3, _checked, _class, _a) => {
                    const el = document.createElement(_type)
                    el.setAttribute(_attribute1, _attribute2)
                    el.name = _attribute3
                    el.checked = _checked
                    el.classList.add(_class)
                    _a.appendChild(el)
                }

                const createLabel = (_type, _content, _a) => {
                    const el = document.createElement(_type)
                    el.textContent = _content
                    _a.appendChild(el)
                }


                createLabel("label", "Date du concert", document.querySelector('.ctnr-1'))
                document.querySelector('.date-concert-edit').value = doc.data().dateConcert
                // createEl("input", "type", "text", "date du concert", doc.data().dateConcert, "date-concert-edit", document.querySelector('.ctnr-1'))
                // createEl("input", "type", "text", "date du concert", doc.data().dateConcert, "date-concert-edit", document.querySelector('.ctnr-1'))

                createLabel("label", "Nom de la ville", document.querySelector('.ctnr-2'))
                createEl("input", "type", "text", "Nom de la ville", doc.data().cityName, "city-name-edit", document.querySelector('.ctnr-2'))

                createLabel("label", "Nom du pays", document.querySelector('.ctnr-3'))
                createEl("input", "type", "text", "Nom du pays", doc.data().countryName, "country-name-edit", document.querySelector('.ctnr-3'))

                createLabel("label", "Lieux / festival", document.querySelector('.ctnr-4'))
                createEl("input", "type", "text", "Lieux", doc.data().placeFestivalName, "place-festival-name-edit", document.querySelector('.ctnr-4'))

                // Detect value in firebase and do a checked radio
                if (doc.data().isComplete == true) {
                    createLabel("label", "Oui", document.querySelector('.ctnr-5'))
                    createRadio("input", "type", "radio", "namee", true, "edit-is-complet-true", document.querySelector('.ctnr-5'))
                    createLabel("label", "Non", document.querySelector('.ctnr-5'))
                    createRadio("input", "type", "radio", "namee", false, "edit-is-complet-false", document.querySelector('.ctnr-5'))
                }
                if (doc.data().isComplete == false) {
                    createLabel("label", "Oui", document.querySelector('.ctnr-5'))
                    createRadio("input", "type", "radio", "namee", false, "edit-is-complet-true", document.querySelector('.ctnr-5'))
                    createLabel("label", "Non", document.querySelector('.ctnr-5'))
                    createRadio("input", "type", "radio", "namee", true, "edit-is-complet-false", document.querySelector('.ctnr-5'))
                }

                createEl("input", "type", "button", null, "annuler", "back-edit", document.querySelector('.ctnr-6'))
                createEl("input", "type", "submit", null, "Valider", "valide-edit", document.querySelector('.ctnr-6'))

                // Cancel
                backEdit = document.querySelector('.back-edit')
                backEdit.addEventListener('click', () => {

                    ctnrForm.style.display = 'none'
                    crud.style.filter = "brightness(1)"
                    while (document.querySelector('.ctnr-1').firstChild) { document.querySelector('.ctnr-1').removeChild(document.querySelector('.ctnr-1').lastChild); }
                    while (document.querySelector('.ctnr-2').firstChild) { document.querySelector('.ctnr-2').removeChild(document.querySelector('.ctnr-2').lastChild); }
                    while (document.querySelector('.ctnr-3').firstChild) { document.querySelector('.ctnr-3').removeChild(document.querySelector('.ctnr-3').lastChild); }
                    while (document.querySelector('.ctnr-4').firstChild) { document.querySelector('.ctnr-4').removeChild(document.querySelector('.ctnr-4').lastChild); }
                    while (document.querySelector('.ctnr-5').firstChild) { document.querySelector('.ctnr-5').removeChild(document.querySelector('.ctnr-5').lastChild); }
                    while (document.querySelector('.ctnr-6').firstChild) { document.querySelector('.ctnr-6').removeChild(document.querySelector('.ctnr-6').lastChild); }

                })

            })

        })
    })


    formEdit.addEventListener('submit', (event) => {
        event.preventDefault();

        const err = []


        // Get new value for input
        const newDateConcertEdit = document.querySelector('.date-concert-edit');
        const newDateConcertEditValue = document.querySelector('.date-concert-edit').value

        const newCityNameEdit = document.querySelector('.city-name-edit');
        const newCityNameEditValue = document.querySelector('.city-name-edit').value


        const newCountryNameEdit = document.querySelector('.country-name-edit');
        const newCountryNameEditValue = document.querySelector('.country-name-edit').value


        const newPlaceFestivalNameEdit = document.querySelector('.place-festival-name-edit');
        const newPlaceFestivalNameEditValue = document.querySelector('.place-festival-name-edit').value


        const newRadioEditValue = document.querySelector('input[name="namee"]:checked');

        // Get radio for comparate and update good value
        let classRadio = newRadioEditValue.className
        let newRadioValueFirebase;

        if (classRadio == 'edit-is-complet-true') {
            newRadioValueFirebase = true
        }
        if (classRadio == 'edit-is-complet-false') {
            newRadioValueFirebase = false
        }

        if (newDateConcertEditValue.length <= 0) {
            newDateConcertEdit.style.border = '1px solid red'
            newDateConcertEdit.placeholder = 'Veuillez remplir ce champ'
            err.push(newDateConcertEditValue)
        } else {
            newDateConcertEdit.style.border = '1px solid black'
        }

        if (newCityNameEditValue.length <= 0) {
            newCityNameEdit.style.border = '1px solid red'
            newCityNameEdit.placeholder = 'Veuillez remplir ce champ'
            err.push(newCityNameEditValue)
        } else {
            newCityNameEdit.style.border = '1px solid black'
        }

        if (newCountryNameEditValue.length <= 0) {
            newCountryNameEdit.style.border = '1px solid red'
            newCountryNameEdit.placeholder = 'Veuillez remplir ce champ'
            err.push(newCountryNameEditValue)
        } else {
            newCountryNameEdit.style.border = '1px solid black'
        }

        if (newPlaceFestivalNameEditValue.length <= 0) {
            newPlaceFestivalNameEdit.style.border = '1px solid red'
            newPlaceFestivalNameEdit.placeholder = 'Veuillez remplir ce champ'
            err.push(newPlaceFestivalNameEditValue)
        } else {
            newPlaceFestivalNameEdit.style.border = '1px solid black'
        }


        if (err.length === 0) {
            // Update in firebase
            dateFirestore.doc(elToUpdate).update({
                dateConcert: newDateConcertEditValue,
                cityName: newCityNameEditValue,
                countryName: newCountryNameEditValue,
                placeFestivalName: newPlaceFestivalNameEditValue,
                isComplete: newRadioValueFirebase
            })

            ctnrForm.style.display = 'none'
            crud.style.filter = "brightness(1)"
            while (document.querySelector('.ctnr-1').firstChild) { document.querySelector('.ctnr-1').removeChild(document.querySelector('.ctnr-1').lastChild); }
            while (document.querySelector('.ctnr-2').firstChild) { document.querySelector('.ctnr-2').removeChild(document.querySelector('.ctnr-2').lastChild); }
            while (document.querySelector('.ctnr-3').firstChild) { document.querySelector('.ctnr-3').removeChild(document.querySelector('.ctnr-3').lastChild); }
            while (document.querySelector('.ctnr-4').firstChild) { document.querySelector('.ctnr-4').removeChild(document.querySelector('.ctnr-4').lastChild); }
            while (document.querySelector('.ctnr-5').firstChild) { document.querySelector('.ctnr-5').removeChild(document.querySelector('.ctnr-5').lastChild); }
            while (document.querySelector('.ctnr-6').firstChild) { document.querySelector('.ctnr-6').removeChild(document.querySelector('.ctnr-6').lastChild); }
        }

    })


})

