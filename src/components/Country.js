import React, { useContext } from "react";
import { CountryContext } from "./CountryProvider";
import { ThemeContext } from "./ThemeProvider";
import { useNavigate } from "react-router-dom";
import './style.css';

function Country(props) {
  const { country } = useContext(CountryContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  if (!country) {
    // If country is not defined, render loading or error state
    return <div>Loading...</div>; // You can replace this with an appropriate loading state
  }

  const style3 = {
    backgroundColor: theme ? "hsl(0, 0%, 98%)" : "hsl(207, 26%, 17%)",
    color: theme ? "hsl(0, 0%, 52%)" : "hsl(0, 0%, 52%)",
    fontSize: theme ? "10px" : "10px"
  };

  const style2 = {
    color: theme ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 98%)"
  };

  // Check if country border is defined before mapping
  const borders = country.border?.map((items) => (
    <button className="butt">{items}</button>
  ));

  return (
    <div className='country' style={style3}>
      <div className='back'>
        <button className="back" onClick={() => navigate(-1)} style={props.style}>
          Back
        </button>
      </div>

      <div>
        <img className='may img-fluid' src={country.flag} alt="image not found" />
      </div>
      <div className='name'>
        <h2>{country.name}</h2>
        <h5><span style={style2}>Native Name: </span>{country.name}</h5>
        <h5><span style={style2}>Population: </span>{country.population}</h5>
        <h5><span style={style2}>Region: </span>{country.region}</h5>
        <h5><span style={style2}>sub Region: </span>{country.subregion}</h5>
        <h5><span style={style2}>Capital: </span>{country.capital}</h5>
      </div>
      <div className='oo'>
        <h5><span style={style2}>Top Level Domain: </span>{country.domain}</h5>
        <h5 className='lang'><span style={style2}>Languages:</span> &nbsp; {country.Languages ? country.Languages.join(', ') : "None"}</h5>
        <h5 className='curr'><span style={style2}>Currency: </span>&nbsp; {country.currencies ? country.currencies.join(', ') : "None"}</h5>
      </div>
      
    </div>
  );
}

export default Country;
