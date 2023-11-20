import { useContext } from "react"
import { Cntxt } from "../../App.jsx"
import { Frame,CN_Label,Grid,Label,Range,InputNumber,CMYK_RangeBG } from '../../StyledComponents.jsx'
import { CMYKtoRGB,RGBtoHexa,RGBtoHSL,HSLtoHSV,sync_Input } from '../../Functions.jsx'


const CMYK=()=>{

    const { States,textColor,InputRefs,functions,Refs,rangeBG}= useContext(Cntxt)

    //////////////////////////// CMYK ////////////////////////////
  const CMYK_inputChange=(e)=>{
      
    sync_Input(e.target)

    // console.log("className",e.target.closest(""))
    // console.log("className",e.target.className[1])
    // console.log("className",e.target.className[2])
    // e.target.className.forEach(val=>{
    //     console.log(val)
    // })

        switch(e.target){
            

            case InputRefs.C1.current: case InputRefs.C2.current:
                Refs.C.current.value=parseFloat(InputRefs.C2.current.value);
            break;

            case InputRefs.M1.current: case InputRefs.M2.current:
                Refs.M.current.value=parseFloat(InputRefs.M2.current.value);
            break;

            case InputRefs.Y1.current: case InputRefs.Y2.current:
                Refs.Y.current.value=parseFloat(InputRefs.Y2.current.value);
            break;

            default:
                Refs.K.current.value=parseFloat(InputRefs.K2.current.value)
        }
    
          CMYKtoRGB(Refs)
          RGBtoHexa(Refs)
          RGBtoHSL(Refs)
          HSLtoHSV(Refs)
          
          functions(true)

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
                        <input type="range" min="0" max="100"

                        onChange={(e)=>{CMYK_inputChange(e)}}
                            onInput={(e)=>{CMYK_inputChange(e)}}
                            ref={key==0? InputRefs.C1:key==1? InputRefs.M1:key==2? InputRefs.Y1:InputRefs.K1}/>

                    </Range>
                    <InputNumber textcolor={States.textColor?1:0} min="0" max="100" step="1"
                    onChange={(e)=>{CMYK_inputChange(e)}}
                        onInput={(e)=>{CMYK_inputChange(e)}}
                            ref={key==0? InputRefs.C2:key==1? InputRefs.M2:key==2? InputRefs.Y2:InputRefs.K2}/>
                    
                    </Grid>
                })}
                
            </div>
            
        </Frame>
    )
}

export default CMYK