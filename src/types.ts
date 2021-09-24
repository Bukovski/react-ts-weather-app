import Detail from "./components/detail.component";

enum ThemeColor {
  "default",
  "warm",
  "dark",
  "tonic",
  "rainy"
}
export type TypeThemeColorNameList = keyof typeof ThemeColor;

export type TypeDataLocation = {
  latitude?: string,
  longitude?: string,
}

export interface IFetchDataWeather extends TypeDataLocation {
  cityName?: string
}



export interface IDetail {
  weatherDescription: string,
  weatherIcon: string,
  windSpeed: number,
  humidity: string,
  pressure: string
}

export interface IGeo {
  date : string,
  cityName : string,
}

export interface IGeo {
  date : string,
  cityName : string,
}

export interface ICurrentWeather extends IDetail, IGeo{
  actualTemperature: string
}


export interface IDiagram {
  temperaturesForecast: number[],
  temperaturesForecastLabels: string[],
}

export interface ITemperature {
  maxTemperature?: number,
  minTemperature?: number,
}

export interface IWeatherForecast extends IDiagram, ITemperature {}




