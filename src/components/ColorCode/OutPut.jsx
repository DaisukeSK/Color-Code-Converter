import { useContext } from "react"
import { Cntxt } from "../../App.jsx"
import { OutputFrame,OutputCN_Label,CN_Label,Hr,Label,CN_Label4Output,OutputText,CopyBox,Range,InputNumber,OpacityGrid } from '../../StyledComponents.jsx'
import { CMYKtoRGB,RGBtoHexa,RGBtoHSL,HSLtoHSV,ChangeInput } from '../../Functions.jsx'


const OutPut=()=>{

    const {states,textColor1,InputRefs,functions,Refs,builtInColorStt,OutputRefs}= useContext(Cntxt)

    //////////////////////////// OpacityChange ////////////////////////////
  const OpacityChange=(e)=>{
    ChangeInput(e.target)
    functions(true)
    }

     //////////////////////////// copyCode ////////////////////////////
 const copyCode=(e)=>{
    e.target.closest("div").previousElementSibling.select()
    // console.log("e,",e.target.closest("div"))
    document.execCommand("copy")
  }


    

    return(



        <OutputFrame textcolor={states.textColor1}>
        {/* <TEST bultin={builtInColorStt}>TEST</TEST> */}
            <OutputCN_Label textcolor={states.textColor1} bultin={states.builtInColorStt}>
                <CN_Label textcolor={states.textColor1}>Color Name:</CN_Label>
                <span>{states.builtInColorStt[0]}</span>
                <div></div>
            </OutputCN_Label>

            <Hr textcolor={states.textColor1}/>
            
            <div className="grid">

            {[
                ["HSL",OutputRefs.HSL],
                ["HSV",OutputRefs.HSV],
                ["Hexa",OutputRefs.Hexa],
                ["RGB",OutputRefs.RGB],
                ["CMYK",OutputRefs.CMYK]
            ].map((elm,key)=>{
                
                return (
                <>
                    <CN_Label4Output textcolor={states.textColor1} key={key}>{elm[0]}:</CN_Label4Output>
                    <OutputText textcolor={states.textColor1} ref={elm[1]}/>
                    {/* <button onClick={(e)=>copyCode(e)}></button> */}
                    {/* <SVG textcolor={textColor1} onClick={(e)=>copyCode(e)} width="16" height="16">
                        <path d="M1 12 l0 -11 l11 0" strokeWidth="1" fill="none"/>
                        <rect x="5" y="5" width="10" height="10" strokeWidth="1" fill="none"/>
                    </SVG> */}
                    <CopyBox textcolor={states.textColor1} onClick={(e)=>copyCode(e)}>
                        <span></span>
                        <span></span>
                    </CopyBox>
                </>
                )
            })}
                
            </div>
            <Hr textcolor={states.textColor1}/>
            <OpacityGrid textcolor={states.textColor1}>
                <Label textcolor={states.textColor1}>Opacity:</Label>
                <Range>
                    <div></div>
                    <input type="range" min="0" max="1" step="0.01" defaultValue="1"
                    onChange={(e)=>OpacityChange(e)}
                    onInput={(e)=>OpacityChange(e)}
                    ref={InputRefs.OP1}/>

                </Range>
                <InputNumber textcolor={states.textColor1} style={{width:"45px"}} min="0" max="1" step="0.01" defaultValue="1"
                onChange={(e)=>OpacityChange(e)}
                onInput={(e)=>OpacityChange(e)}
                ref={InputRefs.OP2}/>
            </OpacityGrid>
            {/* <!-- Opacity moved here --> */}

        </OutputFrame>
    )
}

export default OutPut