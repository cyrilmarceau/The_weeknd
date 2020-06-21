// Font awesome kit
import './lib/fit.fontawesome.js'

import './js/firebase/login.js'
import './js/firebase/disconnect.js'

// Animation GSAP
import './js/animation/animationIndex.js'

// Display last actu firebase
import './js/firebase/displayActuIndex.js'

import './style/loader.css'

import './style/menu.css';

import './style/main.css'
import './style/mediaQueries/indexMediaQueries.css';


document.querySelector('.aa').addEventListener('click', () => {
    document.getElementById("sideNavigation").style.width = "270px";
})


document.querySelector('.closebtn').addEventListener('click', () => {
    document.getElementById("sideNavigation").style.width = "0";
})
