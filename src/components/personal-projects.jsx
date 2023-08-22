import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "./database.js";

const personalProjectData = collection(db, "/PersonalProjects");

var docSnap;

async function data() {
	docSnap = await getDocs(personalProjectData);
	docSnap.forEach((doc) => {
		// doc.data() is never undefined for query doc snapshots
		console.log(doc.id, " => ", doc.data());
	});
}

export function PersonalProjects() {
	data();
	return (<div>Hello World</div>)
}
