import React, { useEffect, useState } from "react";
import axios from 'axios'
import Countries from "./components/Countries";
import CountryList from "./components/CountryList";

function App() {

  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log(response)
        setCountries(response.data)
      })
  }, []);

  useEffect(() => {
    if (newFilter === '') {
      setFilteredCountries([]);
      return;
    }
    // value in input field is turned into a regex
    let reg = new RegExp(newFilter, 'i');
    // filter countires based on whether or not there is a match in name
    let filtered = countries.filter(country => country.name.match(reg));
    // set state to array of filtered countries
    let exactMatch = filtered.filter(country => newFilter.toLowerCase() === country.name.toLowerCase())
    if (exactMatch.length === 1) {
      setFilteredCountries(exactMatch);
      return;
    }
    setFilteredCountries(filtered);
  }, [countries, newFilter]);



  const handleFilter = (event) => {
    // set filter to value in input
    setNewFilter(event.target.value)
  }

  const handleClick = (country) => {
    // set input value to country so that when we click button the filtered
    // array will have 1 country so we can display the info
    setNewFilter(country)
  }

  return (
    <div className="App">
      <Countries newFilter={newFilter} handleFilter={handleFilter}></Countries>
      <CountryList
        countries={filteredCountries}
        handleClick={handleClick}>
      </CountryList>
    </div>
  );
}

export default App;
