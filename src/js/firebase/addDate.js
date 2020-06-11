import * as firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/firebase-analytics';


import flatpickr from "flatpickr";
import { French } from "flatpickr/dist/l10n/fr.js"
import '../../../node_modules/flatpickr/dist/flatpickr.min.css'

window.addEventListener('load', () => {

    // Initialise datepicker
    flatpickr(".flatpickr", {
        "locale": French,
        dateFormat: "d-m-Y",
        time_24hr: true
    });

    const dateFirestore = firebase.firestore().collection('date');

    // Section
    const crud = document.getElementById('crud')

    // container div
    const ctnrForm = document.querySelector('.add-date')

    // Display form for add date
    document.querySelector('.display-form-add-date').addEventListener('click', () => {
        ctnrForm.style.display = 'flex'
        crud.style.filter = "brightness(0.5)"
    })


    // Form
    const addDateForm = document.getElementById('add-date')

    // Cancel btn
    const backBtn = document.querySelector('.back')

    addDateForm.addEventListener('submit', (event) => {
        event.preventDefault()

        const err = []

        // Get all input for modify css and value of input for add
        const dateConcertInput = document.querySelector('#date-concert');
        const dateConcertValue = document.querySelector('#date-concert').value;

        const cityNameInput = document.querySelector('#city-name');
        const cityNameValue = document.querySelector('#city-name').value;


        const countryNameInput = document.querySelector('#country-name');
        const countryNameValue = document.querySelector('#country-name').value;

        const placeFestivalNameInput = document.querySelector('#place-festival-name');
        const placeFestivalNameValue = document.querySelector('#place-festival-name').value;

        // Verify input checked
        const radioValue = document.querySelector('input[name="is-complete"]:checked');
        let classRadio = radioValue.className
        let radioValueFirebase;

        if (classRadio == 'complete-is-true') {
            radioValueFirebase = true
        }
        if (classRadio == 'complete-is-false') {
            radioValueFirebase = false
        }

        if (dateConcertValue.length <= 0) {
           
        } else {
            dateConcertInput.style.border = '1px solid black'
        }

        if (cityNameValue.length <= 0) {
            cityNameInput.style.border = '1px solid red'
            cityNameInput.placeholder = 'Veuillez remplir ce champ'
            err.push(cityNameValue)
        } else {
            cityNameInput.style.border = '1px solid black'
        }

        if (countryNameValue.length <= 0) {
            countryNameInput.style.border = '1px solid red'
            countryNameInput.placeholder = 'Veuillez remplir ce champ'
            err.push(countryNameValue)
        } else {
            countryNameInput.style.border = '1px solid black'
        }

        if (placeFestivalNameValue.length <= 0) {
            placeFestivalNameInput.style.border = '1px solid red'
            placeFestivalNameInput.placeholder = 'Veuillez remplir ce champ'
            err.push(placeFestivalNameValue)
        } else {
            placeFestivalNameInput.style.border = '1px solid black'
        }

        // Verify if input is checked
        if (radioValue == null) {
            err.push(radioValue)
        }

        if (err.length === 0) {
            dateFirestore.doc().set({
                dateConcert: dateConcertValue,
                cityName: cityNameValue,
                countryName: countryNameValue,
                placeFestivalName: placeFestivalNameValue,
                isComplete: radioValueFirebase
            });
            ctnrForm.style.display = 'none'
            crud.style.filter = "brightness(1)"
            addDateForm.reset()
        }

    });

    // Delete add date
    backBtn.addEventListener('click', () => {
        ctnrForm.style.display = 'none'
        crud.style.filter = "brightness(1)"
    })


    // Append datas in tbody
    const formToAppend = document.querySelector('#ctnr-datas-firebabse')


    // Display all date
    dateFirestore.onSnapshot(function (querySnapshot) {

        let displayDate = ''
        let valueToDisplay = ''
        querySnapshot.forEach(function (doc) {

            if (doc.data().isComplete == true) {
                valueToDisplay = 'Oui'
            }
            if (doc.data().isComplete == false) {
                valueToDisplay = 'Non'
            }

            displayDate += `
                    <tr class="row-class">
                    <td> ${doc.data().dateConcert} </td>
                    <td> ${doc.data().cityName} </td>
                    <td> ${doc.data().countryName} </td>
                    <td> ${doc.data().placeFestivalName}  </td>
                    <td> ${valueToDisplay}  </td>
                    <td> <i class="fas fa-edit fai-edit${doc.id}"></i> </td>
                    <td> <i class="fas fa-trash-alt fai-delete${doc.id}"></i> </td>
                </tr>
                `
        })
        formToAppend.innerHTML = displayDate;
    })

})

