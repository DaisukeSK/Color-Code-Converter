import { useContext } from "react"
import { Cntxt } from "../../../App.jsx"
import { HSLFrame,CN_Label4HSL_HSV,ToggleDiv,Label,Range,InputNumber,ColorSpaceDiv,HGrid,HSLGrid } from '../../../StyledComponents.jsx'
import { HSLtoRGB,RGBtoHexa,RGBtoCMYK,HSLtoHSV,HSVtoHSL,ChangeInput } from '../../../Functions.jsx'


const ColorSpace=()=>{

    const {states,textColor1,aside,InputRefs,functions,Refs,toggle,setToggle,pointer,setPointer,CSBG}= useContext(Cntxt)

      //////////////////////////// movePointer ////////////////////////////
const movePointer=(val)=>{

    console.log("CS val.target",val.target.id)

    if(val.pageX && val.pageY){// Is this if necessary?

        let top=val.pageY-window.pageYOffset-val.target.getBoundingClientRect().top
       
        top<=0? top=0:null
        top>=200? top=200:null

        let left=val.pageX-window.pageXOffset-val.target.getBoundingClientRect().left
        
        left<=0? left=0:null
        left>=360? left=360:null

        if(val.target.id=="CS_HSL"){

            // pointer_HSL_Ref.current.style.top=top-12+"px"
            // pointer_HSL_Ref.current.style.left=left-12+"px"

            states.setPointer(pointer=>pointer.map((val,key)=>key==0?top-12+"px":val))
            states.setPointer(pointer=>pointer.map((val,key)=>key==1?left-12+"px" :val))

            Refs.LS.current.value=(top==200 || top==0)? 0 : left*100/360

            Refs.L.current.value=Math.abs(top/2-100)

            HSLtoHSV(Refs)
            
            // pointer_HSV_Ref.current.style.top=Math.abs(parseFloat(V_Ref.current.value)*2-200)-12+"px"
            // pointer_HSV_Ref.current.style.left=parseFloat(VS_Ref.current.value)*3.6-12+"px"

            states.setPointer(prev=>prev.map((val,key)=>key==2?Math.abs(parseFloat(Refs.V.current.value)*2-200)-12+"px":val))
            states.setPointer(prev=>prev.map((val,key)=>key==3?parseFloat(Refs.VS.current.value)*3.6-12+"px" :val))
            
            

        }else if(val.target.id=="CS_HSV"){

            // pointer_HSV_Ref.current.style.top=top-12+"px"
            // pointer_HSV_Ref.current.style.left=left-12+"px"
            states.setPointer(prev=>prev.map((val,key)=>key==2?top-12+"px":val))
            states.setPointer(prev=>prev.map((val,key)=>key==3?left-12+"px" :val))

            Refs.VS.current.value= top==200? 0 : left*100/360

            Refs.V.current.value=Math.abs(top/2-100)

            HSVtoHSL(Refs)
            
            // pointer_HSL_Ref.current.style.top=Math.abs(parseFloat(L_Ref.current.value)*2-200)-12+"px"
            // pointer_HSL_Ref.current.style.left=LS_Ref.current.value*3.6-12+"px"
            states.setPointer(prev=>prev.map((val,key)=>key==0?Math.abs(parseFloat(Refs.L.current.value)*2-200)-12+"px":val))
            states.setPointer(prev=>prev.map((val,key)=>key==1?Refs.LS.current.value*3.6-12+"px" :val))
        }
        
        
        HSLtoRGB(Refs)
        RGBtoHexa(Refs)
        RGBtoCMYK(Refs)

        functions(false)
    }
}


    ///////////////////////////////////////////////////////////////


    return(



       
            
        <div className="colorSpace">

            {["HSL","HSV"].map((elm,key)=>{
                return (

                    <ColorSpaceDiv pointer={states.pointer} csbg={states.CSBG} toggle={key==0?states.toggle:!states.toggle} bg={key==0?1:0} key={key}>
                        <img src="./public/pointer.png" alt="pointer"/>
                        <div
                        draggable="true"
                        id={"CS_"+elm}
                        onDragStart={(e)=>{
                            const img = document.createElement("img");
                            img.src = "./public/transparent.png";
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