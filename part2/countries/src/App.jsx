/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'dotenv'
const api_key=import.meta.env.VITE_API_KEY

const ShowCountries = ({ countries, filterCountries, onClickShow,selectedCountry, onClickHide, showWeather}) => {
  const filteredCountries = countries.filter(country =>
    typeof country.name.common === 'string' &&
    country.name.common.toLowerCase().includes(filterCountries.toLowerCase()) 
  );

  //Guardo en esta variable el país que coincide exactamente con los datos introducidos
  const exactMatchCountry= filteredCountries.find(country=>country.name.common.toLowerCase()===filterCountries.toLowerCase())

  const flags=filteredCountries.map(country=>(country.flags.png) ? country.flags.png : country.flags.svg)


  
  
  
  
  return (
    <div>
      {
        /* Ahora mismo selectedCountry es null */
      selectedCountry ?(
        <div key={selectedCountry.name.common}>
            <h1>{selectedCountry.name.common}</h1>
            <p>Capital: {selectedCountry.capital}</p>
            <p>Area: {selectedCountry.area}</p>
            <h3>Languages</h3>
            <ul>
              {/* Evaluo si está definido el lenguaje y si lo está hago un mapeo sobre el valor de mis languages */}
              {selectedCountry.languages &&
                Object.values(selectedCountry.languages).map(language => (
                  <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={selectedCountry.flags.png || selectedCountry.flags.svg} alt={selectedCountry.flags.alt} />
            <div>{showWeather(selectedCountry.name.common)}</div>
            <br />
            <button onClick={()=>onClickHide(null)}>hide</button>
          </div>
      ):
      
      
      exactMatchCountry ? (
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
          <div>{showWeather(exactMatchCountry.name.common)}</div>
        </div>
      ) : 

      filterCountries.length > 1 ? (
        <div>
          <ul>
            {filteredCountries.map(country => (
              <li key={country.name.common}>{country.name.common}<button onClick={()=>onClickShow(country)}>show</button></li>
            ))}
          </ul>
        </div>
      ):
      
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
  const [selectedCountry, setSelectedCountry]=useState(null)
  const [weather, setWeather]=useState(null)
  

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data);
    }).catch(error=>console.error("Cannot connect with API",error))
  }, []);

  const Wheather=(e)=>{
    useEffect(()=>{
      axios.get(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${e}`).then(response=>{
        setWeather(response.data)
      }).catch(error=>console.error("Cannot connect with API",error));
      
    },[])
    return(
      weather ? (
        <div>
          <h2>Weather in {weather.location.name}</h2>
          <p>Temperature: {weather.current.temp_c}ºc</p>
          <img src={weather.current.condition.icon} alt="" />
          <p>Wind {weather.current.wind_mph} m/s</p>
        </div>
        
      ) : 0
    )
  }

  

  

  const handleFilter = e => {
    setNameCountry(e.target.value);
    setSelectedCountry(null) // Reiniciar el país seleccionado cuando se cambia el filtro
  };

  const handleClickShow=(country)=>{
    setSelectedCountry(country) //Al hacer click en el botón show, le he pasado desde el componente showCountries a su parámetro onClick el país seleccionado en tipo objeto y este lo almaceno en un stado, y luego este objeto lo retorno en el mismo componente showCountries llamando a su stado e iterándolo

  }

  const handleClickHide=(value)=>{
    // Reiniciar el país seleccionado cuando se cambia el filtro
    setSelectedCountry(value)
  }

 
  return (
    <div>
      <label htmlFor="find_countries">Find countries</label>{' '}
      <input type="text" value={nameCountry} onChange={handleFilter} />
      <ShowCountries countries={countries} filterCountries={nameCountry} onClickShow={handleClickShow} selectedCountry={selectedCountry} onClickHide={handleClickHide} showWeather={Wheather}/>
      
    </div>
  );
}

export default App;
