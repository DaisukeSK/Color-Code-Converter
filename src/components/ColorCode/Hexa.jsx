import { useContext,useState,useEffect,useRef } from "react"
import { Cntxt } from "../../App.jsx"
import { Frame,CN_Label,Hexainput } from '../../StyledComponents.jsx'

const Hexa=()=>{

    const { ColorCodes, dispatch, textColor}= useContext(Cntxt)

    const [validHexaCode, setValidHexaCode]=useState(true)

    const Hexa_Ref=useRef()

    //////////////////////////// Hexa ////////////////////////////
  const Hexa_inputChange=(e)=>{

    const str="0123456789abcdefABCDEF"
    if(e.target.value.length==7 && e.target.value[0]=="#"){
        let sum=0;
        for(let i=1; i<e.target.value.length; i++){
            
          !str.includes(e.target.value[i]) && (sum+=1)
        }
        if(sum==0){
            setValidHexaCode(true)
            dispatch({type:'Hexa', payload:e.target.value})

            dispatch({type:'HexaToRGB', payload:null})
            dispatch({type:'RGBtoCMYK', payload:null})
            dispatch({type:'RGBtoHSL', payload:null})
            dispatch({type:'HSLtoHSV', payload:null})
            dispatch({type:'trigger', payload:true})


        }else{
            setValidHexaCode(false)
        }
    }else{
        setValidHexaCode(false)
        
    }

}
useEffect(()=>{
    Hexa_Ref.current.value=ColorCodes.Hexa
},[ColorCodes.Hexa])

useEffect(()=>{
console.log("useEffect running");
(Hexa_Ref.current?.value.length==7 && Hexa_Ref.current?.value[0]=='#') &&
setValidHexaCode(true)
},[Hexa_Ref.current?.value])
   
    return(

        <Frame className="hexa" textcolor={textColor?1:0}>
            
           <CN_Label textcolor={textColor?1:0}>Hexa</CN_Label>
            
            <Hexainput textcolor={textColor?1:0} type="text" onInput={Hexa_inputChange} ref={Hexa_Ref}/>
            <p>{validHexaCode?"":"*Incorrect input format"}</p>
        </Frame>
    )
}

export default Hexa