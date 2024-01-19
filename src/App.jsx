import { useState, useEffect, useRef, useReducer, createContext } from 'react'
import { Section } from './StyledComponents'
import {HSLtoPointer,textColorChange,check_Built_In_Color,updateOutput,inputRangeBG,reducer} from "./Functions.jsx"
import Hamburger from './components/Hamburger'
import {SideBar,builtInColors} from './components/Aside'
import {HSL} from './components/ColorCode/HSL/HSL'
import CMYK from './components/ColorCode/CMYK'
import RGB from './components/ColorCode/RGB'
import Hexa from './components/ColorCode/Hexa'
import OutPut from './components/ColorCode/OutPut'
import imgPath from '../public/tree_2.png'

export const Cntxt= createContext(null)

export function App() {

const [ColorCodes, dispatch]=useReducer(reducer,{H:210,LS:50,L:50,opacity:1})

const [textColor, setTextColor]=useState(true)
const [aside, setAside]=useState(false)
const [builtInColor, setBuiltInColor]=useState([])
const [marginTop, setMarginTop]=useState()
const [output, setOutput]=useState({HSL:"",HSV:"",Hexa:"",RGB:"",CMYK:""})
const [pointerPosition, setPointerPosition]=useState({HSL_top:null,HSL_left:null,HSV_top:null,HSV_left:null})
const [rangeBG, setRangeBG]=useState({LS:null,L:null,VS:null,V:null,R:null,G:null,B:null,C:null,M:null,Y:null,K:null})

const showColor_Ref=useRef()

useEffect(()=>{

    const topHeight=217
    const HSLheight=351
    setMarginTop((window.innerHeight-topHeight-HSLheight)/3)

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
    updateOutput(ColorCodes, showColor_Ref,setOutput)
    textColorChange(ColorCodes,setTextColor)
},[ColorCodes.opacity])


useEffect(()=>{

    if(ColorCodes.boolean){
        HSLtoPointer(ColorCodes,setPointerPosition)

    }
    updateOutput(ColorCodes, showColor_Ref,setOutput)
    textColorChange(ColorCodes,setTextColor)
    inputRangeBG(ColorCodes,setRangeBG)
    check_Built_In_Color(ColorCodes,builtInColors,setBuiltInColor)
    
},[ColorCodes.trigger])

  return (
    
    <Cntxt.Provider value={{ ColorCodes,dispatch, showColor_Ref,textColor,rangeBG,builtInColor,output,aside,pointerPosition,setAside, setPointerPosition}}>
    
    <div className="bgDiv" ref={showColor_Ref}>

    </div>

    <Hamburger/>
    <SideBar/>
        <div style={{position:"absolute",top:0,right:0}}>Test: 1/18</div>

    <Section aside={aside?1:0} onClick={sectionOnClick}>

    {/* <!------------------------Output------------------------> */}
    <div className="top"
    style={{margin:`${marginTop}px auto`}}
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
      </Cntxt.Provider>
    
  )
}