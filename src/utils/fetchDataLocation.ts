import fetcher from "../libs/fetcher";
import { messageError } from "../libs/clientMessages/clientMessages";
import { TypeDataLocation } from "../types";


interface IGeolocation {
	loc: string
}


const API_KEY: string = process.env.REACT_APP_IPINFO_API_KEY || "";

const fetchDataLocation = async (): Promise<TypeDataLocation> => {
	let locationInfo:string = "0,0";
	
	try {
		const getGeolocation = await fetcher<IGeolocation>(`https://ipinfo.io/91.214.82.65?token=${ API_KEY }`);
		
		locationInfo = getGeolocation.loc;
	} catch (err) {
		messageError("Your location is not defined");
	}
	
	const splitLocationData = locationInfo.split(",");
	
	return {
		latitude: splitLocationData[ 0 ],
		longitude: splitLocationData[ 1 ],
	}
	
};


export default fetchDataLocation;
