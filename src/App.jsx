import { useState, useEffect, useRef, useReducer, createContext } from 'react'
import { Section } from './StyledComponents'
import {HSLtoPointer,textColorChange,check_Built_In_Color,updateOutput,inputRangeBG,reducer} from "./Functions.jsx"
import json from "./builtInColors.json"
import Hamburger from './components/Hamburger'
import SideBar from './components/Aside'
import HSL from './components/ColorCode/HSL/HSL'
import CMYK from './components/ColorCode/CMYK'
import RGB from './components/ColorCode/RGB'
import Hexa from './components/ColorCode/Hexa'
import OutPut from './components/ColorCode/OutPut'
import imgPath from '../public/tree_2.png'

export const Cntxt= createContext(null)

export function App() {

const [ColorCodes, dispatch]=useReducer(reducer,{H:210,LS:50,L:50})

const [opacity, setOpacity]=useState(1)
const [textColor, setTextColor]=useState(true)
const [toggle, setToggle]=useState(true)
const [aside, setAside]=useState(false)
const [builtInColors, setBuiltInColors]=useState(json)
const [builtInColor, setBuiltInColor]=useState([])
// const [CSBG, setCSBG]=useState([])
const [marginTop, setMarginTop]=useState()
const [output, setOutput]=useState({HSL:"",HSV:"",Hexa:"",RGB:"",CMYK:""})
const [pointerPosition, setPointerPosition]=useState({HSL_top:null,HSL_left:null,HSV_top:null,HSV_left:null})
const [rangeBG, setRangeBG]=useState({LS:null,L:null,VS:null,V:null,R:null,G:null,B:null,C:null,M:null,Y:null,K:null})

const showColor_Ref=useRef()

const States={
  textColor:textColor, setTextColor:setTextColor,
  toggle:toggle, setToggle:setToggle,
  aside:aside, setAside:setAside,
  builtInColors:builtInColors, setBuiltInColors:setBuiltInColors,
  builtInColor:builtInColor, setBuiltInColor:setBuiltInColor,
//   CSBG:CSBG, setCSBG:setCSBG,
  pointerPosition:pointerPosition, setPointerPosition:setPointerPosition,
  rangeBG:rangeBG, setRangeBG:setRangeBG,
  output:output, setOutput:setOutput,
  opacity:opacity, setOpacity:setOpacity,
}

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


///////////////////////////// functions /////////////////////////////
const functions=(a)=>{

    console.log("a",a)
    // if(a){
        if(a){
            // colorSpaceBG(ColorCodes,setCSBG)
            HSLtoPointer(ColorCodes,setPointerPosition)

        }
        updateOutput(ColorCodes,opacity, showColor_Ref,setOutput)
        textColorChange(ColorCodes,setTextColor)
        inputRangeBG(ColorCodes,setRangeBG)
        check_Built_In_Color(ColorCodes,builtInColors,setBuiltInColor)

}

const sectionOnClick=()=>{
    aside && setAside(false)
}


useEffect(()=>{
    functions(true)
},[opacity])

useEffect(()=>{
    console.log("triggered",ColorCodes.trigger,ColorCodes.boolean)
    functions(ColorCodes.boolean)
    
},[ColorCodes.trigger])

  return (
    
    <Cntxt.Provider value={{ ColorCodes,dispatch,States, showColor_Ref}}>
    
    <div className="bgDiv" ref={showColor_Ref}>

    </div>

    <Hamburger/>
    <SideBar/>
        <div style={{position:"absolute",top:0,right:0}}>Test: 1/17</div>

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