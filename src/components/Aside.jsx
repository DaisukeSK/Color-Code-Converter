import { useContext } from "react"
import { Cntxt } from "../App.jsx"
import { Aside } from '../StyledComponents'

import logo from "../../public/logo_letter.svg";

const SideBar=()=>{
    
    const {dispatch, States, showColor_Ref}=useContext(Cntxt)

    const LiClick=(e)=>{

        showColor_Ref.current.style.transition="all .7s"
        setTimeout(()=>{
            showColor_Ref.current.style.transition="none"
        },700)

        States.setOpacity(1)
    
        dispatch({type:'Hexa',payload:"#"+e.target.closest("li").id.replace("h","")})

        dispatch({type:'HexaToRGB',payload:null})
        dispatch({type:'RGBtoCMYK',payload:null})
        dispatch({type:'RGBtoHSL',payload:null})
        dispatch({type:'HSLtoHSV',payload:null})
        dispatch({type:'trigger', payload:true})
    }

    return (

        <Aside aside={States.aside?1:0}>
        <div>
            <div
            className='close'
            onClick={()=>{
                States.setAside(false)
            }}
            >
                <svg width="20" height="20">
                    <rect x="1" y="1" rx="5" ry="5" width="18" height="18"/>
                    <path d="M5 5 l10 10"/>
                    <path d="M15 5 l-10 10"/>
                    
                </svg>
            </div>
            <div className='logo'>
                <img src={logo}/>
                <div className="presentedBy">
                    Presented by DaisukeSK
                </div>
            </div>
                    
            <h4>Built-in Colors</h4>

        </div>
        
        <ul>

        {
        
        Object.keys(States.builtInColors).map((val,key)=>{
            return (
            <li key={key} id={"h"+States.builtInColors[val]["hexa"].replace("#","")}
            onClick={(e)=>LiClick(e)}
            style={{
                backgroundColor: States.builtInColors[val]["hexa"],
                color:States.builtInColors[val]["letterColor"]?States.builtInColors[val]["letterColor"]:"hsla(0, 0%, 100%, 0.7)"
            }}
            >
                <div>{val}</div>
                <div>{States.builtInColors[val]["hexa"]}</div>
                
            </li>)
            
        })
        
        }

        </ul>

    </Aside>
    )
}

export default SideBar