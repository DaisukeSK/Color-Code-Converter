import { useContext } from "react"
import { Cntxt } from "../../../App.jsx"
import { ColorSpaceDiv } from '../../../StyledComponents.jsx'
import custom_pointer from "../../../../public/pointer.png";
import transparent from "../../../../public/transparent.png";
import {HSLContext} from './HSL.jsx'

const ColorSpace=()=>{

    const { ColorCodes,dispatch,pointerPosition, setPointerPosition}= useContext(Cntxt)
    const { HSLtoggle }= useContext(HSLContext)

    const movePointer=(val)=>{

        if(val.pageX && val.pageY){// Is this if necessary?

            let top=val.pageY-window.pageYOffset-val.target.getBoundingClientRect().top
        
            top<=0 && (top=0)
            top>=200 && (top=200)

            let left=val.pageX-window.pageXOffset-val.target.getBoundingClientRect().left
            
            left<=0 && (left=0)
            left>=360 && (left=360)

            if(val.target.id=="CS_HSL"){

                dispatch({type:'LS', payload:(top==200 || top==0)? 0 : left*100/360})
                dispatch({type:'L', payload:Math.abs(top/2-100)})
                dispatch({type:'HSLtoHSV', payload:null})

                // Doing the same things as above to use these variables below
                const LS=(top==200 || top==0)? 0 : left*100/360
                const L=Math.abs(top/2-100)
                const V=100*(L/100+(LS/100)*Math.min(1-(L/100), L/100))
                const VS = V==0?
                0 : 200*(1-L/V)

                setPointerPosition({...pointerPosition,
                
                    HSL_top: top-12+"px",
                    HSL_left: left-12+"px",
                    HSV_top: Math.abs(V*2-200)-12+"px",
                    HSV_left: VS*3.6-12+"px"

                })
                

            }else if(val.target.id=="CS_HSV"){

                dispatch({type:'VS', payload:top==200? 0 : left*100/360})
                dispatch({type:'V', payload:Math.abs(top/2-100)})
                dispatch({type:'HSVtoHSL', payload:null})

                // Doing the same things as above to use these variables below
                const VS= top==200? 0 : left*100/360
                const V=Math.abs(top/2-100)

                const L=100*((V/100)*(1-((VS/100)/2)))

                let LS;
                if(L==0 || L==100){
                    LS=0
                }else{
                    LS=100*(((V/100)-(L/100))/Math.min(L/100, 1-L/100))
                }

                setPointerPosition({...pointerPosition,
                
                    HSL_top: Math.abs(L*2-200)-12+"px",
                    HSL_left: LS*3.6-12+"px",
                    HSV_top: top-12+"px",
                    HSV_left: left-12+"px"

                })
            
            }

            dispatch({type:'HSLtoRGB', payload:null})
            dispatch({type:'RGBtoHexa', payload:null})
            dispatch({type:'RGBtoCMYK', payload:null})
            dispatch({type:'trigger', payload:false})
        }
    }

    return(
        
        <div className="colorSpace">

            {["HSL","HSV"].map((elm,key)=>{
                return (

                    <ColorSpaceDiv
                    pointerposition={pointerPosition}
                    // csbg={States.CSBG}
                    hue={ColorCodes.H}
                    toggle={key==0?HSLtoggle:!HSLtoggle}
                    bg={key==0?1:0}
                    key={key}
                    >
                        <img src={custom_pointer} alt="pointer"/>
                        <div
                        draggable="true"
                        id={"CS_"+elm}
                        onDragStart={(e)=>{
                            const img = document.createElement("img");
                            img.src = {transparent};
                            e.dataTransfer.setDragImage(img, 0, 0);
                        }}
                        onClick={(e)=>{movePointer(e)}}
                        onDrag={(e)=>movePointer(e)}
                        onDragEnd={(e)=>movePointer(e)}
                        ></div>
                    </ColorSpaceDiv>
                )
                
            })}

        </div>

    )
}

export default ColorSpace