import { gsap, Expo, TweenLite, CSSPlugin } from "gsap/all";
gsap.registerPlugin(CSSPlugin)

window.addEventListener('load', () => {
    const imagesVideo = document.querySelectorAll('.ctnr-video img')

    const createIframe = (_src, _class, _toAppend) => {
        const ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", _src);
        ifrm.classList.add(_class)
        ifrm.style.width = "956px";
        ifrm.style.height = "538px";
        _toAppend.appendChild(ifrm);
    }


    for (let i = 0; i < imagesVideo.length; i++) {

        const element = imagesVideo[i];

        element.addEventListener('mouseenter', () => {
            element.style.zIndex = '6'
            element.classList.remove('isNotActive')
            element.classList.add('isActive')
            element.style.cursor = "pointer"

            let p = element.parentNode.firstChild
            p.classList.remove('isNotActive')
            p.classList.add('isActive')
        })

        element.addEventListener('mouseleave', () => {
            element.style.zIndex = '2'
            element.classList.remove('isActive')
            element.classList.add('isNotActive')

            let p = element.parentNode.firstChild
            p.classList.remove('isActive')
            p.classList.add('isNotActive')
        })


        element.addEventListener('click', () => {
            element.parentNode.parentNode.nextSibling.style.display = 'block'

            if (element.parentNode.parentNode.nextSibling.classList[1] == 'iframe-1') {
                createIframe('https://www.youtube.com/embed/dqRZDebPIGs', 'videoo', document.querySelector('.iframe-1'))
            }
            if (element.parentNode.parentNode.nextSibling.classList[1] == 'iframe-2') {
                createIframe('https://www.youtube.com/embed/i58MNnk6BhY', 'videoo', document.querySelector('.iframe-2'))
            }
            if (element.parentNode.parentNode.nextSibling.classList[1] == 'iframe-3') {
                createIframe('https://www.youtube.com/embed/oq9AgxHvGjw', 'videoo', document.querySelector('.iframe-3'))
            }
            if (element.parentNode.parentNode.nextSibling.classList[1] == 'iframe-4') {
                createIframe('https://www.youtube.com/embed/4NRXx6U8ABQ', 'videoo', document.querySelector('.iframe-4'))
            }
            if (element.parentNode.parentNode.nextSibling.classList[1] == 'iframe-5') {
                createIframe('https://www.youtube.com/embed/1DpH-icPpl0', 'videoo', document.querySelector('.iframe-5'))
            }

            if (window.innerWidth > 1200) {
                document.querySelector('.videoo').style.width = '956px'
                document.querySelector('.videoo').style.height = '568px'
            }
            if (window.innerWidth >= 992 && window.innerWidth <= 1199.98) {
                document.querySelector('.videoo').style.width = '90%'
                document.querySelector('.videoo').style.height = '468px'
            }
            if (window.innerWidth >= 768 && window.innerWidth <= 991.98) {
                document.querySelector('.videoo').style.width = '90%'
                document.querySelector('.videoo').style.height = '408px'
            }
            if (window.innerWidth >= 576 && window.innerWidth <= 767.98) {
                document.querySelector('.videoo').style.width = '90%'
                document.querySelector('.videoo').style.height = '308px'
            }

            if (window.innerWidth >= 450 && window.innerWidth <= 575.98) {
                document.querySelector('.videoo').style.width = '80%'
                document.querySelector('.videoo').style.height = '268px'
            }
            if (window.innerWidth >= 0 && window.innerWidth <= 450) {
                document.querySelector('.videoo').style.width = '95%'
                document.querySelector('.videoo').style.height = '268px'
            }


            document.querySelectorAll('.ctnr-video').forEach(element => {
                element.style.filter = 'blur(1px) brightness(0.2)'
            })
        })

        let closeIframe = document.querySelectorAll('.close-iframe')

        closeIframe[0].addEventListener('click', () => {
            element.parentNode.parentNode.nextSibling.style.display = 'none'

            if (element.parentNode.parentNode.nextSibling.classList[1] == 'iframe-1') {
                element.parentNode.parentNode.nextSibling.lastChild.remove()
            }

            document.querySelectorAll('.ctnr-video').forEach(element => {
                element.style.filter = 'blur(0px) brightness(1)'
            })
        })

        closeIframe[1].addEventListener('click', () => {
            element.parentNode.parentNode.nextSibling.style.display = 'none'

            if (element.parentNode.parentNode.nextSibling.classList[1] == 'iframe-2') {
                element.parentNode.parentNode.nextSibling.lastChild.remove()
            }

            document.querySelectorAll('.ctnr-video').forEach(element => {
                element.style.filter = 'blur(0px) brightness(1)'
            })
        })

        closeIframe[2].addEventListener('click', () => {
            element.parentNode.parentNode.nextSibling.style.display = 'none'

            if (element.parentNode.parentNode.nextSibling.classList[1] == 'iframe-3') {
                element.parentNode.parentNode.nextSibling.lastChild.remove()
            }

            document.querySelectorAll('.ctnr-video').forEach(element => {
                element.style.filter = 'blur(0px) brightness(1)'
            })
        })

        closeIframe[3].addEventListener('click', () => {
            element.parentNode.parentNode.nextSibling.style.display = 'none'

            if (element.parentNode.parentNode.nextSibling.classList[1] == 'iframe-4') {
                element.parentNode.parentNode.nextSibling.lastChild.remove()
            }

            document.querySelectorAll('.ctnr-video').forEach(element => {
                element.style.filter = 'blur(0px) brightness(1)'
            })
        })

        closeIframe[4].addEventListener('click', () => {
            element.parentNode.parentNode.nextSibling.style.display = 'none'

            if (element.parentNode.parentNode.nextSibling.classList[1] == 'iframe-5') {
                element.parentNode.parentNode.nextSibling.lastChild.remove()
            }

            document.querySelectorAll('.ctnr-video').forEach(element => {
                element.style.filter = 'blur(0px) brightness(1)'
            })
        })

    }









    // Ratio for detect intersection observer
    const ratio = .5;

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: ratio
    }
    const revealItem = document.querySelectorAll('.reveal')

    const callback = (entries, observer) => {

        entries.forEach((entry, index) => {

            if (entry.intersectionRatio > ratio) {

                // After scroll > 1 observer is stopped
                observer.unobserve(entry.target);

                entry.target.classList.add('revealed')
                // console.log(entry.target, '->', index)

                if (entry.target == revealItem[0]) TweenLite.from(entry.target, 1, { y: 550, ease: Expo.easeOut });
                if (entry.target == revealItem[1]) TweenLite.from(entry.target, 1, { y: 550, ease: Expo.easeOut })
                if (entry.target == revealItem[2]) TweenLite.from(entry.target, 1, { y: 550, ease: Expo.easeOut })
                if (entry.target == revealItem[3]) TweenLite.from(entry.target, 1, { y: 550, ease: Expo.easeOut });
                if (entry.target == revealItem[4]) TweenLite.from(entry.target, 1, { y: 550, ease: Expo.easeOut });
            }

        })

    }


    // Observe all element who get class reveal
    const observer = new IntersectionObserver(callback, options);
    document.querySelectorAll('.reveal').forEach((r) => {
        observer.observe(r);
    })

})