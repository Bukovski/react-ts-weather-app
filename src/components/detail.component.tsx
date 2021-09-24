import React from "react";
import AnimatedNumber from "animated-number-react";
import { IDetail } from "../types";


interface IDetailProps {
	data: IDetail
}


const Detail = (props: IDetailProps) => {
	const { weatherDescription, weatherIcon, windSpeed, humidity, pressure } = props.data;
	
	const formatValue = (value: number) => value.toFixed(0);
	
	return (<div className="detail">
		<div className="detail__wrap">
          <span className="detail__icon">
            <i className={ weatherIcon }/>
          </span>
			<div className="detail__description">
				{ weatherDescription }
			</div>
		</div>
		
		<div className="detail__box">
			<div className="detail__indicator">
				<div className="detail__info">
					<AnimatedNumber
						value={ parseFloat(windSpeed.toString()) }
						formatValue={ (value: number) => value.toFixed(2) }
					/>
					<span className="detail__measure">m/s</span>
				</div>
				<div className="detail__name">wind speed</div>
			</div>
			
			<div className="detail__indicator">
				<div className="detail__info">
					<AnimatedNumber
						value={ parseInt(humidity) }
						formatValue={ formatValue }
					/>
					<span className="detail__measure">%</span>
				</div>
				<div className="detail__name">humidity</div></div>
			
			<div className="detail__indicator">
				<div className="detail__info">
					<AnimatedNumber
						value={ parseInt(pressure) }
						formatValue={ formatValue }
					/>
					<span className="detail__measure">hpa</span>
				</div>
				<div className="detail__name">pressure</div>
			</div>
		</div>
	
	</div>);
}


export default Detail;