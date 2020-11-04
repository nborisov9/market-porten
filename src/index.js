import {ibg, html, importAll, disableScroll, enableScroll} from './utils/utils'
import {arrivalTemplate, brandsTemplate, product, productTemplate} from './templates/templates'
import {prodocutData, collData} from './db/db'

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
const collBody = document.querySelector('.prod__body')
const close = document.querySelector('.close')
const cart = document.querySelector('.icon__basket')
const modalCart = document.querySelector('.modal')
const productMenu = document.querySelector('.slider-product')
const modalBody = document.querySelector('.modal-body')
const modalPriceTag = document.querySelector('.modal-pricetag')
const buttonClearCart = document.querySelector('.clear-cart')

const cartProd = []


html(sliderContainer, productTemplate.join(''))
html(arrivalContainer, arrivalTemplate.join(''))
html(brandsContainer, brandsTemplate.join(''))
// html(collContainer, collTemplate.join(''))

const promise = new Promise(resolve => {
	collBody.textContent = 'Loading...'
	collBody.style.fontSize = '55px'
	collBody.style.color = 'rgb(184, 255, 240)'
	collBody.style.fontFamily = 'Kanit'
	setTimeout(() => {
		resolve(collData)
	}, 4500)
})

promise.then(data => {
	const collTemplate = data.map(({title, price, id}) => {
		return `
		<div class="prod__item item-prod">
			<div class="item-prod__img">
				<a href="">
					<img src="assets/collection-${id}.jpg" alt="">
				</a>
			</div>
			<a href="" class="item-prod__title">${title}</a>
			<div class="item-prod__price">${price} <span>RUB</span></div>
		</div>
	`
	})
	collBody.textContent = ''
	collBody.style.fontSize = ''
	collBody.style.color = ''
	collBody.style.fontFamily = ''
	html(collContainer, collTemplate.join(''))
})




const sortPriceAsc = () => {
	arrowAsc.style.color = 'rgb(255, 97, 97)'
	arrowDesc.style.color = ''
	const data = JSON.parse(JSON.stringify(prodocutData))
	data.sort((a, b) => a.price > b.price ? 1 : -1)
	const dataTemplate = data.map(({title, price, id, key}) => {
		return product(title, price, id, key)
	})

	sliderContainer.textContent = ''
	html(sliderContainer, dataTemplate.join(''))
}

const sortPriceDesc = () => {
	arrowDesc.style.color = 'rgb(255, 97, 97)'
	arrowAsc.style.color = ''
	const data = JSON.parse(JSON.stringify(prodocutData))
	data.sort((a, b) => a.price > b.price ? -1 : 1)
	const dataTemplate = data.map(({title, price, id, key}) => {
		return product(title, price, id, key)
	})

	sliderContainer.textContent = ''
	html(sliderContainer, dataTemplate.join(''))
}

arrowAsc.addEventListener('click', sortPriceAsc)
arrowDesc.addEventListener('click', sortPriceDesc)



let offset = 0
const slideChange = event => {
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





// cart
const addToCard = event => {
	const target = event.target
	const buttonAddToCart = target.closest('.add-cart')
	if (buttonAddToCart) {
		const card = target.closest('.slide-product')
		const title = card.querySelector('.slide-product__title').textContent
		const price = card.querySelector('.slide-product__price').textContent
		const key = buttonAddToCart.dataset.key

		const products = cartProd.find(item => {
			return item.key === key
		})

		if (products) {
			products.count += 1
		} else {
			cartProd.push({
				key,
				title,
				price,
				count: 1
			})
		}
	}
}


const renderCart = () => {
	modalBody.textContent = ''
	cartProd.forEach(({key, title, price, count}) => {
		const itemCart = `
			<div class="food-row">
				<span class="food-name">${title}</span>
				<strong class="food-price">${price}</strong>
				<div class="food-counter">
					<button class="counter-button counter-minus" data-key="${key}">-</button>
					<span class="counter">${count}</span>
					<button class="counter-button counter-plus" data-key="${key}">+</button>
				</div>
			</div>
		`
		modalBody.insertAdjacentHTML('afterbegin', itemCart)
	})


	const totalPrice = cartProd.reduce((result, item) => {
		return result + (parseFloat(item.price)) * item.count
	}, 0)

	modalPriceTag.textContent = `${totalPrice} ₽`
}


const changeCount = event => {
	const target = event.target
	if (target.classList.contains('counter-button')) {
		const products = cartProd.find(({key}) => {
			return key === target.dataset.key
		})
		if (target.classList.contains('counter-minus')) {
			products.count--
			products.count === 0 ? cartProd.splice(cartProd.indexOf(products), 1) : ''
		}
		if (target.classList.contains('counter-plus')) {
			products.count++
		}
	}
	renderCart()
}


const toggleModal = event => {
	event.preventDefault()
	modalCart.classList.toggle('is-open')
	renderCart()

	if (modalCart.classList.contains('is-open')) {
		disableScroll()
	} else {
		enableScroll()
	}
}





buttonClearCart.addEventListener('click', () => {
	cartProd.length = 0
	renderCart()
 })

modalBody.addEventListener('click', changeCount)

productMenu.addEventListener('click', addToCard)

cart.addEventListener('click', toggleModal)

close.addEventListener('click', toggleModal)
modalCart.addEventListener('click', event => {
	if (event.target.classList.contains('is-open')) {
		modalCart.classList.toggle('is-open')
		if (modalCart.classList.contains('is-open')) {
			disableScroll()
		} else {
			enableScroll()
		}
	}
})

iconMenu.addEventListener('click', () => {
	iconMenu.classList.toggle('active')
	menuBody.classList.toggle('active')
	iconSocial.classList.toggle('active')
})

nextProduct.addEventListener('click', slideChange)
prevProduct.addEventListener('click', slideChange)

