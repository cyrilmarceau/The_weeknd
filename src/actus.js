import './lib/fit.fontawesome.js'
import './js/firebase/login.js'
import './js/firebase/disconnect.js'
import './js/firebase/displayActus.js'
import './style/menu.css';
import './style/actus.css'
import './style/mediaQueries/actusMediaQueries.css';

document.querySelector('.aa').addEventListener('click', () => {
    document.getElementById("sideNavigation").style.width = "270px";
})


document.querySelector('.closebtn').addEventListener('click', () => {
    document.getElementById("sideNavigation").style.width = "0";
})