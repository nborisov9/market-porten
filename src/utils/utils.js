const body = document.querySelector('body')

export function ibg() {
	const ibg = document.querySelectorAll('.ibg')
		for (let i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img')) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')'
			}
		}
	}


export function html(nodeList, html) {
	nodeList.insertAdjacentHTML('beforeend', html)
}


export function importAll(r) {
	const images = {};
	r.keys().map((item) => {
		images[item.replace('./', '')] = r(item);
});
	return images;
 }


 export const disableScroll = () => {
	body.style.cssText = `
		position: relative;
		overflow: hidden;
		height: 100vh;
	`
}

export const enableScroll = () => {
	body.style.cssText = ``
}