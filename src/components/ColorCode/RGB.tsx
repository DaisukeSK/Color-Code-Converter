import { useContext } from "react"
import { AppContext } from "../../App.tsx"
import { Frame,CN_Label,Grid,Label,Range,InputNumber,RGB_RangeBG } from '../../StyledComponents.tsx'
import { sync_Input } from '../../Functions.tsx'

const RGB=()=>{
    
    const { ColorCodes, dispatch, setAside, textColor, rangeBG }= useContext(AppContext)

    const RGB_inputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        sync_Input(e,setAside)

        switch(true){
            case e.target.className.includes("input_R"):
                dispatch({type:'R',payload:+e.target.value});
                break;
            case e.target.className.includes("input_G"):
                dispatch({type:'G',payload:+e.target.value});
                break;
            case e.target.className.includes("input_B"):
                dispatch({type:'B',payload:+e.target.value});
                break;
        }

        dispatch({type:'RGBtoHSL',payload:null})
        dispatch({type:'HSLtoHSV',payload:null})
        dispatch({type:'RGBtoHexa',payload:null})
        dispatch({type:'RGBtoCMYK',payload:null})
        dispatch({type:'trigger', payload:true})
    }

    const CCarray=[ColorCodes.R, ColorCodes.G, ColorCodes.B]

    return(

        <Frame textcolor={textColor?1:0}>

            <CN_Label textcolor={textColor?1:0}>RGB</CN_Label>

            <div>
                {["R","G","B"].map((elm:string,key:number)=>{
                    return (
                        <Grid key={key}>

                            <Label textcolor={textColor?1:0}>{elm}:</Label>

                            <Range>
                                <RGB_RangeBG bg={elm} rangebg={rangeBG}/>
                                <input
                                    className={`input_${elm}`}
                                    type="range"
                                    min="0"
                                    max="255"
                                    onChange={(e)=>{RGB_inputChange(e)}}
                                    value={Math.round(CCarray[key])}
                                />
                            </Range>

                            <InputNumber
                                className={`input_${elm}`}
                                textcolor={textColor?1:0}
                                min="0"
                                max="255"
                                step="1"
                                onChange={(e)=>{RGB_inputChange(e)}}
                                value={Math.round(CCarray[key])}
                            />
                        </Grid>
                    )
                })}
                
            </div>

        </Frame>
    )
}

export default RGB