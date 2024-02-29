import { ArrowRight } from "@carbon/icons-react";

export function Tile({children, img, title, job, start, end, current}) {
	return(
		<div className="card">
			<img src={img}/>
			<p className="subtitle">{job}</p>
			<h3 className="title">{title}</h3>
			<div className="dates">
				{ current && <p className="body">current</p> }
				{ !current && <p className="body">{end}</p> }
				<p className="body">{start}</p>
			</div>
			<ArrowRight size={20} className="arrow"/>
		</div>
	)
}

export function TileSkelenton() {
	return(
		<div className="card skelenton">
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
