import { createContext, useState,useEffect } from "react";
const CountryContext=createContext()
export function CountryProvider({children}){
    const [country, setCountry] = useState(() => {
        const storedCountry = localStorage.getItem("country");
        return storedCountry
            ? JSON.parse(storedCountry)
            : {
                  name: "",
                  native: "",
                  population: "",
                  region: "",
                  subregion: "",
                  capital: "",
                  domain: "",
                  currencies: "",
                  Languages: [],
                  border: [],
                  flag: ""
              };
    });

    useEffect(() => {
        localStorage.setItem("country", JSON.stringify(country));
    }, [country]);

    const contextValue = { country, setCountry };
    return(
        <CountryContext.Provider value={contextValue}>
            {children}
        </CountryContext.Provider>
    )
}
export {CountryContext}