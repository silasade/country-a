import { createContext, useState} from "react";
const FilterContext=createContext()
export function FilterProvider({children}){
    const [filter, setFilter] = useState("");

    
    const contextValue = { filter, setFilter};

    return(
        <FilterContext.Provider value={contextValue}>
            {children}
        </FilterContext.Provider>
    )

}
export {FilterContext}