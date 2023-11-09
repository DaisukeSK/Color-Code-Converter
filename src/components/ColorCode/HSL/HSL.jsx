import { useContext } from "react"
import { Cntxt } from "../../../App.jsx"
import { HSLFrame,CN_Label4HSL_HSV,ToggleDiv,Label,Range,InputNumber,ColorSpaceDiv,HGrid,HSLGrid } from '../../../StyledComponents.jsx'
import { HSLtoRGB,RGBtoHexa,RGBtoCMYK,HSLtoHSV,HSVtoHSL,ChangeInput } from '../../../Functions.jsx'
import ColorSpace from './ColorSpace'
import HSLInput from './HSLInput'


const HSL=()=>{

    const {states,textColor1,aside,InputRefs,functions,Refs,toggle,setToggle,pointer,setPointer,CSBG}= useContext(Cntxt)


    
    return(



        <HSLFrame aside={states.aside} textcolor={states.textColor1}>

        <div className="HSLHSVLabel">
            
            <CN_Label4HSL_HSV toggle={states.toggle} onClick={()=>states.setToggle(true)}>HSL</CN_Label4HSL_HSV>

            <CN_Label4HSL_HSV toggle={!states.toggle} onClick={()=>states.setToggle(false)}>HSV</CN_Label4HSL_HSV>
                <ToggleDiv toggle={states.toggle}></ToggleDiv>
        </div>
            
        <ColorSpace/>

        <HSLInput/>

    </HSLFrame>
    )
}

export default HSL