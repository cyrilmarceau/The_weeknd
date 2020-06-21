import * as firebase from 'firebase/app';
import './database.js'
import 'firebase/firebase-firestore';

window.addEventListener('load', () => {
    const actusFirestore = firebase.firestore().collection('actus');

    actusFirestore.orderBy('timestamp', 'desc').limit(1).onSnapshot(function(querySnapshot){
        querySnapshot.forEach(function(doc) {

            const globalCtnr = document.querySelector('.ctnr-img')
            const divCtnr = document.createElement('div');

            const divPictureTitle = document.createElement('div');

            const divActuPicture = document.createElement('div');
            const divActuTitle = document.createElement('div');

            const divActuText = document.createElement('div');

            const img = document.createElement('img');
            const h3 = document.createElement('h3');
            const article = document.createElement('article');
            const date = document.createElement('p')
            const link = document.createElement('a')

            divCtnr.classList.add('ctnr-actu');
            // divCtnr.id = "reveal";

            divPictureTitle.classList.add('actu-picture-title');

            divActuPicture.classList.add('actu-picture');
            divActuTitle.classList.add('actu-title');

            divActuText.classList.add('actu-texte');

            img.src = doc.data().photoUrl;
            img.alt = 'Dernières actualités de the weeknd';
            h3.textContent = doc.data().titleActus;
            article.textContent = doc.data().textActus;
            date.textContent = doc.data().dateActus
            link.href = './actus.html'
            link.textContent = 'Voir toutes les actualités'

            divActuPicture.appendChild(img);
            divActuTitle.appendChild(h3);
            divActuText.appendChild(date)
            divActuText.appendChild(article);
            divActuText.appendChild(link)


            divPictureTitle.appendChild(divActuPicture);
            divPictureTitle.appendChild(divActuTitle);

            divCtnr.appendChild(divPictureTitle);
            divCtnr.appendChild(divActuText);


            globalCtnr.appendChild(divCtnr);

        })
    })
})