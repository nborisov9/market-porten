import {ibg, html, importAll} from './utils/utils'
import {collData, arrivalData, brandsData, prodocutData} from './db/db'

import './#scss/style.scss'
// ======================================

importAll(require.context('./assets', false, /\.(png|jpe?g|svg|gif)$/))
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
// =========

const sliderContainer = document.querySelector('.slider-product__inner')
const collContainer = document.querySelector('.prod__body')
const arrivalContainer = document.querySelector('.arrival__row')
const brandsContainer = document.querySelector('.brands__row')


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

const productTemplate = prodocutData.map(({title, price, id}) => {
	return `
		<div class="slider-product__slide slide-product">
			<a href="" class="slide-product__image">
				<img src="assets/arrival-${id}.jpg" alt="">
			</a>
			<a href="" class="slide-product__title">
				${title}
			</a>
			<div class="slide-product__price">
				${price}
			</div>
		</div>
	`
})

html(sliderContainer, productTemplate.join(''))
html(collContainer, collTemplate.join(''))
html(arrivalContainer, arrivalTemplate.join(''))
html(brandsContainer, brandsTemplate.join(''))


// slider
const slideProduct = document.querySelectorAll('.slide-product')
const prevProduct = document.querySelector('.counter-slider__prev')
const nextProduct = document.querySelector('.counter-slider__next')
const wrapperProduct = document.querySelector('.slider-product__wrapper')
const innerProduct = document.querySelector('.slider-product__inner')
const wrapperWidth = window.getComputedStyle(wrapperProduct).width

let offset = 0
const valueWidth = wrapperWidth.length - 2
const maxWidth = +wrapperWidth.slice(0, valueWidth) * Math.floor(slideProduct.length / 4)

nextProduct.addEventListener('click', () => {
	if (offset === maxWidth) {
		offset = 0
	} else {
		offset += +wrapperWidth.slice(0, valueWidth)
	}
	innerProduct.style.transform = `translateX(-${offset}px)`
})

prevProduct.addEventListener('click', () => {
	if (offset === 0) {
		offset = maxWidth
	} else {
		offset -= +wrapperWidth.slice(0, valueWidth)
	}
	innerProduct.style.transform = `translateX(-${offset}px)`
})



// ===========
function sortPriceAsc(arr) {
	const data = JSON.parse(JSON.stringify(arr))
	data.sort((a, b) => a.price > b.price ? 1 : -1)
	console.log(data);
}

function sortPriceDesc(arr) {
	const data = JSON.parse(JSON.stringify(arr))
	data.sort((a, b) => a.price > b.price ? -1 : 1)
	console.log(data);
}

sortPriceAsc(prodocutData)
sortPriceDesc(prodocutData)

