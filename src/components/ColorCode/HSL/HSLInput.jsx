import { useContext } from "react"
import { Cntxt } from "../../../App.jsx"
import { HSLFrame,CN_Label4HSL_HSV,ToggleDiv,Label,Range,InputNumber,ColorSpaceDiv,HGrid,HSLGrid,HSL_RangeBG } from '../../../StyledComponents.jsx'
import { HSLtoRGB,RGBtoHexa,RGBtoCMYK,HSLtoHSV,HSVtoHSL,sync_Input } from '../../../Functions.jsx'
import ColorSpace from './ColorSpace.jsx'


const HSLInput=()=>{

    const { States,textColor,aside,InputRefs,functions,Refs,toggle,setToggle,pointerPosition,setPointerPosition,CSBG,rangeBG}= useContext(Cntxt)


    //////////////////////////// HSL, HSV ////////////////////////////

  const HSL_inputChange=(e)=>{
    // console.log("HSLadE",Hexa_Ref.current.value)
    sync_Input(e.target)

    // console.log(InputRefs.LS2.current.value, e.target.value)

  if(e.target.className.includes("input_H")){
      // Refs.H.current.value=parseFloat(InputRefs.H2.current.value)
      Refs.H.current.value=e.target.value
      HSLtoHSV(Refs)
    
    }else if(e.target.className.includes("input_LS")){
      // Refs.LS.current.value=parseFloat(InputRefs.LS2.current.value)
      Refs.LS.current.value=e.target.value
      HSLtoHSV(Refs)
      
    }else if(e.target.className.includes("input_L")){
      // Refs.L.current.value=parseFloat(InputRefs.L2.current.value)
      Refs.L.current.value=e.target.value
      HSLtoHSV(Refs)
    }else if(e.target.className.includes("input_VS")){
      // Refs.VS.current.value=parseFloat(InputRefs.VS2.current.value)
      Refs.VS.current.value=e.target.value
      HSVtoHSL(Refs)
      
    }else if(e.target.className.includes("input_V")){
      // Refs.V.current.value=parseFloat(InputRefs.V2.current.value)
      Refs.V.current.value=e.target.value
      HSVtoHSL(Refs)
  }


//   switch(e.target){

//     case InputRefs.H1.current: case InputRefs.H2.current:
//         Refs.H.current.value=parseFloat(InputRefs.H2.current.value)
//         HSLtoHSV(Refs)
//     break;

//     case InputRefs.LS1.current: case InputRefs.LS2.current:
//         Refs.LS.current.value=parseFloat(InputRefs.LS2.current.value)
//         HSLtoHSV(Refs)
//     break;

//     case InputRefs.L1.current: case InputRefs.L2.current:
//         Refs.L.current.value=parseFloat(InputRefs.L2.current.value)
//         HSLtoHSV(Refs)
//     break;

//     case InputRefs.VS1.current: case InputRefs.VS2.current:
//         Refs.VS.current.value=parseFloat(InputRefs.VS2.current.value)
//         HSVtoHSL(Refs)
//     break;

//     default:
//         Refs.V.current.value=parseFloat(InputRefs.V2.current.value)
//         HSVtoHSL(Refs)
// }

  
  HSLtoRGB(Refs)
  RGBtoHexa(Refs)
  RGBtoCMYK(Refs)
      
  functions(true)
}



 

  

    return(

        <div>
            <HGrid>

                <Label textcolor={States.textColor?1:0}>H:</Label>
                <Range>

                    <input className="input_H" type="range" min="0" max="359"
                        onChange={(e)=>{HSL_inputChange(e)}}
                        onInput={(e)=>{HSL_inputChange(e)}}
                        // ref={InputRefs.H1}
                        value={Refs.H.current ? Refs.H.current.value:0}
                        />

                </Range>
                <InputNumber textcolor={States.textColor?1:0} className="input_H" min="0" max="359" step="1"
                    onChange={(e)=>{HSL_inputChange(e)}}
                    onInput={(e)=>{HSL_inputChange(e)}}
                    ref={InputRefs.H2}
                    />

            </HGrid>

            {
            [
                ["HSL","S", InputRefs.LS1, InputRefs.LS2,"LS"],
                ["HSL","L", InputRefs.L1, InputRefs.L2,"L"],
                ["HSV","S", InputRefs.VS1, InputRefs.VS2,"VS"],
                ["HSV","V", InputRefs.V1, InputRefs.V2,"V"]
            ].map((elm, key)=>{
                return <HSLGrid toggle={key==0 || key==1?States.toggle:!States.toggle} key={key}>
                
                <Label textcolor={States.textColor?1:0}>{elm[4].split("")[elm[4].length-1]}:</Label>
                
                <Range>
                    {/* <HSL_RangeBG className={`${elm[0]}_${elm[1]}bg`} bg={elm[4]} rangebg={States.rangeBG}/> */}
                    <HSL_RangeBG bg={elm[4]} rangebg={States.rangeBG}/>
                    <input className={`input_${elm[4]}`} type="range" min="0" max="100"
                        onChange={(e)=>{HSL_inputChange(e)}}
                        onInput={(e)=>{HSL_inputChange(e)}}
                        // ref={elm[2]}
                        value={Refs[elm[4]].current ? Refs[elm[4]].current.value:0}
                        />

                </Range>

                <InputNumber textcolor={States.textColor?1:0} className={`input_${elm[4]}`} min="0" max="100" step="1"
                    onChange={(e)=>{HSL_inputChange(e)}}
                    onInput={(e)=>{HSL_inputChange(e)}}
                    ref={elm[3]}/>
                
                </HSLGrid>
            })
            }
            
        </div>


    )
}

export default HSLInput