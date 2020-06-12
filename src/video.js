// Font awesome kit
import './lib/fit.fontawesome.js';

import './js/animation/Animationvideo.js';
import './js/firebase/login.js'
import './js/firebase/disconnect.js'
import './style/menu.css';
import './style/video.css';
import './style/mediaQueries/videoMediaQueries.css';


document.querySelector('.aa').addEventListener('click', () => {
    document.getElementById("sideNavigation").style.width = "270px";
})


document.querySelector('.closebtn').addEventListener('click', () => {
    document.getElementById("sideNavigation").style.width = "0";
})
