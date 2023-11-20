import { useContext } from "react"
import { Cntxt } from "../App.jsx"
import { HamburgerDiv } from '../StyledComponents'


const Hamburger=()=>{
    
    const {States,textColor,setAside,aside}=useContext(Cntxt)
    
    return(
        
        
        <HamburgerDiv textcolor={States.textColor?1:0} onClick={()=>States.setAside(true)}>
                <div onClick={()=>{
                    States.setAside(true)
                    // console.log("innerWidth",window.innerWidth)
                    // console.log("innerWidth",section_Ref.current.getBoundingClientRect().width)
                    
                    // console.log("moveleft:",moveLeft)
                    
                    }}></div>
        
                <svg width="100%" height="100%">
                    <path d="M0 0 h35 v4 h-35 Z"/>
                    <path d="M0 9 h35 v4 h-35 Z"/>
                    <path d="M0 18 h35 v4 h-35 Z"/>
        
        
                </svg>
            </HamburgerDiv>
  
    
)
}

export default Hamburger