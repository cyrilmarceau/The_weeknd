import { gsap, Expo, TweenLite, CSSPlugin } from "gsap/all";
gsap.registerPlugin(CSSPlugin)


const lazyLoadElement = document.querySelectorAll('.lazy-load')
const header = document.querySelector('header')
const admin = document.querySelector('.ctnr-admin-connection')
const sectionPres = document.querySelector('#pres-artist')
const sectionAlbum = document.querySelector('#album')
const footer = document.querySelector('footer')
const loader = document.querySelector('.loader')

header.style.display = 'none'
admin.style.display = 'none'
sectionPres.style.display = 'none'
sectionAlbum.style.display = 'none'
footer.style.display = 'none'

document.addEventListener('readystatechange', (event) => {
    console.log(document.readyState);
});


window.addEventListener('load', () => {

    for (const element of lazyLoadElement) {

        if (element.complete) {

            header.style.display = 'block'
            admin.style.display = 'flex'
            sectionPres.style.display = 'block'
            sectionAlbum.style.display = 'block'
            footer.style.display = 'block'
            loader.style.display = 'none'

            setTimeout(() => {
                element.classList.add('loaded');
            }, 500);

        }

    }

    // Ratio for detect intersection observer
    const ratio = .5;

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: ratio
    }
    const revealItem = document.querySelectorAll('#reveal')

    const callback = (entries, observer) => {

        entries.forEach((entry, index) => {

            if (entry.intersectionRatio > ratio) {

                // After scroll > 1 observer is stopped
                observer.unobserve(entry.target);

                entry.target.classList.add('revealed')
                // console.log(entry.target, '->', index)

                if (entry.target == revealItem[0]) TweenLite.from(entry.target, 1, { x: -550, ease: Expo.easeOut });
                if (entry.target == revealItem[1]) TweenLite.from(entry.target, 1, { x: 550, ease: Expo.easeOut })
                if (entry.target == revealItem[2]) TweenLite.from(entry.target, 1, { y: 550, ease: Expo.easeOut })
                if (entry.target == revealItem[3]) TweenLite.from(entry.target, 1, { x: 550, ease: Expo.easeOut })
                if (entry.target == revealItem[4]) TweenLite.from(entry.target, 1, { x: -550, ease: Expo.easeOut })
                if (entry.target == revealItem[5]) TweenLite.from(entry.target, 1, { x: 550, ease: Expo.easeOut })
            }

        })

    }


    // Observe all element who get class reveal
    const observer = new IntersectionObserver(callback, options);
    document.querySelectorAll('#reveal').forEach((r) => {
        observer.observe(r);
    })


    if (window.innerWidth < 991.98 && window.innerWidth > 768) {
        document.querySelector('.spotify iframe').style.width = '300px'
    } else {
        document.querySelector('.spotify iframe').style.width = '400px'
    }
})

