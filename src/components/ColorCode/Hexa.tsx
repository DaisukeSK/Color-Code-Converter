import { useContext,useState,useEffect,useRef } from "react"
import { AppContext } from "../../App.tsx"
import { Frame,CN_Label,Hexainput } from '../../StyledComponents.tsx'

const Hexa=()=>{

    const { ColorCodes, dispatch, textColor }= useContext(AppContext)
    const [ validHexaCode, setValidHexaCode ]=useState<boolean>(true)
    const Hexa_Ref: React.RefObject<HTMLInputElement>=useRef<HTMLInputElement>(null)

    const Hexa_inputChange=(e:React.FormEvent<HTMLInputElement>):void=>{

        const target: HTMLInputElement = e.target as HTMLInputElement

        if(target.value.match(/^#([a-fA-F0-9]){6}$/)){
            
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