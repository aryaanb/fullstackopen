import Weather from "./Weather";
import { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country }) => {
	const api_key = process.env.REACT_APP_API_KEY;
	const [weatherData, setWeatherData] = useState(null)

	useEffect(() => {
		const params = {
			key: api_key,
			q: country.capital,
		}

		axios
			.get("http://api.weatherapi.com/v1/current.json", {params})
			.then(response => {
				console.log(response);
				setWeatherData(response.data.current)
				// console.log(weatherData)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [country.capital])


	return (
		<div className="country-detail">
			<h2>{country.name}</h2>
			<div>Capital: {country.capital}</div>
			<div>Population: {country.population.toLocaleString()}</div>
			<h2>Languages</h2>
			<ul>
				{country.languages.map((language) => {
					return (
						<li key={language.name}>{language.name}</li>
					)
				})}
			</ul>
			<img src={country.flag} alt="Flag" />
			{/* setWeatherData is async so only once the data is set */}
			{weatherData && <Weather country={country} weather={weatherData}></Weather>}
		</div>
	);
}

export default Country;