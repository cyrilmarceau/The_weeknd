import { gsap, Expo, TweenLite } from "gsap";

window.addEventListener('load', () => {
    const imagesVideo = document.querySelectorAll('.ctnr-video img')


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

                if (entry.target == revealItem[0]) TweenLite.from(entry.target, 1, {y:550, ease: Expo.easeOut });
                if (entry.target == revealItem[1]) TweenLite.from(entry.target, 1, {y:550, ease: Expo.easeOut })
                if (entry.target == revealItem[2]) TweenLite.from(entry.target, 1, {y:550, ease: Expo.easeOut })
                if (entry.target == revealItem[3]) TweenLite.from(entry.target, 1, {y:550, ease: Expo.easeOut });
                if (entry.target == revealItem[4])TweenLite.from(entry.target, 1, {y:550, ease: Expo.easeOut });
            }

        })

    }


    // Observe all element who get class reveal
    const observer = new IntersectionObserver(callback, options);
    document.querySelectorAll('.reveal').forEach((r) => {
        observer.observe(r);
    })

})