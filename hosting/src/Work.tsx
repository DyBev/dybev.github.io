import { ReactNode, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useData } from "./firebase";
import { DocumentData } from 'firebase/firestore';

function Work(): ReactNode {
	const { company } = useParams();
	const { experienceData } = useData();
	const [companyData, setCompanyData] = useState<DocumentData>()
	const testString = '- hello\n- broken line\n- another one'

	useEffect(() => {
		experienceData?.map((doc) => {
			if (company == doc.data().company) {
				setCompanyData(doc.data());
			}
		});
	},[experienceData])

	return(
		<>
		<header className='global'>
			<Link to="/"><h1>Dylan</h1></Link>
			<nav>
				<Link to="/#experience">Experience</Link>
			</nav>
		</header>
		<section className='workPage'>
			{companyData?.companyName}
			<pre>{testString}</pre>
		</section>
		</>
	)
}

export default Work
