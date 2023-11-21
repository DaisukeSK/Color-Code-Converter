import { useContext } from "react"
import { Cntxt } from "../../App.jsx"
import { Frame,CN_Label,Grid,Label,Range,InputNumber,RGB_RangeBG } from '../../StyledComponents.jsx'
import { RGBtoCMYK,RGBtoHexa,RGBtoHSL,HSLtoHSV,sync_Input } from '../../Functions.jsx'


const RGB=()=>{

    const {States,textColor,InputRefs,functions,Refs,rangeBG}= useContext(Cntxt)

     //////////////////////////// RGB ////////////////////////////
  const RGB_inputChange=(e)=>{
    // console.log("e.target",e.target.className,e.target.className.includes("input_G"))
    sync_Input(e.target)

    if(e.target.className.includes("input_R")){
        // Refs.R.current.value=parseFloat(InputRefs.R2.current.value);
        Refs.R.current.value=e.target.value
    }else if(e.target.className.includes("input_G")){
        // Refs.G.current.value=parseFloat(InputRefs.G2.current.value);
        Refs.G.current.value=e.target.value
    }else if(e.target.className.includes("input_B")){
        // Refs.B.current.value=parseFloat(InputRefs.B2.current.value)
        Refs.B.current.value=e.target.value
    }

    // switch(e.target){
    //     case InputRefs.R1.current: case InputRefs.R2.current:
    //         Refs.R.current.value=parseFloat(InputRefs.R2.current.value);
    //         break;

    //     case InputRefs.G1.current: case InputRefs.G2.current:
    //         Refs.G.current.value=parseFloat(InputRefs.G2.current.value);
    //         break;
        
    //     default:
    //         Refs.B.current.value=parseFloat(InputRefs.B2.current.value)
    // }
        
        RGBtoHSL(Refs)
        HSLtoHSV(Refs)
        RGBtoHexa(Refs)
        RGBtoCMYK(Refs)
        
        functions(true)
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
                            // ref={key==0? InputRefs.R1: key==1? InputRefs.G1:InputRefs.B1}
                            value={Refs[elm].current? Refs[elm].current.value:0}
                            />

                    </Range>
                    <InputNumber className={`input_${elm}`} textcolor={States.textColor?1:0} min="0" max="255" step="1"
                    onChange={(e)=>{RGB_inputChange(e)}}
                    onInput={(e)=>{RGB_inputChange(e)}}
                        ref={key==0? InputRefs.R2: key==1? InputRefs.G2:InputRefs.B2}
                        />
                </Grid>
            })}
            
        </div>
        
    </Frame>
    )
}

export default RGB