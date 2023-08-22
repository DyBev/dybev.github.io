import React, { useState } from "react";
import { Link } from "react-router-dom";

import './home-screen.css'

export function HomeScreen() {
	const [themeCurrent, updateTheme] = useState("light");

	function toggleDark() {
		document.getElementById("main-body-id").classList.toggle("dark");
		document.getElementById("slider-track-id").classList.toggle("dark");
		document.getElementById("slider-button-id").classList.toggle("dark");
		document.getElementById("main-title-id").classList.toggle("dark");
		document.getElementById("navigation-menu-id").classList.toggle("dark");
	}

	function SwitchScene() {
		if (themeCurrent === "light") {
			updateTheme("dark");
		}
		if (themeCurrent === "dark") {
			updateTheme("light");
		}
		toggleDark();
	}

	return (
		<body id="main-body-id" class="main-body dark">
			{/* <div id="accessability-icon-id" class="accessability-icon">
				<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
					<path d="M256,112a56,56,0,1,1,56-56A56.06,56.06,0,0,1,256,112Z" />
					<path d="M432,112.8l-.45.12h0l-.42.13c-1,.28-2,.58-3,.89-18.61,5.46-108.93,30.92-172.56,30.92-59.13,0-141.28-22-167.56-29.47a73.79,73.79,0,0,0-8-2.58c-19-5-32,14.3-32,31.94,0,17.47,15.7,25.79,31.55,31.76v.28l95.22,29.74c9.73,3.73,12.33,7.54,13.6,10.84,4.13,10.59.83,31.56-.34,38.88l-5.8,45L150.05,477.44q-.15.72-.27,1.47l-.23,1.27h0c-2.32,16.15,9.54,31.82,32,31.82,19.6,0,28.25-13.53,32-31.94h0s28-157.57,42-157.57,42.84,157.57,42.84,157.57h0c3.75,18.41,12.4,31.94,32,31.94,22.52,0,34.38-15.74,32-31.94-.21-1.38-.46-2.74-.76-4.06L329,301.27l-5.79-45c-4.19-26.21-.82-34.87.32-36.9a1.09,1.09,0,0,0,.08-.15c1.08-2,6-6.48,17.48-10.79l89.28-31.21a16.9,16.9,0,0,0,1.62-.52c16-6,32-14.3,32-31.93S451,107.81,432,112.8Z" />
				</svg>
			</div> */}
			<button id="slider-track-id" class="slider-track dark" onClick={() => {SwitchScene()}}>
				<div id="slider-button-id" class="slider-button dark"/>
			</button>
			<div id="wrapper-flex-id" class="wrapper-flex">
				<div id="main-title-id" class="main-title dark">
					<h1>Dylan Bevan</h1>
					<h3>Fresh Developer</h3>
				</div>
				<nav id="navigation-menu-id" class="navigation-menu dark">
					<a href="PersonalProjects">
						<p>{"Personal Projects ->"}</p>
					</a>
					<a href="Work History">
						<p>{"Work History ->"}</p>
					</a>
					<a href="Social">
						<p>{"Socials ->"}</p>
					</a>
					<a href="Contact">
						<p>{"Contact ->"}</p>
					</a>
				</nav>
			</div>
		</body>
	)
}
