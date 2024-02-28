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
			<span className="big-text">Welcome</span>
			<p>I am a software developer currently working in web environments</p>
			<p>Looking for my next problem to solve</p>
			<p className="footer">See more</p>
			<ChevronDown className="footer" size={32}/>
		</section>
		</>
	)
}

export default App
