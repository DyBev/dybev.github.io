import { ChevronDown } from "@carbon/icons-react"

function App() {
	return (
		<>
		<header className='global'>
			<h1>Dylan</h1>
			<nav>
				<a>Experience</a>
				<a>Projects</a>
				<a>Contact</a>
			</nav>
		</header>
		<section className="welcome">
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
		</>
	)
}

export default App
