import * as firebase from 'firebase/app';
import './database.js'
import 'firebase/firebase-firestore';

window.addEventListener('load', () => {
    const actusFirestore = firebase.firestore().collection('actus');

    actusFirestore.get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {

            const divTitleActus = document.createElement('div')
            const divImgActus = document.createElement('div')
            const divTextActus = document.createElement('div')
            const img = document.createElement('img')
            const p = document.createElement('p')
            const article = document.createElement('article')

            p.textContent = doc.data().titleActus
            img.src = doc.data().photoUrl
            article.textContent = doc.data().textActus

            divTitleActus.classList.add('title-actus')
            divImgActus.classList.add('img-actus')
            divTextActus.classList.add('text-actus')

            divTitleActus.appendChild(p)
            divImgActus.appendChild(img)
            divTextActus.appendChild(article)


            document.querySelector('main').appendChild(divTitleActus)
            document.querySelector('main').appendChild(divImgActus)
            document.querySelector('main').appendChild(divTextActus)

        })
    })

})