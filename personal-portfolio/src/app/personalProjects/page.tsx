'use client'
import { ReactNode } from "react";
import Link from "../../../node_modules/next/link.js";
import "./page.scss"

const projects: { [index: string] : any; } = {
	foodieApp: {title: "foodieApp"},
	kerbalSpaceProgram: {title: "Kerbal Space Program"},
	javaScriptSnake: {title: "JavaScript Snake"},
}

export default function Page() {
	function toggleDark() {
		document.getElementById("main-body-id")?.classList.toggle("dark");
		document.getElementById("slider-track-id")?.classList.toggle("dark");
		document.getElementById("slider-button-id")?.classList.toggle("dark");
		document.getElementById("main-title-id")?.classList.toggle("dark");
		document.getElementById("navigation-menu-id")?.classList.toggle("dark");
		document.getElementById("background")?.classList.toggle("dark");
	}
	
	function SwitchScene() {
		toggleDark();
	}
	
	window.addEventListener('mousemove', (event) => {
		let mousePos = { x: event.clientX, y: event.clientY };
		let root = document.querySelector(':root') as HTMLElement;
		root.style.setProperty('--mouseX', `${mousePos.x}px`)
		root.style.setProperty('--mouseY', `${mousePos.y}px`)
	});
	
	return (
		<div id="background" className="background dark">
			<div id="main-body-id" className="mainBody dark">
				<button id="slider-track-id" className="sliderTrack dark" onClick={SwitchScene}>
					<div id="slider-button-id" className="sliderButton dark"/>
				</button>
				<div className="wrapperFlex">
				{ Object.keys(projects).map((project: string, i: number): ReactNode =>
					<Link key={ `${ i }` } href={ `personalProjects/${ project }` } className="projectCard" >
						<h3>{ projects[project].title }</h3>
					</Link>
				) }
				</div>
			</div>
			<div id="backgroundBlur" className="backgroundBlur"></div>
		</div>
	)
}
