import {ibg, html, importAll} from './utils/utils'
import {collTemplate, arrivalTemplate, brandsTemplate, product, productTemplate} from './templates/templates'
import {prodocutData} from './db/db'

import './#scss/style.scss'


importAll(require.context('./assets', false, /\.(png|jpe?g|svg|gif)$/))
ibg()

const iconMenu = document.querySelector('.icon-menu')
const menuBody = document.querySelector('.menu__body')
const iconSocial = document.querySelector('.icon')
const sliderContainer = document.querySelector('.slider-product__inner')
const collContainer = document.querySelector('.prod__body')
const arrivalContainer = document.querySelector('.arrival__row')
const brandsContainer = document.querySelector('.brands__row')
const prevProduct = document.querySelector('.counter-slider__prev')
const nextProduct = document.querySelector('.counter-slider__next')
const wrapperProduct = document.querySelector('.slider-product__wrapper')
const innerProduct = document.querySelector('.slider-product__inner')
const wrapperWidth = window.getComputedStyle(wrapperProduct).width
const arrowAsc = document.querySelector('.btn-slider__asc')
const arrowDesc = document.querySelector('.btn-slider__desc')



html(sliderContainer, productTemplate.join(''))
html(collContainer, collTemplate.join(''))
html(arrivalContainer, arrivalTemplate.join(''))
html(brandsContainer, brandsTemplate.join(''))


iconMenu.addEventListener('click', () => {
	iconMenu.classList.toggle('active')
	menuBody.classList.toggle('active')
	iconSocial.classList.toggle('active')
})


const sortPriceAsc = () => {
	arrowAsc.style.color = 'rgb(255, 97, 97)'
	arrowDesc.style.color = ''
	const data = JSON.parse(JSON.stringify(prodocutData))
	data.sort((a, b) => a.price > b.price ? 1 : -1)
	const dataTemplate = data.map(({title, price, id}) => {
		return product(title, price, id)
	})

	sliderContainer.textContent = ''
	html(sliderContainer, dataTemplate.join(''))
}

const sortPriceDesc = () => {
	arrowDesc.style.color = 'rgb(255, 97, 97)'
	arrowAsc.style.color = ''
	const data = JSON.parse(JSON.stringify(prodocutData))
	data.sort((a, b) => a.price > b.price ? -1 : 1)
	const dataTemplate = data.map(({title, price, id}) => {
		return product(title, price, id)
	})

	sliderContainer.textContent = ''
	html(sliderContainer, dataTemplate.join(''))
}

arrowAsc.addEventListener('click', sortPriceAsc)
arrowDesc.addEventListener('click', sortPriceDesc)



let offset = 0
const slideChange = (event) => {
	const slideProduct = document.querySelectorAll('.slide-product')
	const valueWidth = wrapperWidth.length - 2
	const maxWidth = +wrapperWidth.slice(0, valueWidth) * Math.floor(slideProduct.length / 4)
	const target = event.target
	const check = target.dataset.arrow === 'prev'

	if (check) {
		if (offset === 0) {
			offset = maxWidth
		} else {
			offset -= +wrapperWidth.slice(0, valueWidth)
		}
	} else {
		if (offset === maxWidth) {
			offset = 0
		} else {
			offset += +wrapperWidth.slice(0, valueWidth)
		}
	}

	innerProduct.style.transform = `translateX(-${offset}px)`
}

nextProduct.addEventListener('click', slideChange)
prevProduct.addEventListener('click', slideChange)