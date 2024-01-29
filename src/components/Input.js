import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from './data.json';
import { CountryContext } from './CountryProvider';
import { FilterContext } from './FilterProvider';
import { ThemeContext } from './ThemeProvider';
import Notification from './Notification';
import Autosuggest from 'react-autosuggest';

function Input() {
    const { setCountry } = useContext(CountryContext);
    const { setFilter } = useContext(FilterContext);
    const { theme } = useContext(ThemeContext);
    const [inputValue, setInputValue] = useState('');
    const [showNotification, setShowNotification] = useState(false); // State to control the notification
    const [suggestions, setSuggestions] = useState([]); // State for suggestions
    const navigate = useNavigate();

    useEffect(() => {
        const storedCountry = localStorage.getItem("selectedCountry");
        if (storedCountry) {
            setCountry(JSON.parse(storedCountry));
        }
    }, []); // Run only once on component mount

    const style = {
        backgroundColor: theme ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",
        color: theme ? "hsl(0, 0%, 52%)" : "hsl(0, 0%, 100%)",
    };

    // Define how to get suggestions based on user input
    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : data.filter(country =>
            country.name.toLowerCase().startsWith(inputValue)
        );
    };

    // Handle input change
    const onChange = (event, { newValue }) => {
        setInputValue(newValue);
    };

    // Handle suggestion selection
    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    // Clear suggestions when input is cleared
    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    // Handle search when Enter is pressed
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const enteredValue = inputValue.trim().toLowerCase();
            const matchingCountry = data.find(country => country.name.toLowerCase() === enteredValue);

            if (matchingCountry) {
                setCountry(matchingCountry);
                navigate("/country");
            } else {
                setShowNotification(true);
            }
        }
    };

    const closeNotification = () => {
        setShowNotification(false);
    };

    const inputProps = {
        placeholder: 'Search for a country...',
        value: inputValue,
        onChange: onChange
    };

    return (
        <div className='nn' style={{...style,input:{backgroundColor: theme ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)",}}}>
            <Notification show={showNotification} onClose={closeNotification} />
            <div className='one'>
            <Autosuggest
    suggestions={suggestions}
    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
    onSuggestionsClearRequested={onSuggestionsClearRequested}
    getSuggestionValue={(suggestion) => suggestion.name}
    renderSuggestion={(suggestion) => (
        <div>{suggestion.name}</div>
    )}
    theme={{
        container: 'my-autosuggest-container',
        suggestionsContainer: 'my-suggestions-container',
        suggestionsList: 'my-suggestions-list',
        suggestion: 'my-suggestion'
    }}
    inputProps={{
        placeholder: 'Type a country...',
        value: inputValue,
        onChange: onChange,
        onKeyPress: handleKeyPress, // Listen for Enter key press
        className: 'autosuggest-input',
        style:style
    }}
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
