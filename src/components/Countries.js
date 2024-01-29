import React, { useEffect } from "react";
import data from './data.json';
import { ThemeContext } from "./ThemeProvider";
import { CountryContext } from "./CountryProvider";
import { useContext } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Input from './Input';
import { FilterContext } from './FilterProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
export function Countries(props) {
    const { theme, setTheme } = useContext(ThemeContext);
    const { country, setCountry } = useContext(CountryContext);
    const { filter, setFilter} = useContext(FilterContext);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCountry = localStorage.getItem("selectedCountry");
        if (storedCountry) {
            setCountry(JSON.parse(storedCountry));
        }
    }, []); // Run only once on component mount

    const style = {
        backgroundColor: theme ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
        color: theme ? "hsl(0, 0%, 52%)" : "hsl(0, 0%, 52%)"
    };

    const style2 = {
        color: theme ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 98%)"
    };

    const style3 = {
        backgroundColor: theme ? "hsl(0, 0%, 98%)" : "hsl(207, 26%, 17%)"
    };

    function handleCountry(items) {
        setCountry({
            name: items.name,
            native: items.nativeName,
            population: items.population,
            region: items.region,
            subregion: items.subregion,
            capital: items.capital,
            domain: items.topLevelDomain,
            currencies: items.currencies ? items.currencies.map(currency => currency.name) : [], // Access currency name
            languages: items.languages ? items.languages.map(language => language.name) : [], // Access language name
            border: items.borders || [], // Ensure it's an array
            flag: items.flags.png
        });
        navigate("/country");
    }
    
    
    const filtercountriesList = data.map((items) => {
        
        return (items.region===filter && <div style={style} key={items.name} className="ma">
            <div>
                <img className="mage" onClick={() => handleCountry(items)} src={items.flags.png} alt="image not found" />
            </div>
            <div className="wi">
                <h4 style={style2}>{items.name}</h4>
            </div>
            <div className="wi">
                <h5><span style={style2}>Population:</span> {items.population}</h5>
                <h5><span style={style2}>Region:</span> {items.region}</h5>
                <h5><span style={style2}>Capital:</span> {items.capital}</h5>
            </div>
        </div>)
})
    const countriesList = data.map((items) => (
        <div style={style} key={items.name} className="ma">
            <div>
                <img className="mage" onClick={() => handleCountry(items)} src={items.flags.png} alt="image not found" />
            </div>
            <div className="wi">
                <h4 style={style2}>{items.name}</h4>
            </div>
            <div className="wi">
                <h5><span style={style2}>Population:</span> {items.population}</h5>
                <h5><span style={style2}>Region:</span> {items.region}</h5>
                <h5><span style={style2}>Capital:</span> {items.capital}</h5>
            </div>
        </div>
    ));

    return (
        < >
        <Input/>
        <div className="main1" style={style3}>

            {filter===""?countriesList: filtercountriesList}
        </div>
        </>
    );
}
