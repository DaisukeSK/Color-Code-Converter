import { useContext } from "react"
import { Cntxt } from "../App.jsx"
import { HamburgerDiv } from '../StyledComponents'


const Hamburger=()=>{
    
    const {states,textColor1,setAside,aside}=useContext(Cntxt)
    
    return(
        
        
        <HamburgerDiv textcolor={states.textColor1} onClick={()=>states.setAside(!states.aside)}>
                <div onClick={()=>{
                    states.setAside(!states.aside)
                    // console.log("innerWidth",window.innerWidth)
                    // console.log("innerWidth",section_Ref.current.getBoundingClientRect().width)
                    
                    // console.log("moveleft:",moveLeft)
                    
                    }}></div>
        
                <svg width="40" height="40">
                    <path d="M0 0 l35 0 l0 4 l-35 0 Z"/>
                    <path d="M0 9 l35 0 l0 4 l-35 0 Z"/>
                    <path d="M0 18 l35 0 l0 4 l-35 0 Z"/>
        
        
                </svg>
            </HamburgerDiv>
  
    
)
}

export default Hamburger