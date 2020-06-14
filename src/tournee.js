import './lib/fit.fontawesome.js'
import './js/firebase/login.js'
import './js/firebase/disconnect.js'
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

// const p = document.querySelector('#sideNavigation')
// const c = document.querySelector('.ctnr-admin-connection')

// window.addEventListener('resize', () => {
//     if (window.innerWidth < 1000) {
//         p.appendChild(c)
//         c.style.left = '32px'
//         c.style.top = '200px'
//     }
// })



