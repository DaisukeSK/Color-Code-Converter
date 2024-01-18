import { useContext } from "react"
import { Cntxt } from "../../App.jsx"
import { Frame,CN_Label,Grid,Label,Range,InputNumber,RGB_RangeBG } from '../../StyledComponents.jsx'
import { sync_Input } from '../../Functions.jsx'

const RGB=()=>{
    
    const {ColorCodes,dispatch,States}= useContext(Cntxt)

     //////////////////////////// RGB ////////////////////////////
  const RGB_inputChange=(e)=>{
    sync_Input(e.target)

    if(e.target.className.includes("input_R")){
        dispatch({type:'R',payload:e.target.value})
    }else if(e.target.className.includes("input_G")){
        dispatch({type:'G',payload:e.target.value})
    }else if(e.target.className.includes("input_B")){
        dispatch({type:'B',payload:e.target.value})
    }

        dispatch({type:'RGBtoHSL',payload:null})
        dispatch({type:'HSLtoHSV',payload:null})
        dispatch({type:'RGBtoHexa',payload:null})
        dispatch({type:'RGBtoCMYK',payload:null})
        dispatch({type:'trigger', payload:true})
  }

    return(

        <Frame textcolor={States.textColor?1:0}>
            
        <CN_Label textcolor={States.textColor?1:0}>RGB</CN_Label>
        
        <div>

            {["R","G","B"].map((elm,key)=>{
                return <Grid key={key}>

                    <Label textcolor={States.textColor?1:0}>{elm}:</Label>
                    <Range>
                        
                        <RGB_RangeBG bg={elm} rangebg={States.rangeBG}/>
                        <input className={`input_${elm}`} type="range" min="0" max="255"
                        onChange={(e)=>{RGB_inputChange(e)}}
                        onInput={(e)=>{RGB_inputChange(e)}}
                            value={ColorCodes[elm]? Math.round(ColorCodes[elm]):0}
                            />

                    </Range>
                    <InputNumber className={`input_${elm}`} textcolor={States.textColor?1:0} min="0" max="255" step="1"
                    onChange={(e)=>{RGB_inputChange(e)}}
                    onInput={(e)=>{RGB_inputChange(e)}}
                        value={ColorCodes[elm]? Math.round(ColorCodes[elm]):0}
                        />
                </Grid>
            })}
            
        </div>
        
    </Frame>
    )
}

export default RGB