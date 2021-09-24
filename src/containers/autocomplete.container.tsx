import { Fragment, useEffect, useRef, useState } from 'react';
import fetcher from "../libs/fetcher";
import { messageError } from "../libs/clientMessages/clientMessages";
import Search from "../components/search.component";
// import fakeLocationSuggestion from "../utils/fakeLocationSuggestion.json";

interface ISuggestion	{
	label: string,
	language: string,
	countryCode: string,
	locationId: string,
	address: {
		country: string,
		county: string,
		city: string,
		district: string
	},
	matchLevel: string
}


const API_KEY: string = process.env.REACT_APP_AUTOCOMPLETE_API_KEY || "";
const MAX_RESULT: number = 20;

const AutocompleteContainer = (props: { onLocationChange: (text: string) => void }) => {
	const { onLocationChange = (text) => {} } = props;
	
	const isCancelled = useRef(false); // true - block update load data from autocomplete api
	const [ textValue, setTextValue ] = useState<string>(""); // input data
	const [ cities, setCities ] = useState<ISuggestion[]>([]); // saved full collection from autocomplete api
	const [ suggestions, setSuggestions ] = useState<ISuggestion[]>([]); // saved only filtered data
	
	// the index of the drop-down list item to select using the up and down keys.
	// After pressing, the enter will return to position -1
	const [ focusSuggestion, setFocusSuggestion ] = useState<number>(-1);
	
	/*
	// for get fake data
	useEffect(() => {
		isCancelled.current = true;

		setTimeout(() => {
			setSuggestions(fakeLocationSuggestion);
		}, 1000);
	}, [])
	*/

	useEffect(() => {
		const loadUsers = async () => {
			try {
				const URL = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=${ encodeURIComponent(textValue) }&maxresults=${ MAX_RESULT }&apikey=${ API_KEY }`;
				console.log(URL)
				const res = await fetcher<{ suggestions: ISuggestion[] }>(URL);

				const suggestionsCollection = res.suggestions;
				
				const suggestionsFilter: ISuggestion[] = _cityFilter(suggestionsCollection);
				
				if (suggestionsFilter) {
					setCities(suggestionsFilter);
				}
				
			} catch (err) {
				messageError("Sorry, something wrong with input autocomplete");
				isCancelled.current = true;
			}
		}
		
		// If an error occurs while receiving data from the server,
		// then we no longer make a request to the server
		if (!isCancelled.current) {
			_clearFocusSuggestion();
			_clearSuggestion(textValue);
			
			loadUsers();
		}
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ textValue ]);
	
	
	const _cityFilter = (suggestionArr: ISuggestion[]): ISuggestion[] => {
		if (suggestionArr) {
			return suggestionArr
				.filter(suggestObj => [ "district", "city" ].includes(suggestObj.matchLevel))
		}
		
		return suggestionArr;
	}
	
	const _clearFocusSuggestion = () => {
		if (focusSuggestion !== -1) {
			setFocusSuggestion(-1);
		}
	}
	
	const _clearSuggestion = (textValue: string) => {
		if (!textValue.length && suggestions.length) {
			setSuggestions([]);
		}
	}
	
	const _cityNameLayout = (suggestion: ISuggestion): string => {
		const countyName = suggestion.address.county || "";
		const cityName = suggestion.address.district || suggestion.address.city || "" ;
		
		return `${ cityName }, ${ countyName }`;
	}
	
	
	const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const textValue = event.target.value;
		
		setSuggestions(cities);
		setTextValue(textValue);
	}
	
	const handleSuggestClick = (event: React.MouseEvent<HTMLUListElement>) => {
		const innerTarget = event.target as HTMLLIElement;
		const textClick = innerTarget.innerText;

		setTextValue(textClick);
		setSuggestions([]);
	}
	
	const handleClearField = () => {
		setTimeout(() => {
			setSuggestions([]);
		}, 200)
	}
	
	const handleKeyCatcher = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if ((event.key === "ArrowUp" || event.code === " ArrowUp")
			&& (focusSuggestion > -1)) {
			setFocusSuggestion(focusSuggestion - 1);
		}
		
		const maxSuggest = suggestions.length - 1;
		if ((event.key === "ArrowDown" || event.code === " ArrowDown")
			&& (focusSuggestion !== maxSuggest)) {
			setFocusSuggestion(focusSuggestion + 1);
		}
		
		if ((event.key === "Enter" || event.code === " Enter")
			&& (focusSuggestion !== -1)) {
			setTextValue(_cityNameLayout(suggestions[ focusSuggestion ]));
			handleClearField();
		}
	}
	
	const handleClickButton = () => {
		onLocationChange(textValue);
		
		_clearFocusSuggestion();
		handleClearField();
		setTextValue("");
	}
	
	const _mapSuggestion = (suggestion: ISuggestion, index: number) => {
		return <li
			className={ "search__autocomplete-item " + ((focusSuggestion === index) ? "search__autocomplete-item--color" : "") }
			key={ suggestion.locationId }
		>
			{ _cityNameLayout(suggestion) }
		</li>
	};
	
	
	return (
		<Fragment>
			<Search
				onChangeValue={ handleChangeValue }
				onClearField={ handleClearField }
				onKeyCatcher={ handleKeyCatcher }
				onClickButton={ handleClickButton }
				textValue={ textValue }
			>
				{
					suggestions.length
						? <ul
							className="search__autocomplete"
				      onClick={ handleSuggestClick }
						>
							{ suggestions.map(_mapSuggestion) }
						</ul>
						: null
				}
			</Search>
		</Fragment>
	);
};



export default AutocompleteContainer;
