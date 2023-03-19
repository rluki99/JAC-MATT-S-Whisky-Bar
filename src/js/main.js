const navBtn = document.querySelector('.hamburger')
const menu = document.querySelector('.nav__links')
const body = document.querySelector('body')
const navLinks = document.querySelectorAll('.nav__link')
const footerYear = document.querySelector('.year')
const navWrapper = document.querySelector('.wrapper-nav')
const html = document.documentElement
// const allATags = document.querySelectorAll('a')
let lastScrollY = window.scrollY
let lastWidthX = window.innerWidth

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
navLinks.forEach(link => {
	link.addEventListener('click', function(event) {
		event.preventDefault();
		const target = this.getAttribute('href');
		const targetElement = document.querySelector(target);
		const targetPosition = targetElement.offsetTop;
		const currentPosition = window.scrollY;
		const direction = targetPosition < currentPosition ? 'up' : 'down';
	
		if (direction === 'down') {
		  html.style.scrollPaddingTop = '0';
		} else {
		  html.style.scrollPaddingTop = navWrapper.offsetHeight + 'px';
		}
	
		document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
	  });
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
