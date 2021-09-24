enum ThemeColor {
  "default",
  "warm",
  "dark",
  "tonic",
  "rainy"
}
export type TypeThemeColorNameList = keyof typeof ThemeColor;

export type TypeDataLocation = {
  latitude: string,
  longitude: string,
}

export interface IFetchDataWeather {
  latitude?: string,
  longitude?: string,
  cityName?: string
}

export interface ICurrentWeather {
  actualTemperature: string,
  date: string,
  cityName: string,
  windSpeed: number,
  humidity: string,
  pressure: string,
  weatherDescription: string,
  weatherIcon: string,
}

export interface IWeatherForecast {
  temperaturesForecast: number[],
  temperaturesForecastLabels: string[],
  maxTemperature?: number,
  minTemperature?: number,
}




