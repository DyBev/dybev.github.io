import { ArrowRight } from "@carbon/icons-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
	children?: ReactNode,
	img?: string,
	title: string,
	job: string,
	start: string,
	end?: string,
	link?: string,
	order?: number
	elementkey?: string
}


export function Tile({children, img, title, job, start, end, link, order, elementkey}: Props) {
	return(
		<Link className="tile" to={link} style={{order: order}} key={elementkey}>
			{img != undefined ? <img src={img}/> : <div className='img'/>}
			<p className="subtitle">{job}</p>
			<h3 className="title">{title}</h3>
			<div className="dates">
				<p className="body">{end}</p>
				<p className="body">{start}</p>
			</div>
			{children && children}
			{link && <ArrowRight size={20} className="arrow"/> }
			{!link && <div className="arrow" /> }
		</Link>
	)
}

export function TileSkelenton() {
	return(
		<div className="tile skelenton">
			<div className="img" />
			<p className="subtitle"></p>
			<h3 className="title"></h3>
			<div className="dates">
				<p className="body"></p>
				<p className="body"></p>
			</div>
			<div className="arrow" />
		</div>
	)
}
