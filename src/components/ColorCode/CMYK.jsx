import { useContext } from "react"
import { Cntxt } from "../../App.jsx"
import { Frame,CN_Label,Grid,Label,Range,InputNumber,CMYK_RangeBG } from '../../StyledComponents.jsx'
import { CMYKtoRGB,RGBtoHexa,RGBtoHSL,HSLtoHSV,ChangeInput } from '../../Functions.jsx'


const CMYK=()=>{

    const {states,textColor1,InputRefs,functions,Refs,rangeBG}= useContext(Cntxt)

    //////////////////////////// CMYK ////////////////////////////
  const CMYKaddE=(e)=>{
      
    ChangeInput(e.target)

        switch(e.target){
            // case C1_Ref.current: case C2_Ref.current:
            // C_Ref.current.value=parseFloat(C2_Ref.current.value);
            // break;

            // case M1_Ref.current: case M2_Ref.current:
            // M_Ref.current.value=parseFloat(M2_Ref.current.value);
            // break;

            // case Y1_Ref.current: case Y2_Ref.current:
            // Y_Ref.current.value=parseFloat(Y2_Ref.current.value);
            // break;

            // default:
            // K_Ref.current.value=parseFloat(K2_Ref.current.value)

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



    <Frame textcolor={states.textColor1}>
            
            <CN_Label textcolor={states.textColor1}>CMYK</CN_Label>

            <div>

                {["C","M","Y","K"].map((elm,key)=>{
                    return <Grid key={key}>
                    
                    <Label textcolor={states.textColor1}>{elm}:</Label>
                    <Range>

                        <CMYK_RangeBG className={`CMYK_${elm}bg`} bg={elm} rangebg={states.rangeBG}/>
                        <input type="range" min="0" max="100"
                        onChange={(e)=>{CMYKaddE(e)}}
                            onInput={(e)=>{CMYKaddE(e)}}
                            ref={key==0? InputRefs.C1:key==1? InputRefs.M1:key==2? InputRefs.Y1:InputRefs.K1}/>

                    </Range>
                    <InputNumber textcolor={states.textColor1} min="0" max="100" step="1"
                    onChange={(e)=>{CMYKaddE(e)}}
                        onInput={(e)=>{CMYKaddE(e)}}
                            ref={key==0? InputRefs.C2:key==1? InputRefs.M2:key==2? InputRefs.Y2:InputRefs.K2}/>
                    
                    </Grid>
                })}
                
            </div>
            
        </Frame>
    )
}

export default CMYK