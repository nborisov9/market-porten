import {collData, arrivalData, brandsData, prodocutData} from '../db/db'


export const collTemplate = collData.map(({title, price, id}) => {
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

export const arrivalTemplate = arrivalData.map(({title, price, id}) => {
	return `
		<div class="arrival__column col-arrival">
			<a href="" class="col-arrival__image">
				<img src="assets/arrival-${id}.jpg" alt="">
			</a>
			<div class="col-arrival__body body-arrival">
				<a href="" class="body-arrival__title">${title}</a>
				<div class="body-arrival__price">${price} <span>RUB</span></div>
			</div>
		</div>
	`
})

export const brandsTemplate = brandsData.map(({id}) => {
	return `
		<a href="" class="brands__image">
			<img src="assets/brand-${id}.png" alt="">
		</a>
	`
})

export const product = (title, price, id) => {
	return `
		<div class="slider-product__slide slide-product">
			<a href="" class="slide-product__image">
				<img src="assets/product-${id}.png" alt="">
			</a>
			<a href="" class="slide-product__title">
				${title}
			</a>
			<div class="slide-product__price">
				${price} <span>RUB</span>
			</div>
		</div>
	`
}

export const productTemplate = prodocutData.map(({title, price, id}) => {
	return product(title, price, id)
})