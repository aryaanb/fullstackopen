import Country from "./Country";

const CountryList = ({ countries, handleClick, weather }) => {
	if (countries.length > 10) {
		return (
			<div>
				Too many matches, be more specific
			</div>
		)
	} else if (countries.length === 1) {
		return (
			<Country 
				country={countries[0]}>
			</Country>
		)
	} else {
		return (
			countries.map(country => {
				return (
					<div key={country.numericCode}>
						{country.name} <button onClick={() => handleClick(country.name)}>show</button>
					</div>
				)
			})
		);
	}
}


export default CountryList;