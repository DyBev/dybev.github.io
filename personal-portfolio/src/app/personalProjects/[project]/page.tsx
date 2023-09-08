"use client"
import { useParams } from 'next/navigation'

export default function Page({ params }: { params: { slug: string } }) {
	const data = useParams();
	console.log(data);
	return <div>My Post: {params.project}</div>
}
