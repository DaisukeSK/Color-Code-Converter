import { useContext,useState,useEffect,useRef } from "react"
import { AppContext } from "../../App.tsx"
import { Frame,CN_Label,Hexainput } from '../../StyledComponents.tsx'

const Hexa=()=>{

    const { ColorCodes, dispatch, textColor }= useContext(AppContext)
    const [ validHexaCode, setValidHexaCode ]=useState<boolean>(true)
    const Hexa_Ref: React.RefObject<HTMLInputElement>=useRef<HTMLInputElement>(null)

    const Hexa_inputChange=(e:React.FormEvent<HTMLInputElement>):void=>{

        const target: HTMLInputElement = e.target as HTMLInputElement

        const str="0123456789abcdefABCDEF"

        if(target.value.length==7 && target.value[0]=="#"){
            let sum=0;
            for(let i=1; i<target.value.length; i++){
                !str.includes(target.value[i]) && (sum+=1)
            }

            if(sum==0){
                setValidHexaCode(true)
                dispatch({type:'Hexa', payload:target.value})
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
        Hexa_Ref.current!.value=ColorCodes.Hexa
    },[ColorCodes.Hexa])

    useEffect(()=>{
        (Hexa_Ref.current?.value.length==7 && Hexa_Ref.current?.value[0]=='#') &&
        setValidHexaCode(true)
    },[Hexa_Ref.current?.value])
    
    return(
        <Frame className="hexa" textcolor={textColor?1:0}>
            <CN_Label textcolor={textColor?1:0}>Hexa</CN_Label>
            <Hexainput textcolor={textColor?1:0} type="text" onInput={(e)=>Hexa_inputChange(e)} ref={Hexa_Ref}/>
            <p>{validHexaCode?"":"*Incorrect input format"}</p>
        </Frame>
    )
}

export default Hexa