import './scss/style.scss'
import './assets/porten.jpg'
import './assets/collection-1.jpg'
import './assets/collection-2.jpg'
import './assets/watch-collection-1.jpg'
import './assets/brand-1.png'
import './assets/line.png'
import './assets/aboutus-1.jpg'



// ibg ============================
function ibg() {
	const ibg = document.querySelectorAll('.ibg')
		for (let i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img')) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')'
			}
		}
	}

ibg()


// burgerMenu
const iconMenu = document.querySelector('.icon-menu')
const menuBody = document.querySelector('.menu__body')
const iconSocial = document.querySelector('.icon')

iconMenu.addEventListener('click', () => {
	iconMenu.classList.toggle('active')
	menuBody.classList.toggle('active')
	iconSocial.classList.toggle('active')
})



