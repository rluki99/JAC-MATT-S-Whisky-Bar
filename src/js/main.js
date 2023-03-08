const navBtn = document.querySelector('.hamburger')
const menu = document.querySelector('.nav__links')
const body = document.querySelector('body')
const mobileLinks = document.querySelectorAll('.nav__link')
const footerYear = document.querySelector('.year')
const nav = document.querySelector('.nav')
let lastScrollY = window.scrollY

const hamburgerActive = () => {
	navBtn.classList.toggle('is-active')
	menu.classList.toggle('nav__links--active')
	body.classList.toggle('no-scroll-mobile')
	mobileLinks.forEach((link) => {
		link.addEventListener('click', () => {
			navBtn.classList.remove('is-active')
			menu.classList.remove('nav__links--active')
			body.classList.remove('no-scroll-mobile')
		})
	})
}

const currentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

navBtn.addEventListener('click', hamburgerActive)
currentYear()

window.addEventListener('scroll', () => {
	if (lastScrollY < window.scrollY) {
		nav.classList.add('nav--hidden')
	} else {
		nav.classList.remove('nav--hidden')
	}

	lastScrollY = window.scrollY
})
