import { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import themeColorList from "../utils/themeColorList.json";
import { ThemeContext } from "../hock-context/themeContext";
import { IDiagram } from "../types";


interface IDiagramProps {
	data: IDiagram & {
		loaded: boolean
	}
}


const Diagram = (props: IDiagramProps) => {
	const { temperaturesForecast, temperaturesForecastLabels, loaded } = props.data;

	const [ colorBg, setColorBg ] = useState("#fff");
	const [ colorText, setColorText ] = useState("#495758");
	const [ colorPrimary, setColorPrimary ] = useState("#1fa69d");
	const { theme } = useContext(ThemeContext);


	useEffect(() => {
		try {
			// get data theme from json
			const findTheme = themeColorList.filter(themeColor => themeColor.theme === theme)[ 0 ];

			setColorBg(findTheme.bg);
			setColorText(findTheme.text);
			setColorPrimary(findTheme.primary);
		} catch (err) {
			// read data-theme styles variables from body :root index.html
			const getLinkOnBody = document.body;
			const getCssVarContainer = getComputedStyle(getLinkOnBody);

			setColorBg(getCssVarContainer.getPropertyValue('--color-bg'));
			setColorText(getCssVarContainer.getPropertyValue('--color-text'));
			setColorPrimary(getCssVarContainer.getPropertyValue('--color-primary'));
		}
	}, [ loaded, theme ]);


	const DiagramChart = () => <Chart
		type="bar"
		// height={ 280 }
		series={
			[{
				name: 'Inflation',
				data: [ ...temperaturesForecast ]
			}]
		}
		options={{
			chart: {
				height: 350,
				type: 'bar',
			},
			colors: [ colorPrimary ],
			plotOptions: {
				bar: {
					dataLabels: {
						position: 'center', // top, center, bottom
					},
				}
			},
			dataLabels: {
				enabled: true,
				formatter: function (val: number) {
					return val + "°C";
				},
				offsetY: 10,
				style: {
					fontSize: '1.6rem',
					colors: [ colorBg ]
				}
			},

			xaxis: {
				categories: [ ...temperaturesForecastLabels ],
				position: 'bottom',
				axisBorder: {
					show: true
				},
				axisTicks: {
					show: false
				},
				tooltip: {
					enabled: false,
				},
				labels: {
					style: {
						colors: colorText,
						fontSize: '1.5rem'
					},
				}
			},

			yaxis: {
				axisBorder: {
					show: true
				},
				axisTicks: {
					show: false,
				},
				labels: {
					show: true,
					align: 'right',
					formatter: function (val: number) {
						return val + "°C";
					},
					style: {
						colors: colorText,
						fontSize: '1.5rem'
					},
				}
			},
		}}
	/>

	return (<div className="diagram">
		<DiagramChart />
	</div>);
}


export default Diagram;