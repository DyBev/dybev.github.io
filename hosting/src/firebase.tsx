import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import React, { ReactNode, useContext, useEffect, useState } from "react";

type Context = {
	loading: boolean
	experienceData?: QueryDocumentSnapshot<DocumentData, DocumentData>[] | undefined
	projectData?: QueryDocumentSnapshot<DocumentData, DocumentData>[] | undefined
}

const DataContext = React.createContext({loading: true} as Context)

export function useData() {
	return useContext(DataContext)
}

const firebaseConfig = {
	apiKey: "AIzaSyC9uXztMLP2coQ_d4ChhhUfYPYbKcEX5Fw",
	authDomain: "personal-portfolio-f0e74.firebaseapp.com",
	projectId: "personal-portfolio-f0e74",
	storageBucket: "personal-portfolio-f0e74.appspot.com",
	messagingSenderId: "531385584932",
	appId: "1:531385584932:web:34f3e13ec22618d7f8b7b1",
	measurementId: "G-9FL3S8X8GF"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function DataProvider({ children }: {children: ReactNode}): JSX.Element {
	const [experienceData, setExperienceData] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>();
	const [projectData, setProjectData] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>();
	const [loading, setLoading] = useState<boolean>(true);

	const projectRef = collection(db, "/PersonalProjects");
	const experienceRef = collection(db, "/WorkHistory");

	useEffect(() => {
		getDocs(experienceRef).then((doc) => setExperienceData(doc.docs));
		getDocs(projectRef).then((doc) => setProjectData(doc.docs));
	},[]);

	useEffect(() => {
		if (experienceData != undefined && projectData != undefined) {
			setLoading(false);
		}
	},[experienceData, projectData]);


	const value = {
		loading,
		experienceData,
		projectData
	}

	return(
		<DataContext.Provider value={value}>
			{children}
		</DataContext.Provider>
	)
}
