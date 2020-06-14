import * as firebase from 'firebase/app';
import './database.js'
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
// import 'firebase/firebase-analytics';

import { gsap, Expo, TweenLite, TimelineLite, CSSPlugin } from "gsap/all";
gsap.registerPlugin(CSSPlugin)

window.addEventListener('load', () => {

    const menuDesktop = document.querySelector('#sideNavigation')
    const globalCtnr = document.querySelector('.ctnr-admin-connection')
    const faiIconConexion = document.querySelector('.ctnr-admin-connection .aaa')
    const faiIconDisconnect = document.querySelector('.ctnr-admin-connection .bbb')
    const ctnrForm = document.querySelector('.ctnr-form-admin')
    const ctnrConexion = document.querySelector('.ctnr-conexion')
    const inputForm = document.querySelectorAll("#form input")
    const cancelBtn = document.querySelector('.btn-cancel-connexion')
    const form = document.getElementById('form')

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        const email = document.querySelector('#mail').value;
        const password = document.querySelector('#password').value;

        firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
            // console.log('Succès de connexion', result);

            tl.to(globalCtnr, .5, {css: {width: 40, height: 40}})
            faiIconConexion.style.display = 'flex'
            ctnrForm.style.display = 'none'
            form.reset()

            if (window.innerWidth < 991) {
                menuDesktop.appendChild(globalCtnr)
                globalCtnr.style.left = '34px'
                TweenLite.to(globalCtnr, .5, {css: {top: 270}})
            }

        }).catch(function (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)

            switch (errorCode) {
                case 'auth/invalid-email':
                    console.log(email);

                    break;
                case 'auth/user-not-found':

                    break;
                case 'auth/wrong-password':

                    break

                default:
                    break;
            }
        });
    })




    var tl = new TimelineLite();

    faiIconConexion.addEventListener('click', () => {
        console.log('click')

        if (window.innerWidth <= 400) {
            tl.to(globalCtnr, .5, {css: {width: 250, height: 250, right: 33}})
        } else {
            tl.to(globalCtnr, .5, {css: {width: 350, height: 250}})
        }
        ctnrForm.style.display = 'flex'
        tl.staggerFrom(inputForm, 1, {opacity: 0, x: 150}, 0.3);
        faiIconConexion.style.display = 'none'
        ctnrConexion.style.display = 'none'


    })

    cancelBtn.addEventListener('click', () => {

        tl.to(globalCtnr, .5, {css: {width: 40, height: 40}})
        faiIconConexion.style.display = 'flex'
        ctnrConexion.style.display = 'block'
        ctnrForm.style.display = 'none'
        form.reset()
    })




    firebase.auth().onAuthStateChanged(function (user) {

        var currentUserConnected = firebase.auth().currentUser;

        if (currentUserConnected != null) {

            const a = document.createElement('a')
            const p = document.createElement('p')
            p.innerHTML = user.email

            a.href = './admin.html'
            a.innerHTML = 'Admin'
            document.querySelector('.menu-desktop a').parentNode.appendChild(a)


            TweenLite.to(globalCtnr, .5, {css: {top: 35, width: 200}})
            ctnrConexion.style.display = 'flex'
            ctnrConexion.style.alignItems = 'center'

            ctnrConexion.appendChild(p)

            if (window.innerWidth < 991) {
                menuDesktop.appendChild(globalCtnr)
                globalCtnr.style.left = '34px'
                TweenLite.to(globalCtnr, .5, {css: {top: 270}})
            }


            faiIconConexion.style.display = 'none'
            faiIconDisconnect.style.display = 'flex'
        }
    });
})





