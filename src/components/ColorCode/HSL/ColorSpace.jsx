import { useContext } from "react"
import { Cntxt } from "../../../App.jsx"
import { ColorSpaceDiv } from '../../../StyledComponents.jsx'
import { HSLtoRGB, RGBtoHexa, RGBtoCMYK, HSLtoHSV, HSVtoHSL } from '../../../Functions.jsx'

import custom_pointer from "../../../../public/pointer.png";
import transparent from "../../../../public/transparent.png";

const ColorSpace=()=>{

    const { States, functions, Refs }= useContext(Cntxt)

    const movePointer=(val)=>{

        if(val.pageX && val.pageY){// Is this if necessary?

            let top=val.pageY-window.pageYOffset-val.target.getBoundingClientRect().top
        
            top<=0 && (top=0)
            top>=200 && (top=200)

            let left=val.pageX-window.pageXOffset-val.target.getBoundingClientRect().left
            
            left<=0 && (left=0)
            left>=360 && (left=360)

            if(val.target.id=="CS_HSL"){

                // States.setPointerPosition(pointer=>pointer.map((val,key)=>key==0?top-12+"px":val))
                // States.setPointerPosition(pointer=>pointer.map((val,key)=>key==1?left-12+"px" :val))

                Refs.LS.current.value=(top==200 || top==0)? 0 : left*100/360

                Refs.L.current.value=Math.abs(top/2-100)

                HSLtoHSV(Refs)

                // States.setPointerPosition(prev=>prev.map((val,key)=>key==2?Math.abs(parseFloat(Refs.V.current.value)*2-200)-12+"px":val))
                // States.setPointerPosition(prev=>prev.map((val,key)=>key==3?parseFloat(Refs.VS.current.value)*3.6-12+"px" :val))
                States.setPointerPosition({...States.pointerPosition,
                
                    HSL_top: top-12+"px",
                    HSL_left: left-12+"px",
                    HSV_top: Math.abs(parseFloat(Refs.V.current.value)*2-200)-12+"px",
                    HSV_left: parseFloat(Refs.VS.current.value)*3.6-12+"px"

                })
                

            }else if(val.target.id=="CS_HSV"){

                // States.setPointerPosition(prev=>prev.map((val,key)=>key==2?top-12+"px":val))
                // States.setPointerPosition(prev=>prev.map((val,key)=>key==3?left-12+"px" :val))

                Refs.VS.current.value= top==200? 0 : left*100/360

                Refs.V.current.value=Math.abs(top/2-100)

                HSVtoHSL(Refs)
                
                // States.setPointerPosition(prev=>prev.map((val,key)=>key==0?Math.abs(parseFloat(Refs.L.current.value)*2-200)-12+"px":val))
                // States.setPointerPosition(prev=>prev.map((val,key)=>key==1?Refs.LS.current.value*3.6-12+"px" :val))
                
                States.setPointerPosition({...States.pointerPosition,
                
                    HSL_top: Math.abs(parseFloat(Refs.L.current.value)*2-200)-12+"px",
                    HSL_left: Refs.LS.current.value*3.6-12+"px",
                    HSV_top: top-12+"px",
                    HSV_left: left-12+"px"

                })
            
            }
            
            
            HSLtoRGB(Refs)
            RGBtoHexa(Refs)
            RGBtoCMYK(Refs)

            functions(false)
        }
    }

    return(
        
        <div className="colorSpace">

            {["HSL","HSV"].map((elm,key)=>{
                return (

                    <ColorSpaceDiv pointerposition={States.pointerPosition} csbg={States.CSBG} toggle={key==0?States.toggle:!States.toggle} bg={key==0?1:0} key={key}>
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