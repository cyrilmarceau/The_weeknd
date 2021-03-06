import * as firebase from 'firebase/app';

import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';
import 'firebase/firebase-analytics';

import { gsap, Expo, TweenLite, TimelineLite, CSSPlugin } from "gsap/all";
gsap.registerPlugin(CSSPlugin)

window.addEventListener('load', () => {

    const globalCtnr = document.querySelector('.ctnr-admin-connection');


    firebase.auth().onAuthStateChanged(function (user) {

        var currentUserConnected = firebase.auth().currentUser;

        if (currentUserConnected != null) {

            const faiIconDisconnect = document.querySelector('.ctnr-admin-connection .bbb');
            const faiIconConexion = document.querySelector('.ctnr-admin-connection .aaa');
            const menuA = document.querySelectorAll('a')[4];
            const ctnrConexion = document.querySelector('.ctnr-conexion').lastChild;
            const header = document.querySelector('header');

            faiIconDisconnect.addEventListener('click', () => {

                firebase.auth().signOut().then(function () {

                    // Delete tag a in menu
                    menuA.remove()

                    //Display block on right side
                    TweenLite.to(globalCtnr, .5, {css: {position: 'absolute', left: "",top: 150, right: 0, width: 40}});
                    faiIconDisconnect.style.display = 'none';
                    faiIconConexion.style.display = 'flex';
                    ctnrConexion.remove();
                    header.appendChild(globalCtnr);

                }).catch(function (error) {
                    console.log(error)
                });

            })

        }
    });

    
})


