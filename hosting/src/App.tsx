import { ChevronDown } from "@carbon/icons-react";
import { Tile, TileSkelenton } from './Tile.tsx';
import './gradient.js';
import { experience } from './firebase.tsx';
import { ReactNode, useState } from "react";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { randomGradient } from "./gradient.ts";

function App(): ReactNode {
	const [experienceData, setExperienceData] = useState<QuerySnapshot<DocumentData, DocumentData>>();

	useEffect(() => {
		const gradientInterval = setInterval(() => randomGradient(), 1000/60);

		return clearInterval(gradientInterval);
	},[]);

	return (
		<>
		<header className='global'>
			<a href="#welcome"><h1>Dylan</h1></a>
			<nav>
				<a>Experience</a>
				<a>Projects</a>
				<a>Contact</a>
				<a href="#experience">Experience</a>
			</nav>
		</header>
		<section className="welcome" id='welcome'>
			<p className="bigText">Welcome</p>
			<p>I am a software developer currently working in web environments</p>
			<p>Looking for my next problem to solve</p>
			<section className="languageIcons">
				<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain-wordmark.svg" />
				<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain-wordmark.svg" />
				<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg" />
				<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" />
				<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-plain-wordmark.svg" />
				<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-plain.svg" />
				<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg" />
				<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain-wordmark.svg" />
				<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-plain.svg" style={{filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(2%) hue-rotate(343deg) brightness(113%) contrast(101%)'}}/>
			</section>
			<p className="footer">See more</p>
			<ChevronDown className="footer" size={32}/>
		</section>
		<section className="experience" id="experience">
			<div className="tileContainer">
				<Tile title={'The Future'} job={'unknown'} start={'unknown'} current={false}/>
				{ experienceData && <Tile img={'https://mindease.io/wp-content/themes/mindease/images/logo.png'} title={'Mind Ease'} job={'Developer'} start={'Sep 2022'} current={true}/> }
				{ !experienceData && <TileSkelenton /> }
			</div>
		</section>
		</>
	)
}

export default App
