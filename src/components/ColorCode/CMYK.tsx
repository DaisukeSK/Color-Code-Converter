import { useContext } from "react"
import { AppContext } from "../../App.tsx"
import { Frame,CN_Label,Grid,Label,Range,InputNumber,CMYK_RangeBG } from '../../StyledComponents.tsx'
import { sync_Input } from '../../Functions.tsx'

const CMYK=()=>{

    const { ColorCodes, dispatch, setAside, textColor, rangeBG }= useContext(AppContext)

    const CMYK_inputChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
      
        sync_Input(e,setAside)

        // if(e.target.className.includes("input_C")){
        //     dispatch({type:'C',payload:+e.target.value})
        // }else if(e.target.className.includes("input_M")){
        //     dispatch({type:'M',payload:+e.target.value})
        // }else if(e.target.className.includes("input_Y")){
        //     dispatch({type:'Y',payload:+e.target.value})
        // }else if(e.target.className.includes("input_K")){
        //     dispatch({type:'K',payload:+e.target.value})
        // }

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

            <CN_Label textcolor={textColor?1:0}>CMYK</CN_Label>
            <div>
                {["C","M","Y","K"].map((elm:string, key:number)=>{
                    return (
                        <Grid key={key}>
                            <Label textcolor={textColor?1:0}>{elm}:</Label>
                            <Range>
                                <CMYK_RangeBG bg={elm} rangebg={rangeBG}/>
                                <input
                                    className={`input_${elm}`}
                                    type="range"
                                    min="0"
                                    max="100"
                                    onChange={(e)=>{CMYK_inputChange(e)}}
                                    value={Math.round(CCarray[key])}
                                />
                            </Range>

                            <InputNumber
                                className={`input_${elm}`}
                                textcolor={textColor?1:0}
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