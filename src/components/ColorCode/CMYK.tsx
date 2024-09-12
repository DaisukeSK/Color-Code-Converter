import { useContext } from "react"
import { AppContext } from "../../App.tsx"
import { Frame,Grid } from '../../StyledComponents.tsx'
import { sync_Input } from '../../Functions.tsx'

const CMYK=()=>{

    const { ColorCodes, dispatch, setAside, textColor, rangeBG }= useContext(AppContext)

    const CMYK_inputChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
      
        sync_Input(e,setAside)

        switch(true){
            case e.target.className.includes("input_C"):
                dispatch({type:'C',payload:+e.target.value});
                break;

            case e.target.className.includes("input_M"):
                dispatch({type:'M',payload:+e.target.value});
                break;

            case e.target.className.includes("input_Y"):
                dispatch({type:'Y',payload:+e.target.value});
                break;

            case e.target.className.includes("input_K"):
                dispatch({type:'K',payload:+e.target.value});
        }

        dispatch({type:'CMYKtoRGB',payload:null})
        dispatch({type:'RGBtoHexa',payload:null})
        dispatch({type:'RGBtoHSL',payload:null})
        dispatch({type:'HSLtoHSV',payload:null})
        dispatch({type:'trigger', payload:true})
    }

    const CCarray=[ColorCodes.C, ColorCodes.M, ColorCodes.Y, ColorCodes.K]

    return(
        <Frame textcolor={textColor?1:0}>

            <h4>CMYK</h4>
            <div>
                {["C","M","Y","K"].map((elm:string, key:number)=>{
                    return (
                        <Grid bg={elm} rangebg={rangeBG} key={key}>
                            <label>{elm}:</label>
                            <div className='range'>
                                <input
                                    className={`input_${elm}`}
                                    type="range"
                                    min="0"
                                    max="100"
                                    onChange={(e)=>{CMYK_inputChange(e)}}
                                    value={Math.round(CCarray[key])}
                                />
                            </div>

                            <input type='number'
                                className={`input_${elm}`}
                                min="0"
                                max="100"
                                step="1"
                                onChange={(e)=>{CMYK_inputChange(e)}}
                                value={Math.round(CCarray[key])}
                            />
                        </Grid>
                    )
                })}
            </div>
        </Frame>
    )
}

export default CMYK