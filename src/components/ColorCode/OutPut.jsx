import { useContext, Fragment  } from "react"
import { Cntxt } from "../../App.jsx"
import { OutputFrame,OutputCN_Label,CN_Label,Hr,Label,CN_Label4Output,OutputText,CopyBox,Range,InputNumber,OpacityGrid } from '../../StyledComponents.jsx'

const OutPut=()=>{

    const {ColorCodes,dispatch,textColor,builtInColor,output}= useContext(Cntxt)

    //////////////////////////// OpacityChange ////////////////////////////
  const OpacityChange=(e)=>{
    // States.setOpacity(+e.target.value)
    dispatch({type:'opacity',payload:+e.target.value})
    }

     //////////////////////////// copyCode ////////////////////////////
 const copyCode=(e)=>{
    e.target.closest("div").previousElementSibling.select()
    document.execCommand("copy")
  }

    return(

        <OutputFrame textcolor={textColor?1:0}>
            <OutputCN_Label textcolor={textColor?1:0} bultin={builtInColor}>
                <CN_Label textcolor={textColor?1:0}>Color Name:</CN_Label>
                <span>{builtInColor[0]}</span>
                <div></div>
            </OutputCN_Label>

            <Hr textcolor={textColor?1:0}/>
            
            <div className="grid">

            {
            ["HSL", "HSV", "Hexa", "RGB", "CMYK" ].map((elm,key)=>{
                
                return (
                <Fragment key={key}>
                    <CN_Label4Output textcolor={textColor?1:0} key={key}>{elm}:</CN_Label4Output>
                    <OutputText
                        textcolor={textColor?1:0}
                        value={output[elm]}
                    />
                    <CopyBox textcolor={textColor?1:0} onClick={(e)=>copyCode(e)}>
                        <span></span>
                        <span></span>
                    </CopyBox>
                </Fragment>
                )
            })}
                
            </div>
            <Hr textcolor={textColor?1:0}/>
            <OpacityGrid textcolor={textColor?1:0}>
                <Label textcolor={textColor?1:0}>Opacity:</Label>
                <Range>
                    <div></div>
                    <input type="range" min="0" max="1" step="0.01"
                    onChange={(e)=>OpacityChange(e)}
                    onInput={(e)=>OpacityChange(e)}
                    value={ColorCodes.opacity}
                    />

                </Range>
                <InputNumber textcolor={textColor?1:0} style={{width:"45px"}} min="0" max="1" step="0.01"
                onChange={(e)=>OpacityChange(e)}
                onInput={(e)=>OpacityChange(e)}
                value={ColorCodes.opacity}/>
            </OpacityGrid>

        </OutputFrame>
    )
}

export default OutPut