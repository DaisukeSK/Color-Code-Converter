import { useContext } from "react"
import { Cntxt } from "../../../App.jsx"
import { Label,Range,InputNumber,HGrid,HSLGrid,HSL_RangeBG } from '../../../StyledComponents.jsx'
import { sync_Input } from '../../../Functions.jsx'
import {HSLContext} from './HSL.jsx'

const HSLInput=()=>{

    const { ColorCodes,dispatch,textColor,rangeBG}= useContext(Cntxt)
    const { HSLtoggle }= useContext(HSLContext)

    //////////////////////////// HSL, HSV ////////////////////////////

  const HSL_inputChange=(e)=>{
    sync_Input(e.target)

  if(e.target.className.includes("input_H")){

      dispatch({type:'H', payload:+e.target.value})
      dispatch({type:'HSLtoHSV', payload:null})
    
    }else if(e.target.className.includes("input_LS")){

      dispatch({type:'LS', payload:+e.target.value})
      dispatch({type:'HSLtoHSV', payload:null})
      
    }else if(e.target.className.includes("input_L")){

      dispatch({type:'L', payload:+e.target.value})
      dispatch({type:'HSLtoHSV', payload:null})

    }else if(e.target.className.includes("input_VS")){

      dispatch({type:'VS', payload:+e.target.value})
      dispatch({type:'HSVtoHSL', payload:null})
      
    }else if(e.target.className.includes("input_V")){

      dispatch({type:'V', payload:+e.target.value})
      dispatch({type:'HSVtoHSL', payload:null})
  }

  dispatch({type:'HSLtoRGB', payload:null})
  dispatch({type:'RGBtoHexa', payload:null})
  dispatch({type:'RGBtoCMYK', payload:null})
  dispatch({type:'trigger', payload:true})

}

    return(

        <div>
            <HGrid>

                <Label textcolor={textColor?1:0}>H:</Label>
                <Range>

                    <input className="input_H" type="range" min="0" max="359"
                        onChange={(e)=>{HSL_inputChange(e)}}
                        onInput={(e)=>{HSL_inputChange(e)}}
                        value={ColorCodes.H ? Math.round(ColorCodes.H):0}
                        />

                </Range>
                <InputNumber textcolor={textColor?1:0} className="input_H" min="0" max="359" step="1"
                    onChange={(e)=>{HSL_inputChange(e)}}
                    onInput={(e)=>{HSL_inputChange(e)}}
                    value={ColorCodes.H ? Math.round(ColorCodes.H):0}
                    />

            </HGrid>

            {
            ["LS","L","VS","V"].map((elm, key)=>{
                return <HSLGrid toggle={key==0 || key==1?HSLtoggle:!HSLtoggle} key={key}>
                
                <Label textcolor={textColor?1:0}>{elm.split("")[elm.length-1]}:</Label>
                
                <Range>
                  <HSL_RangeBG bg={elm} rangebg={rangeBG}/>
                    <input className={`input_${elm}`} type="range" min="0" max="100"
                        onChange={(e)=>{HSL_inputChange(e)}}
                        onInput={(e)=>{HSL_inputChange(e)}}
                        value={ColorCodes[elm] ? Math.round(ColorCodes[elm]):0}
                        />

                </Range>

                <InputNumber textcolor={textColor?1:0} className={`input_${elm}`} min="0" max="100" step="1"
                    onChange={(e)=>{HSL_inputChange(e)}}
                    onInput={(e)=>{HSL_inputChange(e)}}
                    value={ColorCodes[elm] ? Math.round(ColorCodes[elm]):0}
                    />
                </HSLGrid>
            })
            }
            
        </div>
    )
}

export default HSLInput