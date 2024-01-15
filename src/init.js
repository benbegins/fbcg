import "./styles/main.css"

import { createApp } from "petite-vue"
import { Menu } from "./js/components/Menu"
import { Slider } from "./js/components/Slider"
import { Parallax } from "./js/components/Parallax"
import { Documentations } from "./js/components/Documentations"
import { Contact } from "./js/components/Contact"

createApp({
	$delimiters: ["[[", "]]"],
	Menu,
	Slider,
	Parallax,
	Documentations,
	Contact,
}).mount()
