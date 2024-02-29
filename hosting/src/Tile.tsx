import { ArrowRight } from "@carbon/icons-react";
import { ReactNode } from "react";

type Props = {
	children?: ReactNode,
	img?: string,
	title: string,
	job: string,
	start: string,
	end?: string,
	current?: boolean
}


export function Tile({children, img, title, job, start, end, current}: Props) {
	return(
		<div className="tile">
			{img != undefined ? <img src={img}/> : <div className='img'/>}
			<p className="subtitle">{job}</p>
			<h3 className="title">{title}</h3>
			<div className="dates">
				{ current && <p className="body">current</p> }
				{ !current && <p className="body">{end}</p> }
				<p className="body">{start}</p>
			</div>
			{children && children}
			{//<ArrowRight size={20} className="arrow"/> 
			}
		</div>
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
		</div>
	)
}
