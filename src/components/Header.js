import { ThemeContext } from "./ThemeProvider"
import { useContext } from "react"
import moon from "./moon.svg"
import darkMoon from "./moon-fill.svg"
function Header(props){
    const {theme, setTheme}=useContext(ThemeContext)
    function handleTheme(){
        setTheme(!theme)
        console.log(theme)
    }
    const style={
        backgroundColor: theme? "hsl(0, 0%, 100%)":"hsl(209, 23%, 22%)", 
        color: theme? "hsl(209, 23%, 22%)":"hsl(0, 0%, 100%)" 
    }
    return(
        <header className='header' style={style}>
            <h3>Where in the world</h3>
            <div onClick={handleTheme} className='theme'>
                <img src={theme? moon: darkMoon} className="mo" href="image not fount"/>
                <h4 style={{fontSize:"16px"}}>{theme? "Light mode": "Darkmode" }</h4>
            </div>
            
        </header>
    )
}
export default Header