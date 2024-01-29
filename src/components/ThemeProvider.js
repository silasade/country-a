import { createContext, useState, useContext,useEffect } from "react";
const ThemeContext=createContext()
export function ThemeProvider({children}){
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem("theme");
        return storedTheme ? JSON.parse(storedTheme) : true; // Default theme is true
    });

    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));
    }, [theme]);
    const contextValue = { theme, setTheme };

    return(
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    )

}
export {ThemeContext}