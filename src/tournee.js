import './lib/fit.fontawesome.js'

import './js/firebase/displayDate.js'

import './style/menu.css';
import './style/tournee.css';
import './style/mediaQueries/tourneeMediaQueries.css';

document.querySelector('.aa').addEventListener('click', () => {
    document.getElementById("sideNavigation").style.width = "270px";
})


document.querySelector('.closebtn').addEventListener('click', () => {
    document.getElementById("sideNavigation").style.width = "0";
})