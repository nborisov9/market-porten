import './scss/style.scss'
import './assets/porten.jpg'

import './assets/collection-0.jpg'
import './assets/collection-1.jpg'
import './assets/collection-2.jpg'
import './assets/collection-21.jpg'
import './assets/watch-collection-1.jpg'

import './assets/brand-1.png'
import './assets/line.png'
import './assets/aboutus-1.jpg'

import './assets/arrival-0.jpg'
import './assets/arrival-1.jpg'
import './assets/arrival-2.jpg'
import './assets/arrival-3.jpg'
import './assets/arrival-4.jpg'
import './assets/arrival-5.jpg'
import './assets/arrival-6.jpg'



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



const collContainer = document.querySelector('.prod__body')
const arrivalContainer = document.querySelector('.arrival__row')
const brandsContainer = document.querySelector('.brands__row')


const collData = [{title: 'Louis XVI ATHOS', price: 165.333, id: 0},
	{title: 'Adriatica', price: 99.999, id: 1},
	{title: 'Cover', price: 49.111, id: 2}
]

const arrivalData = [
	{title: 'Q&Q', price: 165.333, id: 0},
	{title: 'CASIO', price: 99.999, id: 1},
	{title: 'Louis XVI ATHOS', price: 49.111, id: 2},
	{title: 'Adriatica', price: 23.255, id: 3},
	{title: 'JACQUES LEMANS', price: 37.111, id: 4},
	{title: 'PIERRE LANNIER', price: 26.111, id: 5},
	{title: 'TIMEX', price: 149.999, id: 6}
]

const brandsData = [
	{id: 1},
	{id: 1},
	{id: 1},
	{id: 1},
]

const collTemplate = collData.map(({title, price, id}) => {
	return `
		<div class="prod__item item-prod">
			<div class="item-prod__img">
				<a href="">
					<img src="assets/collection-${id}.jpg" alt="">
				</a>
			</div>
			<a href="" class="item-prod__title">${title}</a>
			<a href="" class="item-prod__price">${price}</a>
		</div>
	`
})

const arrivalTemplate = arrivalData.map(({title, price, id}) => {
	return `
		<div class="arrival__column col-arrival">
			<a href="" class="col-arrival__image">
				<img src="assets/arrival-${id}.jpg" alt="">
			</a>
			<div class="col-arrival__body body-arrival">
				<a href="" class="body-arrival__title">${title}</a>
				<a href="" class="body-arrival__price">${price}</a>
			</div>
		</div>
	`
})


const brandsTemplate = brandsData.map(({id}) => {
	return `
		<a href="" class="brands__image">
			<img src="assets/brand-${id}.png" alt="">
		</a>
	`
})


collContainer.innerHTML = collTemplate.join('')
arrivalContainer.innerHTML = arrivalTemplate.join('')
brandsContainer.innerHTML = brandsTemplate.join('')