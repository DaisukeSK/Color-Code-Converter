import { useContext } from "react"
import { Cntxt } from "../../App.jsx"
import { Frame,CN_Label,Hexainput } from '../../StyledComponents.jsx'
import { RGBtoCMYK,HexaToRGB,RGBtoHSL,HSLtoHSV } from '../../Functions.jsx'


const Hexa=()=>{

    const { States,textColor,functions,Refs}= useContext(Cntxt)

    //////////////////////////// Hexa ////////////////////////////
  const Hexa_inputChange=()=>{

    const str="0123456789abcdefABCDEF"
    if(Refs.Hexa.current.value.length==7 && Refs.Hexa.current.value[0]=="#"){
        let sum=0;
        for(let i=1; i<Refs.Hexa.current.value.length; i++){
            
          !str.includes(Refs.Hexa.current.value[i]) ? sum+=1 : null
        }
        if(sum==0){
            document.querySelector("div#right div.hexa p").innerText=""
            
            HexaToRGB(Refs)
            RGBtoCMYK(Refs)
            RGBtoHSL(Refs)
            HSLtoHSV(Refs)
            
            functions(true)

        }else{
            document.querySelector("div#right div.hexa p").innerText="*Incorrect input format"
        }
    }else{
        document.querySelector("div#right div.hexa p").innerText="*Incorrect input format"
    }

}
   

    return(



        <Frame className="hexa" textcolor={States.textColor?1:0}>
            
            
            <CN_Label textcolor={States.textColor?1:0}>Hexa</CN_Label>
            
            <Hexainput textcolor={States.textColor?1:0} type="text" onInput={Hexa_inputChange} ref={Refs.Hexa}/>
            <p></p>
        </Frame>
    )
}

export default Hexa