/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';

const ShowCountries = ({ countries, filterCountries }) => {
  const filteredCountries = countries.filter(country =>
    typeof country.name.common === 'string' &&
    country.name.common.toLowerCase().includes(filterCountries.toLowerCase()) 
  );

  //Guardo en esta variable el país que coincide exactamente con los datos introducidos
  const exactMatchCountry= filteredCountries.find(country=>country.name.common.toLowerCase()===filterCountries.toLowerCase())

  const flags=filteredCountries.map(country=>(country.flags.png) ? country.flags.png : country.flags.svg)
  console.log(flags);
  return (
    <div>
      {exactMatchCountry ? (
        <div key={exactMatchCountry.name.common}>
          <h1>{exactMatchCountry.name.common}</h1>
          <p>Capital: {exactMatchCountry.capital}</p>
          <p>Area: {exactMatchCountry.area}</p>
          <h2>Languages</h2>
          <ul>
            {exactMatchCountry.languages &&
              Object.values(exactMatchCountry.languages).map(language => (
                <li key={language}>{language}</li>
              ))}
          </ul>
          <img src={flags} alt={exactMatchCountry.flags.alt} />
        </div>
      ) : 
      
      
      filteredCountries.length === 1 ? (
        <div>
          {filteredCountries.map(country => (
            <div key={country.name.common}>
              <h1>{country.name.common}</h1>
              <p>Capital: {country.capital}</p>
              <p>Area: {country.area}</p>
              <h2>Languages</h2>
              <ul>
                {/* Evaluo si está definido el lenguaje y si lo está hago un mapeo sobre el valor de mis languages */}
                {country.languages &&
                  Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                  ))}
              </ul>
              <img src={flags} alt={country.flags.alt} />
            </div>
          ))}
        </div>
      ) : filteredCountries.length < 10 ? (
        <div>
          <ul>
            {filteredCountries.map(country => (
              <li key={country.name.common}>{country.name.common}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>Too many matches, specify another filter</p>
        </div>
      )}
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [nameCountry, setNameCountry] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleFilter = e => {
    setNameCountry(e.target.value);
  };

  return (
    <div>
      <label htmlFor="find_countries">Find countries</label>{' '}
      <input type="text" value={nameCountry} onChange={handleFilter} />
      <ShowCountries countries={countries} filterCountries={nameCountry} />
    </div>
  );
}

export default App;
