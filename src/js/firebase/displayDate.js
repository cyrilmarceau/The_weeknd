import * as firebase from 'firebase/app';
import './database.js'
import 'firebase/firebase-firestore';

window.addEventListener('load', () => {

    const dateFirestore = firebase.firestore().collection('date');

    // Append datas in tbody
    const formToAppend = document.querySelector('#ctnr-datas-firebabse')


    // Display all date
    dateFirestore.onSnapshot(function (querySnapshot) {

        let displayDate = '';
        let valueToDisplay = '';
        querySnapshot.forEach(function (doc) {


            if (doc.data().isComplete == true) {
                valueToDisplay = 'Complet'
                // console.log(doc.data())
                // const test = document.querySelectorAll('#ctnr-datas-firebabse')[0].children
                // console.log(test);
                
                // for (let i = 0; i < test.length; i++) {
                //     const element = test[i];
                //     console.log(element);
                    
                    
                // }
            }
            if (doc.data().isComplete == false) {
                valueToDisplay = ''
            }

            displayDate += `
                    <tr id=${doc.data().isComplete} class="row-class">
                        <td> ${doc.data().dateConcert} </td>
                        <td> ${doc.data().cityName} </td>
                        <td> ${doc.data().countryName} </td>
                        <td> ${doc.data().placeFestivalName}  </td>
                        <td> ${valueToDisplay}  </td>
                    </tr>
                `
        })
        formToAppend.innerHTML = displayDate;
    })

    setTimeout(() => {
        const tr = document.querySelectorAll('tr[id="true"]')
        for (let i = 0; i < tr.length; i++) {
            const element = tr[i];
            const elChildren = element.children

            for (let j = 0; j < elChildren.length; j++) {
                const element = elChildren[j];
                // console.log(element);
                element.style.textDecoration = 'line-through'
            }
        }


    }, 2000);


})