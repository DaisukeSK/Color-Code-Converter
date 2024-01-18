import { useContext } from "react"
import { Cntxt } from "../App.jsx"
import { HamburgerDiv } from '../StyledComponents'

const Hamburger=()=>{
    
    const {States}=useContext(Cntxt)
    
    return(
        
        <HamburgerDiv
        textcolor={States.textColor?1:0}
        onClick={()=>{
            States.setAside(true)
            }}>
        
                <svg width="100%" height="100%" style={{overflow:"visible"}}>
                    
                    <path className="blurPath" d="M0 0 h35 v4 h-35 Z" filter="blur(3px)"/>
                    <path className="blurPath" d="M0 9 h35 v4 h-35 Z" filter="blur(3px)"/>
                    <path className="blurPath" d="M0 18 h35 v4 h-35 Z" filter="blur(3px)"/>
        
                    <path d="M0 0 h35 v4 h-35 Z"/>
                    <path d="M0 9 h35 v4 h-35 Z"/>
                    <path d="M0 18 h35 v4 h-35 Z"/>
        
                </svg>
            </HamburgerDiv>
  
)
}

export default Hamburger