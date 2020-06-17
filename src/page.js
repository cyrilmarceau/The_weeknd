// Font awesome kit
import './lib/fit.fontawesome.js'
import './js/firebase/login.js'
import './js/firebase/disconnect.js'
import './js/animation/animationIndex.js'
import './js/firebase/displayActuIndex.js'
import './style/menu.css';
import './style/main.css'
import './style/mediaQueries/indexMediaQueries.css';


document.querySelector('.aa').addEventListener('click', () => {
    document.getElementById("sideNavigation").style.width = "270px";
})


document.querySelector('.closebtn').addEventListener('click', () => {
    document.getElementById("sideNavigation").style.width = "0";
})
