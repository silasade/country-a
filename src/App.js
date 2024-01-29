import logo from './logo.svg';
import data from './components/data.json'
import {Countries} from './components/Countries';
import icon from './components/moon.svg'
import icon1 from './components/moon-fill.svg'
import {  useEffect, useState } from 'react'
import './App.css'
import Country from './components/Country';
import Input from './components/Input';
import Header from './components/Header';
import { ThemeProvider } from './components/ThemeProvider';
import { FilterProvider } from './components/FilterProvider';
import { CountryProvider } from './components/CountryProvider';
import Navbar from './components/Navbar';
import NoMatch from './components/NoMatch';

import { useContext } from "react"
import { Route, Routes } from 'react-router-dom';
function App() {
  


    
    


    return (
      <ThemeProvider>
        <CountryProvider>
          <FilterProvider>
        <Navbar/>
        <Routes>
            <Route path="/country-apis" element={<Countries/>}/>
            <Route path='/country' element={<Country/>}/>
            <Route path="*" element={<NoMatch/>}/>
        </Routes>
    </FilterProvider>
    </CountryProvider>
    </ThemeProvider>
  );
}

export default App;
