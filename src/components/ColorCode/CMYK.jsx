import { useContext } from "react"
import { Cntxt } from "../../App.jsx"
import { Frame,CN_Label,Grid,Label,Range,InputNumber,CMYK_RangeBG } from '../../StyledComponents.jsx'
import { sync_Input } from '../../Functions.jsx'


const CMYK=()=>{

    const { ColorCodes,dispatch, States}= useContext(Cntxt)

    //////////////////////////// CMYK ////////////////////////////
  const CMYK_inputChange=(e)=>{
      
    sync_Input(e.target)

    if(e.target.className.includes("input_C")){
        dispatch({type:'C',payload:e.target.value})
    }else if(e.target.className.includes("input_M")){
        dispatch({type:'M',payload:e.target.value})
    }else if(e.target.className.includes("input_Y")){
        dispatch({type:'Y',payload:e.target.value})
    }else if(e.target.className.includes("input_K")){
        dispatch({type:'K',payload:e.target.value})
    }

        dispatch({type:'CMYKtoRGB',payload:null})
        dispatch({type:'RGBtoHexa',payload:null})
        dispatch({type:'RGBtoHSL',payload:null})
        dispatch({type:'HSLtoHSV',payload:null})
        dispatch({type:'trigger', payload:true})

  }

    return(

    <Frame textcolor={States.textColor?1:0}>
            
            <CN_Label textcolor={States.textColor?1:0}>CMYK</CN_Label>

            <div>

                {["C","M","Y","K"].map((elm,key)=>{
                    return <Grid key={key}>
                    
                    <Label textcolor={States.textColor?1:0}>{elm}:</Label>
                    <Range>

                        <CMYK_RangeBG bg={elm} rangebg={States.rangeBG}/>
                        <input className={`input_${elm}`} type="range" min="0" max="100"

                        onChange={(e)=>{CMYK_inputChange(e)}}
                            onInput={(e)=>{CMYK_inputChange(e)}}
                            value={ColorCodes[elm]? Math.round(ColorCodes[elm]):0}
                            />

                    </Range>
                    <InputNumber className={`input_${elm}`} textcolor={States.textColor?1:0} min="0" max="100" step="1"
                    onChange={(e)=>{CMYK_inputChange(e)}}
                        onInput={(e)=>{CMYK_inputChange(e)}}
                            value={ColorCodes[elm]? Math.round(ColorCodes[elm]):0}
                            />
                    
                    </Grid>
                })}
                
            </div>
            
        </Frame>
    )
}

export default CMYK