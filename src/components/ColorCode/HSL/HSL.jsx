import { useContext,createContext,useState } from "react"
import { Cntxt } from "../../../App.jsx"
import { HSLFrame,CN_Label4HSL_HSV,ToggleDiv } from '../../../StyledComponents.jsx'
import ColorSpace from './ColorSpace'
import HSLInput from './HSLInput'

export const HSLContext=createContext(0)

export const HSL=()=>{

    const [HSLtoggle,setHSLtoggle]=useState(true)

    const {textColor,aside}= useContext(Cntxt)

    return(

        <HSLContext.Provider value={{HSLtoggle,setHSLtoggle}}>

        <HSLFrame aside={aside?1:0} textcolor={textColor?1:0}>

        <div className="HSLHSVLabel">
            
            <CN_Label4HSL_HSV toggle={HSLtoggle?1:0} onClick={()=>setHSLtoggle(true)}>HSL</CN_Label4HSL_HSV>

            <CN_Label4HSL_HSV toggle={!HSLtoggle?1:0} onClick={()=>setHSLtoggle(false)}>HSV</CN_Label4HSL_HSV>
                <ToggleDiv toggle={HSLtoggle?1:0}></ToggleDiv>
        </div>
            
        <ColorSpace/>

        <HSLInput/>

    </HSLFrame>
    </HSLContext.Provider>
    )
}