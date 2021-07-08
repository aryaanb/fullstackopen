const Weather = ({ country, weather }) => {
	return (
		<div>
			<h2>Weather in {country.capital}</h2>
			<div>
				<p>
					<strong>temperature:</strong> {weather.temp_c} Celsius
				</p>
			</div>
			<span></span>
			<div>
				<p>
					<strong>Condition:</strong> {weather.condition.text}
				</p>
			</div>
			<img src={weather.condition.icon} alt="Weather icon" />
		</div>

	);
}

export default Weather;