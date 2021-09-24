import React from "react";
import { IGeo } from "../types";


interface IGeoProps {
	data: IGeo
}

const Geo = (props: IGeoProps) => {
	const { cityName, date } = props.data;
	
	return (<div className="geo">
		<div className="geo__location">
			{ cityName }
		</div>
		<div className="geo__date">{ date }</div>
	</div>);
}


export default Geo;
