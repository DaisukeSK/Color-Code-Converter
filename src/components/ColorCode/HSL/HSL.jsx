import { useContext } from "react"
import { Cntxt } from "../../../App.jsx"
import { HSLFrame,CN_Label4HSL_HSV,ToggleDiv } from '../../../StyledComponents.jsx'
import ColorSpace from './ColorSpace'
import HSLInput from './HSLInput'

const HSL=()=>{

    const {States}= useContext(Cntxt)

    return(

        <HSLFrame aside={States.aside?1:0} textcolor={States.textColor?1:0}>

        <div className="HSLHSVLabel">
            
            <CN_Label4HSL_HSV toggle={States.toggle?1:0} onClick={()=>States.setToggle(true)}>HSL</CN_Label4HSL_HSV>

            <CN_Label4HSL_HSV toggle={!States.toggle?1:0} onClick={()=>States.setToggle(false)}>HSV</CN_Label4HSL_HSV>
                <ToggleDiv toggle={States.toggle?1:0}></ToggleDiv>
        </div>
            
        <ColorSpace/>

        <HSLInput/>

    </HSLFrame>
    )
}

export default HSL