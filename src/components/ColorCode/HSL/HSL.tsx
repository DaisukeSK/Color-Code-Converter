import { useContext,createContext,useState } from "react"
import { AppContext } from "../../../App.tsx"
import { HSLFrame,CN_Label4HSL_HSV,ToggleDiv } from '../../../StyledComponents.tsx'
import ColorSpace from './ColorSpace.tsx'
import HSLInput from './HSLInput.tsx'

type HSLContextType ={
    HSLtoggle: boolean,
    setHSLtoggle: React.Dispatch<React.SetStateAction<boolean>>
}

export const HSLContext: React.Context<HSLContextType> = createContext<HSLContextType>({} as HSLContextType)

export const HSL=()=>{

    const [ HSLtoggle, setHSLtoggle ]=useState<boolean>(true)
    const { textColor, aside }= useContext(AppContext)

    return(
        <HSLContext.Provider value={{HSLtoggle,setHSLtoggle}}>
            <HSLFrame aside={aside?1:0} textcolor={textColor?1:0}>
                <div className="HSLHSVLabel">

                    <CN_Label4HSL_HSV
                        textcolor={textColor?1:0}
                        toggle={HSLtoggle?1:0}
                        onClick={()=>setHSLtoggle(true)}
                    >HSL
                    </CN_Label4HSL_HSV>

                    <CN_Label4HSL_HSV
                        textcolor={textColor?1:0}
                        toggle={!HSLtoggle?1:0}
                        onClick={()=>setHSLtoggle(false)}
                    >HSV
                    </CN_Label4HSL_HSV>

                    <ToggleDiv toggle={HSLtoggle?1:0}/>
                </div>
                <ColorSpace/>
                <HSLInput/>
            </HSLFrame>
        </HSLContext.Provider>
    )
}