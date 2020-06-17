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