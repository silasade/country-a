import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const Autosuggests = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Define your suggestions
  const fruits = [
    { name: 'Apple' },
    { name: 'Banana' },
    { name: 'Orange' }
  ];

  // Define how to get suggestions based on user input
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : fruits.filter(fruit =>
      fruit.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // Handle input change
  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  // Handle suggestion selection
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Clear suggestions when input is cleared
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Define how to render suggestions
  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.name}
    </div>
  );

  const inputProps = {
    placeholder: 'Type a fruit',
    value,
    onChange: onChange
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => suggestion.name}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default Autosuggests;
