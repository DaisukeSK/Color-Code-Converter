import { useContext } from "react"
import { Cntxt } from "../App.jsx"
import { Aside } from '../StyledComponents'
import { RGBtoCMYK,HexaToRGB,RGBtoHSL,HSLtoHSV,ChangeInput } from '../Functions.jsx'


const SideBar=()=>{
    
    const {states,aside_div_Ref,setAside,aside,Refs,aside_ul_Ref,builtInColors,showColor_Ref,InputRefs,functions}=useContext(Cntxt)

    const LiClick=(e)=>{

        document.querySelector("body").style.transition="all .5s"
        showColor_Ref.current.style.transition="all .5s"

        // setHexa(Hexa_Ref.current.value)
        // console.log("e",e.target.closest("li").id)
    
        InputRefs.OP1.current.value=1
        InputRefs.OP2.current.value=1
    
        InputRefs.Hexa.current.value="#"+e.target.closest("li").id.replace("h","")
    
        HexaToRGB(Refs)
        RGBtoCMYK(Refs)
        RGBtoHSL(Refs)
        HSLtoHSV(Refs)

        functions(true)
    }

    const LiMouseleave=()=>{
        document.querySelector("body").style.transition="none"
        showColor_Ref.current.style.transition="none"
    }



    return (

        <Aside aside={states.aside}>
        <div ref={aside_div_Ref}>
            <div className='close' onClick={()=>states.setAside(!states.aside)}>
                <svg width="20" height="20">
                    <rect x="1" y="1" rx="5" ry="5" width="18" height="18"/>
                    <path d="M5 5 l10 10"/>
                    <path d="M15 5 l-10 10"/>
                    
                </svg>
            </div>
            <div className='logo'>Logo</div>
                    
            <h4>Built-in Colors</h4>

        </div>
        
        <ul ref={aside_ul_Ref}>

        {
        
        Object.keys(states.builtInColors).map((val)=>{
            // console.log("val",builtInColors[val]["hexa"])
            return <>
            <li id={"h"+states.builtInColors[val]["hexa"].replace("#","")}
            onClick={(e)=>LiClick(e)}
            onMouseLeave={()=>LiMouseleave()}
            style={{
                backgroundColor: states.builtInColors[val]["hexa"],
                color:states.builtInColors[val]["letterColor"]?states.builtInColors[val]["letterColor"]:"hsla(0, 0%, 100%, 0.7)"

            }}
            // onClick={(e)=>LiClick(e)}
            >
                <div>{val}</div>
                <div>{states.builtInColors[val]["hexa"]}</div>
                
                
            </li>
            
            </>
        })
        
        
        }

        </ul>

    </Aside>
    )
}

export default SideBar