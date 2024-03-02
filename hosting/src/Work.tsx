import { ReactNode, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useData } from "./firebase";
import { DocumentData } from 'firebase/firestore';

function Work(): ReactNode {
	const { company } = useParams();
	const { experienceData } = useData();
	const [companyData, setCompanyData] = useState<DocumentData>()

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
				<Link to="/experience">Experience</Link><p className="divider">/</p><p className="companyName">{companyData?.companyName}</p>
			</nav>
		</header>
		<section className={`workPage ${companyData ? "loaded" : "loading"}`}>
			<div className="companyLogo">
				<img src={`/${companyData?.company}.png`} className="companyLogo"/>
			</div>
			<section className="workHeader">
				<p className="jobRole">{companyData?.jobTitle}</p>
				<p className="companyName"><p>at</p>{companyData?.companyName}</p>
			</section>
			<section id="jobDescription" className="jobDescription">
				<h2 className="sectionHeader">Job Description</h2>
				<p className="jobDescription">{companyData?.jobDescription}</p>
			</section>
			<section id="jobAchievements" className="jobAchievements">
				<h2 className="sectionHeader">Job Achievements</h2>
				<ul className="jobAchievements">
				{companyData?.jobAchievements?.map((achievement: string, index: number) => {
					return <li key={`achievement_${index}`}>{achievement}</li>
				})}
				</ul>
			</section>
		</section>
		</>
	)
}

export default Work
