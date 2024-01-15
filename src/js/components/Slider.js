import Swiper from "swiper"
import { Navigation } from "swiper/modules"
import "swiper/css"

function Slider(props) {
	return {
		slider: null,
		sliderContainer: null,
		slidesOnDesktop: props.slidesOnDesktop || 4.2,

		initSlider(el) {
			this.sliderContainer = el.querySelector(".swiper")

			this.slider = new Swiper(this.sliderContainer, {
				modules: [Navigation],
				navigation: {
					nextEl: el.querySelector(".button-next"),
					prevEl: el.querySelector(".button-prev"),
				},
				speed: 450,
				slidesPerView: 1.2,
				spaceBetween: 24,
				breakpoints: {
					640: {
						slidesPerView: 2.2,
						spaceBetween: 24,
					},
					1024: {
						slidesPerView: this.slidesOnDesktop,
						spaceBetween: 24,
					},
				},
			})
		},
	}
}

export { Slider }
