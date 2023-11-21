import { useContext, Fragment  } from "react"
import { Cntxt } from "../../App.jsx"
import { OutputFrame,OutputCN_Label,CN_Label,Hr,Label,CN_Label4Output,OutputText,CopyBox,Range,InputNumber,OpacityGrid } from '../../StyledComponents.jsx'
import { CMYKtoRGB,RGBtoHexa,RGBtoHSL,HSLtoHSV,sync_Input } from '../../Functions.jsx'


const OutPut=()=>{

    const {States,textColor,InputRefs,functions,Refs,builtInColor,OutputRefs}= useContext(Cntxt)

    //////////////////////////// OpacityChange ////////////////////////////
  const OpacityChange=(e)=>{
    sync_Input(e.target)
    functions(true)
    }

     //////////////////////////// copyCode ////////////////////////////
 const copyCode=(e)=>{
    e.target.closest("div").previousElementSibling.select()
    // console.log("e,",e.target.closest("div"))
    document.execCommand("copy")
  }


    // console.log("BIC",States.builtInColor)

    return(



        <OutputFrame textcolor={States.textColor?1:0}>
        {/* <TEST bultin={builtInColor}>TEST</TEST> */}
            <OutputCN_Label textcolor={States.textColor?1:0} bultin={States.builtInColor}>
                <CN_Label textcolor={States.textColor?1:0}>Color Name:</CN_Label>
                <span>{States.builtInColor[0]}</span>
                <div></div>
            </OutputCN_Label>

            <Hr textcolor={States.textColor?1:0}/>
            
            <div className="grid">

            {
            ["HSL", "HSV", "Hexa", "RGB", "CMYK" ].map((elm,key)=>{
                
                return (
                <Fragment key={key}>
                    <CN_Label4Output textcolor={States.textColor?1:0} key={key}>{elm}:</CN_Label4Output>
                    <OutputText
                        textcolor={States.textColor?1:0}
                        // ref={elm[1]}
                        value={States.output[elm]}
                    />
                    {/* <button onClick={(e)=>copyCode(e)}></button> */}
                    {/* <SVG textcolor={textColor?1:0} onClick={(e)=>copyCode(e)} width="16" height="16">
                        <path d="M1 12 l0 -11 l11 0" strokeWidth="1" fill="none"/>
                        <rect x="5" y="5" width="10" height="10" strokeWidth="1" fill="none"/>
                    </SVG> */}
                    <CopyBox textcolor={States.textColor?1:0} onClick={(e)=>copyCode(e)}>
                        <span></span>
                        <span></span>
                    </CopyBox>
                </Fragment>
                )
            })}
                
            </div>
            <Hr textcolor={States.textColor?1:0}/>
            <OpacityGrid textcolor={States.textColor?1:0}>
                <Label textcolor={States.textColor?1:0}>Opacity:</Label>
                <Range>
                    <div></div>
                    <input type="range" min="0" max="1" step="0.01" defaultValue="1"
                    onChange={(e)=>OpacityChange(e)}
                    onInput={(e)=>OpacityChange(e)}
                    ref={InputRefs.OP1}/>

                </Range>
                <InputNumber textcolor={States.textColor?1:0} style={{width:"45px"}} min="0" max="1" step="0.01" defaultValue="1"
                onChange={(e)=>OpacityChange(e)}
                onInput={(e)=>OpacityChange(e)}
                ref={InputRefs.OP2}/>
            </OpacityGrid>
            {/* <!-- Opacity moved here --> */}

        </OutputFrame>
    )
}

export default OutPut