import "./styles/main.css"

import { createApp } from "petite-vue"
import { Menu } from "./js/components/Menu"
import { Slider } from "./js/components/Slider"

createApp({
	$delimiters: ["[[", "]]"],
	Menu,
	Slider,
}).mount()
