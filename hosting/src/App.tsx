import { ChevronDown } from "@carbon/icons-react";
import { Tile, TileSkelenton } from './Tile.tsx';
import { randomGradient } from "./gradient.ts";
import { ReactNode, useEffect } from "react";
import { DocumentData } from "firebase/firestore";
import { useData } from "./firebase.tsx";
import { Link, useParams, useNavigate } from "react-router-dom";

function App(): ReactNode {
	const { experienceData } = useData();
	const { "*": splat } = useParams();
	const navigate = useNavigate();

	const navigateTo = (target: string, behavior: ScrollBehavior = "smooth") => {
		document.getElementById(target) ? document.getElementById(target)?.scrollIntoView(
			{behavior: behavior, block: "end", inline: "nearest"}
		) : navigate("/");
	}



	useEffect(() => {
		if (splat != '' && splat != undefined) {
			navigateTo(splat, "instant");
		}

		const gradientInterval = setInterval(() => randomGradient(), 1000/60);
		return () => clearInterval(gradientInterval);
	},[]);

	return (
		<>
		<header className='global'>
			<Link to="welcome" onClick={() => navigateTo("welcome")}><h1>Dylan</h1></Link>
			<nav>
				<a>Experience</a>
				<a>Projects</a>
				<a>Contact</a>
				<a href="#experience">Experience</a>
				<Link to="experience" onClick={() => navigateTo("experience")}>Experience</Link>
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
				<Tile title={'The Future'} job={'unknown'} start={'unknown'} order={99}/>
				{ experienceData && experienceData.map((doc: DocumentData) => {
						return(
							<Tile
								key={`${doc.data().order}_${doc.data().company}`}
								elementkey={`${doc.data().order}_${doc.data().company}`}
								link={`/work/${doc.data().company}`}
								img={`/${doc.data().company}.png`} 
								title={doc.data().companyName} 
								job={doc.data().jobTitle} 
								start={doc.data().start} 
								end={doc.data().end}
								order={doc.data().order}
							/>
						)
					})
				}
				{ !experienceData && <TileSkelenton /> }
			</div>
		</section>
		</>
	)
}

export default App
