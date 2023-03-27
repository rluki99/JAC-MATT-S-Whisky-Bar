const navBtn = document.querySelector('.hamburger')
const menu = document.querySelector('.nav__links')
const body = document.querySelector('body')
const navLinks = document.querySelectorAll('.nav__link')
const footerYear = document.querySelector('.year')
const navWrapper = document.querySelector('.wrapper-nav')
const html = document.documentElement
let lastScrollY = window.scrollY
let lastWidthX = window.innerWidth
//form validation
const names = document.querySelector('#name')
const mail = document.querySelector('#mail')
const phone = document.querySelector('#phone')
const eventData = document.querySelector('#data')
const eventPlace = document.querySelector('#place')
const msg = document.querySelector('#msg')
const sendBtn = document.querySelector('.contact__form-btn')
const form = document.querySelector('.contact__form')
const honeypot = document.querySelector('#honeypot')

const hamburgerActive = () => {
	navBtn.classList.toggle('is-active')
	menu.classList.toggle('nav__links--active')
	body.classList.toggle('no-scroll-mobile')
	navLinks.forEach((link) => {
		link.addEventListener('click', () => {
			navBtn.classList.remove('is-active')
			menu.classList.remove('nav__links--active')
			body.classList.remove('no-scroll-mobile')
		})
	})
}

//form validation

const checkName = () => {
	const re = /^[\s\p{L}]+$/u

	if (re.test(names.value)) {
		names.classList.remove('form-input--error')
	} else {
		names.classList.add('form-input--error')
	}
}

const checkMail = () => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,10}))$/

	if (re.test(mail.value)) {
		mail.classList.remove('form-input--error')
	} else {
		mail.classList.add('form-input--error')
	}
}

const checkPhone = () => {
	if (phone.value === '') {
		phone.classList.remove('form-input--error')
		return
	}

	const re = /^\+?[0-9]{9,11}$/

	if (re.test(phone.value)) {
		phone.classList.remove('form-input--error')
	} else {
		phone.classList.add('form-input--error')
	}
}

const checkDate = () => {
	const today = new Date()
	const maxDate = new Date('2100-12-31')

	if (!eventData.value) {
		eventData.classList.add('form-input--error')
		return
	}

	const selectedDate = new Date(eventData.value)

	if (selectedDate < today || selectedDate > maxDate) {
		eventData.classList.add('form-input--error')
	} else {
		eventData.classList.remove('form-input--error')
	}
}

const checkPlace = () => {
	if (eventPlace.value) {
		eventPlace.classList.remove('form-input--error')
	} else {
		eventPlace.classList.add('form-input--error')
	}
}

const checkMsg = () => {
	if (msg.value) {
		msg.classList.remove('form-input--error')
	} else {
		msg.classList.add('form-input--error')
	}
}

//bot spam trap
const checkHoneypot = () => {
	if (honeypot.value) {
		return false
	}
	return true
}

const resetForm = () => {
	names.value = ''
	mail.value = ''
	phone.value = ''
	eventData.value = ''
	eventPlace.value = ''
	msg.value = ''
}

//get currentyear in the footer
const currentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}

navBtn.addEventListener('click', hamburgerActive)
currentYear()

//nav background and collapse expand menu depending on scroll
window.addEventListener('scroll', () => {
	//add black background to the nav after scroll
	if (window.scrollY > 0) {
		navWrapper.classList.add('wrapper-nav--black')
	} else {
		navWrapper.classList.remove('wrapper-nav--black')
	}

	//collapse expand menu depending on scroll
	//first if is for iphone safari issue
	if (lastScrollY <= 0 || window.scrollY == 0) {
		navWrapper.classList.remove('wrapper-nav--hidden')
	} else if (lastScrollY < window.scrollY) {
		navWrapper.classList.add('wrapper-nav--hidden')
	} else {
		navWrapper.classList.remove('wrapper-nav--hidden')
	}

	lastScrollY = window.scrollY
})

//direction-dependent scroll-padding on navigation
navLinks.forEach((link) => {
	link.addEventListener('click', function (event) {
		event.preventDefault()
		const target = this.getAttribute('href')
		const targetElement = document.querySelector(target)
		const targetPosition = targetElement.offsetTop
		const currentPosition = window.scrollY
		const direction = targetPosition < currentPosition ? 'up' : 'down'

		if (direction === 'down') {
			html.style.scrollPaddingTop = '0'
		} else {
			html.style.scrollPaddingTop = navWrapper.offsetHeight + 'px'
		}

		document.querySelector(target).scrollIntoView({ behavior: 'smooth' })
	})
})

//remove open mobile nav after dekstop breakpoint
window.addEventListener('resize', () => {
	lastWidthX = window.innerWidth

	if (lastWidthX >= 992) {
		navBtn.classList.remove('is-active')
		menu.classList.remove('nav__links--active')
		body.classList.remove('no-scroll-mobile')
	}
})

//form validation send if no errors
sendBtn.addEventListener('click', (e) => {
	e.preventDefault()

	checkName()
	checkMail()
	checkPhone()
	checkDate()
	checkPlace()
	checkMsg()

	const isNameValid = !names.classList.contains('form-input--error')
	const isMailValid = !mail.classList.contains('form-input--error')
	const isPhoneValid = !phone.classList.contains('form-input--error')
	const isDateValid = !eventData.classList.contains('form-input--error')
	const isPlaceValid = !eventPlace.classList.contains('form-input--error')
	const isMsgValid = !msg.classList.contains('form-input--error')
	const isHoneypotEmpty = checkHoneypot()

	if (isNameValid && isMailValid && isPhoneValid && isDateValid && isPlaceValid && isMsgValid && isHoneypotEmpty) {
		HTMLFormElement.prototype.submit.call(form)
		resetForm()
	}
})
