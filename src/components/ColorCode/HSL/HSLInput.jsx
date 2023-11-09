import { useContext } from "react"
import { Cntxt } from "../../../App.jsx"
import { HSLFrame,CN_Label4HSL_HSV,ToggleDiv,Label,Range,InputNumber,ColorSpaceDiv,HGrid,HSLGrid,HSL_RangeBG } from '../../../StyledComponents.jsx'
import { HSLtoRGB,RGBtoHexa,RGBtoCMYK,HSLtoHSV,HSVtoHSL,ChangeInput } from '../../../Functions.jsx'
import ColorSpace from './ColorSpace.jsx'


const HSLInput=()=>{

    const {states,textColor1,aside,InputRefs,functions,Refs,toggle,setToggle,pointer,setPointer,CSBG,rangeBG}= useContext(Cntxt)


    //////////////////////////// HSL, HSV ////////////////////////////

  const HSLaddE=(e)=>{
    // console.log("HSLadE",Hexa_Ref.current.value)
    
    ChangeInput(e.target)
  //   console.log("classList",e.target.classList.includes("colorH_HSL"))

  if(e.target.classList[0]=="colorH_HSL" || e.target.classList[2]=="colorH_HSL"){
      Refs.H.current.value=parseFloat(InputRefs.H2.current.value)

      HSLtoHSV(Refs)
    
    }
  
    if(e.target.classList[0]=="colorS_HSL" || e.target.classList[2]=="colorS_HSL"){
        Refs.LS.current.value=parseFloat(InputRefs.LS2.current.value)
      HSLtoHSV(Refs)
      
    }

    if(e.target.classList[0]=="colorL_HSL" || e.target.classList[2]=="colorL_HSL"){
        Refs.L.current.value=parseFloat(InputRefs.L2.current.value)
      HSLtoHSV(Refs)
  }
  
  if(e.target.classList[0]=="colorS_HSV" || e.target.classList[2]=="colorS_HSV"){
    Refs.VS.current.value=parseFloat(InputRefs.VS2.current.value)
      HSVtoHSL(Refs)
      
    }
    if(e.target.classList[0]=="colorV_HSV" || e.target.classList[2]=="colorV_HSV"){
        Refs.V.current.value=parseFloat(InputRefs.V2.current.value)
      HSVtoHSL(Refs)
  }
  
  HSLtoRGB(Refs)
  RGBtoHexa(Refs)
  RGBtoCMYK(Refs)
      
  functions(true)
}



 

  

    return(

        <div>
            <HGrid>

                <Label textcolor={states.textColor1}>H:</Label>
                <Range>

                    <input className="colorH_HSL" type="range" min="0" max="359"
                        onChange={(e)=>{HSLaddE(e)}}
                        onInput={(e)=>{HSLaddE(e)}}
                        ref={InputRefs.H1}
                        />

                </Range>
                <InputNumber textcolor={states.textColor1} className="colorH_HSL" min="0" max="359" step="1"
                    onChange={(e)=>{HSLaddE(e)}}
                    onInput={(e)=>{HSLaddE(e)}}
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
                return <HSLGrid toggle={key==0 || key==1?states.toggle:!states.toggle} key={key}>
                
                <Label textcolor={states.textColor1}>{elm[1]}:</Label>
                
                <Range>
                    <HSL_RangeBG className={`${elm[0]}_${elm[1]}bg`} bg={elm[4]} rangebg={states.rangeBG}/>
                    <input className={`color${elm[1]}_${elm[0]}`} type="range" min="0" max="100"
                        onChange={(e)=>{HSLaddE(e)}}
                        onInput={(e)=>{HSLaddE(e)}}
                        ref={elm[2]}/>

                </Range>

                <InputNumber textcolor={states.textColor1} className={`color${elm[1]}_${elm[0]}`} min="0" max="100" step="1"
                    onChange={(e)=>{HSLaddE(e)}}
                    onInput={(e)=>{HSLaddE(e)}}
                    ref={elm[3]}/>
                
                </HSLGrid>
            })
            }
            
        </div>


    )
}

export default HSLInput