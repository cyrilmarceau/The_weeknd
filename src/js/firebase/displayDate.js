import * as firebase from 'firebase/app';
import './database.js'
import 'firebase/firebase-firestore';

window.addEventListener('load', () => {

    const dateFirestore = firebase.firestore().collection('date');

    // Append datas in tbody
    const formToAppend = document.querySelector('#ctnr-datas-firebabse');


    // Display all date
    dateFirestore.onSnapshot(function (querySnapshot) {

        let displayDate = '';
        let valueToDisplay = '';
        querySnapshot.forEach(function (doc) {


            if (doc.data().isComplete == true) {
                valueToDisplay = 'Complet';
            }
            if (doc.data().isComplete == false) {
                valueToDisplay = '';
            }

            displayDate += `
                    <tr id=${doc.data().isComplete} class="row-class">
                        <td class="through "> ${doc.data().dateConcert} </td>
                        <td class="through"> ${doc.data().cityName} </td>
                        <td class="through"> ${doc.data().countryName} </td>
                        <td class="through"> ${doc.data().placeFestivalName}  </td>
                        <td> ${valueToDisplay} </td>
                    </tr>
                `
        })

        formToAppend.innerHTML = displayDate;

        // Select all element who is complet
        const tr = document.querySelectorAll('tr[id="true"]');
        for (let i = 0; i < tr.length; i++) {
            const element = tr[i];

            // Select td of element who is complet
            const elChildren = element.children;

            for (let j = 0; j < elChildren.length; j++) {
                const element = elChildren[j];
                element.style.color = '#dd453e';

                // Find element who get class through and line-through it
                if (element.className == 'through') {
                    element.style.textDecoration = 'line-through';
                }

            }
        }

    })









})