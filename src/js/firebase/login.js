import * as firebase from 'firebase/app';
import './database.js'
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
// import 'firebase/firebase-analytics';

import { gsap, Expo, TweenLite, TimelineLite, CSSPlugin } from "gsap/all";
gsap.registerPlugin(CSSPlugin)

window.addEventListener('load', () => {

    // Left side menu
    const menuDesktop = document.querySelector('#sideNavigation')

    // Ctnr form
    const globalCtnr = document.querySelector('.ctnr-admin-connection')

    // Ctnr icon
    const ctnrConexion = document.querySelector('.ctnr-conexion')

    // Icon connect
    const faiIconConexion = document.querySelector('.ctnr-admin-connection .aaa')

    // Icon disconnect
    const faiIconDisconnect = document.querySelector('.ctnr-admin-connection .bbb')

    // Ctnr form connexion
    const ctnrForm = document.querySelector('.ctnr-form-admin')


    const inputForm = document.querySelectorAll("#form input")
    const cancelBtn = document.querySelector('.btn-cancel-connexion')
    const form = document.getElementById('form')

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        const email = document.querySelector('#mail').value;
        const password = document.querySelector('#password').value;

        firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
            // console.log('Succès de connexion', result);

            // User is connected : start animation
            tl.to(globalCtnr, .5, { css: { width: 40, height: 40 } })
            faiIconConexion.style.display = 'flex'
            ctnrForm.style.display = 'none'
            form.reset()

            // Display menu on side bar
            if (window.innerWidth < 991) {
                menuDesktop.appendChild(globalCtnr)
                globalCtnr.style.left = '34px'
                TweenLite.to(globalCtnr, .5, { css: { top: 270 } })
            }

        }).catch(function (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            const emailInput = document.querySelector('#mail')
            const passwordInput = document.querySelector('#password')
            console.log(errorCode)

            switch (errorCode) {
                case 'auth/invalid-email':
                    emailInput.value = '';
                    emailInput.placeholder = 'Champ incorrect'
                    emailInput.border = '1px solid red'
                    break;
                case 'auth/user-not-found':
                    emailInput.value = '';
                    emailInput.placeholder = 'Champ incorrect'
                    emailInput.border = '1px solid red'
                    break;
                case 'auth/wrong-password':
                    passwordInput.value = '';
                    passwordInput.placeholder = 'Champ incorrect'
                    passwordInput.border = '1px solid red'
                    break

                default:
                    break;
            }
        });
    })




    let tl = new TimelineLite();

    faiIconConexion.addEventListener('click', () => {
        console.log('click')

        // Design for small device for ctnr form
        if (window.innerWidth <= 400) {
            tl.to(globalCtnr, .5, { css: { width: 250, height: 250, right: 33 } })
        } else {
            tl.to(globalCtnr, .5, { css: { width: 350, height: 250 } })
        }
        ctnrForm.style.display = 'flex'

        // Animate input
        tl.staggerFrom(inputForm, 1, { opacity: 0, x: 150 }, 0.3);
        faiIconConexion.style.display = 'none'
        ctnrConexion.style.display = 'none'

    })


    cancelBtn.addEventListener('click', () => {

        tl.to(globalCtnr, .5, { css: { width: 40, height: 40 } })
        faiIconConexion.style.display = 'flex'
        ctnrConexion.style.display = 'block'
        ctnrForm.style.display = 'none'
        form.reset()
    })




    firebase.auth().onAuthStateChanged(function (user) {

        var currentUserConnected = firebase.auth().currentUser;

        // Detect if user is connected
        if (currentUserConnected != null) {

            const a = document.createElement('a')
            const p = document.createElement('p')
            p.innerHTML = user.email

            a.href = './admin.html'
            a.innerHTML = 'Admin'
            document.querySelector('.menu-desktop a').parentNode.appendChild(a)

            // Animate div to header
            TweenLite.to(globalCtnr, .5, { css: { top: 35, width: 200 } })
            ctnrConexion.style.display = 'flex'
            ctnrConexion.style.alignItems = 'center'

            ctnrConexion.appendChild(p)

            if (window.innerWidth < 991) {
                menuDesktop.appendChild(globalCtnr)
                globalCtnr.style.left = '34px'
                TweenLite.to(globalCtnr, .5, { css: { top: 270 } })
            }

            faiIconConexion.style.display = 'none'
            faiIconDisconnect.style.display = 'flex'

        }

    });

})





