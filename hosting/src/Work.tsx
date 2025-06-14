import { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from './firebase';
import { z } from 'zod/v4';

const CompanyData = z.object({
  company: z.string().default(''),
  jobTitle: z.string().default(''),
  image: z
    .object({
      base64: z.string().default(''),
    })
    .default({
      base64: '',
    }),
  companyName: z.string().default(''),
  end: z.string().default(''),
  start: z.string().default(''),
  jobAchievements: z.array(z.string().default('')).default([]),
  jobDescription: z.string().default(''),
  order: z.number().default(0),
});

type CompanyData = z.infer<typeof CompanyData>;

function Work(): ReactNode {
  const { company } = useParams();
  const { experienceData } = useData();
  let companyData: CompanyData = CompanyData.parse({});

  if (!experienceData) {
    return;
  }

  experienceData.map((doc) => {
    if (company == doc.data().company) {
      companyData = CompanyData.parse(doc.data());
    }
  });

  return (
    <>
      <header className="global">
        <Link to="/">
          <h1>Dylan</h1>
        </Link>
        <nav>
          <Link to="/experience">Experience</Link>
          <p className="divider">/</p>
          <p className="companyName">{companyData.companyName}</p>
        </nav>
      </header>
      <section className={`workPage`}>
        {companyData.company && (
          <div className="companyLogo">
            <img
              src={`data:image/png;base64,${companyData.image.base64}`}
              className="companyLogo"
            />
          </div>
        )}
        {companyData.jobTitle && (
          <section className="workHeader">
            <p className="jobRole">{companyData.jobTitle}</p>
            <p className="companyName">
              <p>at</p>
              {companyData.companyName}
            </p>
          </section>
        )}
        {companyData.jobDescription && (
          <section id="jobDescription" className="jobDescription">
            <h2 className="sectionHeader">Job Description</h2>
            <p className="jobDescription">{companyData.jobDescription}</p>
          </section>
        )}
        {companyData.jobAchievements.length > 0 && (
          <section id="jobAchievements" className="jobAchievements">
            <h2 className="sectionHeader">Job Achievements</h2>
            <ul className="jobAchievements">
              {companyData.jobAchievements.map(
                (achievement: string, index: number) => {
                  return <li key={`achievement_${index}`}>{achievement}</li>;
                },
              )}
            </ul>
          </section>
        )}
      </section>
    </>
  );
}

export default Work;
