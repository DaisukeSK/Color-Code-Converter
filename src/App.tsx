import { useState, useEffect, useReducer, createContext } from 'react'
import { Section } from './StyledComponents.tsx'
import {HSLtoPointer,textColorChange,check_Built_In_Color,updateOutput,inputRangeBG,reducer} from "./Functions.tsx"
import Hamburger from './components/Hamburger.tsx'
import {SideBar,builtInColors} from './components/Aside.tsx'
import {HSL} from './components/ColorCode/HSL/HSL.tsx'
import {BG} from './StyledComponents.tsx'
import CMYK from './components/ColorCode/CMYK.tsx'
import RGB from './components/ColorCode/RGB.tsx'
import Hexa from './components/ColorCode/Hexa.tsx'
import OutPut from './components/ColorCode/OutPut.tsx'
import imgPath from '../public/tree_2.png'

import {outputType,ppType,rangeBGType,Context} from './type'


export const AppContext= createContext<Context>({} as Context)

export function App() {

    // const [ColorCodes, dispatch]=useReducer(reducer,{H:210,LS:50,L:50,opacity:1})
    const [ColorCodes, dispatch]=useReducer(reducer,{H:210,LS:50,L:50,VS:0,V:0,Hexa:'',R:0,G:0,B:0,C:0,M:0,Y:0,K:0,opacity:1,trigger:0,boolean:true})

const [textColor, setTextColor] = useState<boolean>(true)
const [aside, setAside] = useState<boolean>(false)
const [builtInColor, setBuiltInColor] = useState<Array<string | null>>([])
// const [marginTop, setMarginTop] = useState<number>()
const [output, setOutput] = useState<outputType>({HSL:'',HSV:'',Hexa:'',RGB:'',CMYK:''})
const [pointerPosition, setPointerPosition] = useState<ppType>({HSL_top:'',HSL_left:'',HSV_top:'',HSV_left:''})
const [rangeBG, setRangeBG] = useState<rangeBGType>({LS:'',L:'',VS:'',V:'',R:'',G:'',B:'',C:'',M:'',Y:'',K:''})

// const showColor_Ref=useRef<HTMLDivElement>(null)

useEffect(()=>{

    // const topHeight:number=217
    // const HSLheight:number=351
    // setMarginTop((window.innerHeight-topHeight-HSLheight)/3)

    dispatch({type:'HSLtoHSV',payload:null})
    dispatch({type:'HSLtoRGB',payload:null})
    dispatch({type:'RGBtoHexa',payload:null})
    dispatch({type:'RGBtoCMYK',payload:null})
    dispatch({type:'trigger', payload:true})

    document.body.style.background = `url(${imgPath})`;

}, [])


const sectionOnClick=()=>{
    aside && setAside(false)
}


useEffect(()=>{
    updateOutput(ColorCodes, setOutput)
    textColorChange(ColorCodes,setTextColor)
},[ColorCodes.opacity])


useEffect(()=>{

    if(ColorCodes.boolean){
        HSLtoPointer(ColorCodes,setPointerPosition)

    }
    updateOutput(ColorCodes, setOutput)
    textColorChange(ColorCodes,setTextColor)
    inputRangeBG(ColorCodes,setRangeBG)
    check_Built_In_Color(ColorCodes,builtInColors,setBuiltInColor)
    
},[ColorCodes.trigger])

  return (
    
    <AppContext.Provider value={{ ColorCodes,dispatch, textColor,rangeBG,builtInColor,output,aside,pointerPosition,setAside, setPointerPosition}}>
    
    {/* <div
    className="bgDiv"
    style={{
        transition:aside?'all 1s ease-out':'none',
        backgroundColor:`hsla(${Math.round(ColorCodes.H)},${Math.round(ColorCodes.LS)}%,${Math.round(ColorCodes.L)}%,${ColorCodes.opacity})`
    
    }}
    // ref={showColor_Ref}
    >

    </div> */}
    <BG aside={aside?1:0} colorcodes={ColorCodes}/>

    <Hamburger/>
    <SideBar/>
        {/* <div style={{position:"absolute",top:0,right:0}}>1/22</div> */}

    <Section aside={aside?1:0} onClick={sectionOnClick} onDrag={()=>{console.log("drag")}}>

    {/* <!------------------------Output------------------------> */}
    <div className="top"
    // style={{margin:`${marginTop}px auto`}}
    >
    {/* <!-- No need now but keeping it because styles collapse somehow if remove it--> */}

        <OutPut/>
        
    </div>
    <div className="flex">
{/* <!------------------------Left, HSL------------------------> */}
<HSL/>
    
{/* <!------------------------Right------------------------> */}

    <div id="right">
        <Hexa/>
        <RGB/>
        <CMYK/>
    </div>
    </div>

    </Section>
      </AppContext.Provider>
    
  )
}