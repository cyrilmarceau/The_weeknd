import * as firebase from 'firebase/app';
import './database.js'
import 'firebase/firebase-firestore';

window.addEventListener('load', () => {
    const actusFirestore = firebase.firestore().collection('actus');

    actusFirestore.orderBy('timestamp', 'desc').limit(1).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
            console.log(doc.data());

            const globalCtnr = document.querySelector('.ctnr-actu-img')
            const divCtnr = document.createElement('div');

            const divPictureTitle = document.createElement('div');

            const divActuPicture = document.createElement('div');
            const divActuTitle = document.createElement('div');

            const divActuText = document.createElement('div');

            const img = document.createElement('img');
            const h3 = document.createElement('h3');
            const p = document.createElement('p')

            divCtnr.classList.add('ctnr-actu');

            divPictureTitle.classList.add('actu-picture-title');

            divActuPicture.classList.add('actu-picture');
            divActuTitle.classList.add('actu-title');

            divActuText.classList.add('actu-texte')

            img.src = doc.data().photoUrl
            h3.textContent = doc.data().titleActus
            p.textContent = doc.data().textActus

            divActuPicture.appendChild(img)
            divActuTitle.appendChild(h3)
            divActuText.appendChild(p)


            divPictureTitle.appendChild(divActuPicture)
            divPictureTitle.appendChild(divActuTitle)

            divCtnr.appendChild(divPictureTitle)
            divCtnr.appendChild(divActuText)


            globalCtnr.appendChild(divCtnr)


        })
    })
})