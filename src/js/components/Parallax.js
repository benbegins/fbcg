import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function Parallax() {
	return {
		parallaxActive: false,

		initParallax() {
			const parallaxElements = document.querySelectorAll("[data-parallax]")
			if (!parallaxElements.length) return

			if (window.innerWidth >= 1024) {
				this.parallaxActive = true
				parallaxElements.forEach((element) => {
					this.animateParallax(element)
				})
			}

			window.addEventListener("resize", () => {
				if (window.innerWidth >= 1024 && !this.parallaxActive) {
					this.parallaxActive = true
					parallaxElements.forEach((element) => {
						this.animateParallax(element)
					})
				} else if (window.innerWidth < 1024 && this.parallaxActive) {
					this.parallaxActive = false
					// Remove scrolltrigger animations and reset elements position
					parallaxElements.forEach((element) => {
						gsap.killTweensOf(element)
						gsap.set(element, { clearProps: "all" })
					})
				}
			})
		},

		animateParallax(element) {
			// Set speed
			const speed = element.dataset.speed ? parseFloat(element.dataset.speed) : 5
			// Check if element has img child
			const img = element.querySelector("img")
			let parallaxElement
			img ? (parallaxElement = img) : (parallaxElement = element)
			// Set scale
			gsap.set(parallaxElement, {
				scale: element.dataset.scale ? parseFloat(element.dataset.scale) : 1,
			})
			// If element is on header
			if (element.dataset.position == "top") {
				gsap.set(parallaxElement, { scale: 1 })
				gsap.to(parallaxElement, {
					y: `${speed * (window.innerHeight / 100)}`,
					ease: "none",
					scrollTrigger: {
						trigger: element.parentElement,
						scrub: true,
						start: "top top",
						end: "bottom top",
					},
				})
			} else {
				gsap.fromTo(
					parallaxElement,
					{
						y: `-${speed * (window.innerHeight / 100)}`,
					},
					{
						y: `${speed * (window.innerHeight / 100)}`,
						ease: "none",
						scrollTrigger: {
							trigger: element.parentElement,
							scrub: true,
							start: "top bottom",
							end: "bottom top",
						},
					}
				)
			}
		},
	}
}

export { Parallax }
