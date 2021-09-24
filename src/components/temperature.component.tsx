import React from "react";
import AnimatedNumber from "animated-number-react";
import { ITemperature } from "../types";


interface ITemperatureProps {
	data: ITemperature & { actualTemperature : string }
}


const Temperature = (props: ITemperatureProps) => {
	const { actualTemperature, maxTemperature, minTemperature } = props.data;
	
	const formatValue = (value: number) => value.toFixed(0);
	
	return (<div className="temperature">
		<div className="temperature__deg">
			<AnimatedNumber
				value={ parseInt(actualTemperature) }
				formatValue={ formatValue }
			/>
		</div>
		<div className="temperature__wrap">
			<div className="temperature__mesure">&deg;C</div>
			
			<div className="temperature__box">
				<div className="temperature__max">
					<span className="temperature__mark">{ '\u2191' }</span>
					<p className="temperature__text">
						<AnimatedNumber
							value={ parseInt(maxTemperature as any as string) }
							formatValue={ formatValue }
						/>
					</p>
					<span className="temperature__unit">&deg;C</span>
				</div>
				<div className="temperature__min">
					<span className="temperature__mark">{ '\u2193' }</span>
					<p className="temperature__text">
						<AnimatedNumber
							value={ parseInt(minTemperature as any as string) }
							formatValue={ formatValue }
						/>
					</p>
					<span className="temperature__unit">&deg;C</span>
				</div>
			</div>
		
		</div>
	</div>);
}


export default Temperature;