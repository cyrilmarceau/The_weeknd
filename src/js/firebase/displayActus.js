import * as firebase from 'firebase/app';
import './database.js'
import 'firebase/firebase-firestore';

window.addEventListener('load', () => {
    const actusFirestore = firebase.firestore().collection('actus');

    actusFirestore.orderBy('timestamp', 'desc').get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {

            const ctnrDiv = document.createElement('div');

            const divTitleActus = document.createElement('div');
            const divImgActus = document.createElement('div');
            const divTextActus = document.createElement('div');
            const divDateActus = document.createElement('div');
            const img = document.createElement('img');
            const p = document.createElement('p');
            const article = document.createElement('article');
            // const pDate = document.createElement('p')

            let pDay = document.createElement('p');
            let pMont = document.createElement('p');
            let pYears = document.createElement('p');

            let date = doc.data().dateActus;
            let dateSplit = date.split('/');

            let day = dateSplit[0];
            let month = dateSplit[1];
            let year = dateSplit[2];

            let montArray = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
            switch (month) {
                case '01':
                    month = montArray[0]
                    break;
                case '02':
                    month = montArray[1]
                    break;
                case '03':
                    month = montArray[2]
                    break;
                case '04':
                    month = montArray[3]
                    break;
                case '05':
                    month = montArray[4]
                    break;
                case '06':
                    month = montArray[5]
                    break;
                case '07':
                    month = montArray[6]
                    break;
                case '08':
                    month = montArray[7]
                    break;
                case '09':
                    month = montArray[8]
                    break;
                case '10':
                    month = montArray[9]
                    break;
                case '11':
                    month = montArray[10]
                    break;
                case '12':
                    month = montArray[11]
                    break;
            
                default:
                    break;
            }

            p.textContent = doc.data().titleActus;
            img.src = doc.data().photoUrl;
            article.textContent = doc.data().textActus;
            pDay.textContent = day;
            pMont.textContent = month;
            pYears.textContent = year;


            ctnrDiv.classList.add('ctnr-div');
            divTitleActus.classList.add('title-actus');
            divImgActus.classList.add('img-actus');
            divDateActus.classList.add('date-actus');
            divTextActus.classList.add('text-actus');

            divTitleActus.appendChild(p);
            divImgActus.appendChild(img);

            divDateActus.appendChild(pDay);
            divDateActus.appendChild(pMont);
            divDateActus.appendChild(pYears);

            divTextActus.appendChild(article);

            ctnrDiv.appendChild(divImgActus);
            divImgActus.appendChild(divDateActus);
            ctnrDiv.appendChild(divTitleActus);
            ctnrDiv.appendChild(divTextActus);

            document.querySelector('main').appendChild(ctnrDiv);
        })
    })


})