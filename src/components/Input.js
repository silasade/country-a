import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from './data.json';
import { CountryContext } from './CountryProvider';
import { FilterContext } from './FilterProvider';
import { ThemeContext } from './ThemeProvider';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
function Input() {
    const { setCountry } = useContext(CountryContext);
    const { setFilter } = useContext(FilterContext);
    const { theme } = useContext(ThemeContext);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const style = {
        backgroundColor: theme ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
        color: theme ? "hsl(0, 0%, 52%)" : "hsl(0, 0%, 100%)"
    };

    useEffect(() => {
        const storedCountry = localStorage.getItem("selectedCountry");
        if (storedCountry) {
            setCountry(JSON.parse(storedCountry));
        }
    }, []); // Run only once on component mount

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const enteredValue = event.target.value.trim().toLowerCase();
            const matchingCountry = data.find(country => country.name.toLowerCase() === enteredValue);

            if (matchingCountry) {
                setCountry({
                    name: matchingCountry.name,
                    native: matchingCountry.nativeName,
                    population: matchingCountry.population,
                    region: matchingCountry.region,
                    subregion: matchingCountry.subregion,
                    capital: matchingCountry.capital,
                    domain: matchingCountry.topLevelDomain,
                    currencies: matchingCountry.currencies ? matchingCountry.currencies.map(currency => currency.name) : [],
                    Languages: matchingCountry.languages ? matchingCountry.languages.map(language => language.name) : [],
                    border: matchingCountry.borders ? matchingCountry.borders.map(border => border) : [],
                    flag: matchingCountry.flags.png
                });

                navigate("/country");
            }
        }
    };

    return (
        
                <div className='nn' style={style}>
                    <div className='one'>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Search for a country..."
                            style={style}
                        />
                    </div>
                    <div className="dropdown">
                        <button className="dropdown-toggleitem item" style={style} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Filter by Region
                        </button>
                        <ul className="dropdown-menu" style={style}>
                            <li style={style} onClick={() => setFilter("Africa")} className="dropdown-item">Africa</li>
                            <li style={style} onClick={() => setFilter("Americas")} className="dropdown-item">America</li>
                            <li style={style} onClick={() => setFilter("Asia")} className="dropdown-item">Asia</li>
                            <li style={style} onClick={() => setFilter("Europe")} className="dropdown-item">Europe</li>
                            <li style={style} onClick={() => setFilter("Oceania")} className="dropdown-item">Oceania</li>
                        </ul>
                    </div>
                </div>
           
    );
}

export default Input;
