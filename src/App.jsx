import { useState, useEffect, useRef, useContext, createContext } from 'react'
import { OutputCN_Label,Frame,Hr,HSLFrame,OutputFrame, Section,InputNumber,CN_Label,CN_Label4HSL_HSV,Label, OutputText,CN_Label4Output,ToggleDiv,ColorSpaceDiv,Range,Grid,HGrid,HSLGrid,Hexainput,OpacityGrid,SVG,CopyBox } from './StyledComponents'
import {sync_Input,HSLtoHSV,HSVtoHSL,HSLtoRGB,RGBtoHexa,RGBtoCMYK,HexaToRGB,RGBtoHSL,CMYKtoRGB,colorSpaceBG,HSLtoPointer,textColorChange,builtInColor,Input,outputColor,inputRangeBG} from "./Functions.jsx"
import json from "./builtInColors.json"
import Hamburger from './components/Hamburger'
import SideBar from './components/Aside'
import HiddenInput from './components/HiddenInput'
import HSL from './components/ColorCode/HSL/HSL'
import CMYK from './components/ColorCode/CMYK'
import RGB from './components/ColorCode/RGB'
import Hexa from './components/ColorCode/Hexa'
import OutPut from './components/ColorCode/OutPut'


export const Cntxt= createContext(null)

export function App() {
    //When movig a pointer to the top on HSL colorspace, K of CMYK is 1: Solved with Math.round
    
    //Alert for incorrect hexa input.
    
const [textColor, setTextColor]=useState(true)
const [toggle, setToggle]=useState(true)
const [aside, setAside]=useState(false)
const [builtInColors, setBuiltInColors]=useState(json)
const [moveLeft, setMoveLeft]=useState()
const [checkIfBuiltInColor, setCheckIfBuiltInColor]=useState([])
const [CSBG, setCSBG]=useState([])
const [marginTop, setMarginTop]=useState()

// const [pointer, setPointer]=useState([])
const [pointerPosition, setPointerPosition]=useState({HSL_top:null,HSL_left:null,HSV_top:null,HSV_left:null})

// Can't it be initialized as empty object?
const [rangeBG, setRangeBG]=useState({LS:null,L:null,VS:null,V:null,R:null,G:null,B:null,C:null,M:null,Y:null,K:null})

const aside_div_Ref=useRef()
const aside_ul_Ref=useRef()
const showColor_Ref=useRef()
const section_Ref=useRef()

const H_Ref=useRef()
const LS_Ref=useRef()
const L_Ref=useRef()
const VS_Ref=useRef()
const V_Ref=useRef()
const R_Ref=useRef()
const G_Ref=useRef()
const B_Ref=useRef()
const C_Ref=useRef()
const M_Ref=useRef()
const Y_Ref=useRef()
const K_Ref=useRef()

const H1_Ref=useRef()
const H2_Ref=useRef()
const LS1_Ref=useRef()
const LS2_Ref=useRef()
const L1_Ref=useRef()
const L2_Ref=useRef()
const VS1_Ref=useRef()
const VS2_Ref=useRef()
const V1_Ref=useRef()
const V2_Ref=useRef()
const R1_Ref=useRef()
const R2_Ref=useRef()
const G1_Ref=useRef()
const G2_Ref=useRef()
const B1_Ref=useRef()
const B2_Ref=useRef()

const C1_Ref=useRef()
const C2_Ref=useRef()
const M1_Ref=useRef()
const M2_Ref=useRef()
const Y1_Ref=useRef()
const Y2_Ref=useRef()
const K1_Ref=useRef()
const K2_Ref=useRef()

const Hexa_Ref=useRef()

const opacity1_Ref=useRef()
const opacity2_Ref=useRef()

const outputHSL_Ref=useRef()
const outputHSV_Ref=useRef()
const outputHexa_Ref=useRef()
const outputRGB_Ref=useRef()
const outputCMYK_Ref=useRef()



const Refs={
    H:H_Ref, LS:LS_Ref, L:L_Ref, VS:VS_Ref, V:V_Ref,
    Hexa:Hexa_Ref, R:R_Ref, G:G_Ref, B:B_Ref, C:C_Ref, M:M_Ref, Y:Y_Ref, K:K_Ref
    // setCSBG:setCSBG, setPointer:setPointer, setTextColor:setTextColor, builtInColors:builtInColors, setCheckIfBuiltInColor:setCheckIfBuiltInColor
}

const InputRefs={
    H1: H1_Ref, H2: H2_Ref, LS1:LS1_Ref, LS2:LS2_Ref, L1:L1_Ref, L2:L2_Ref, VS1:VS1_Ref, VS2:VS2_Ref, V1:V1_Ref, V2:V2_Ref, 
    Hexa:Hexa_Ref, R1:R1_Ref, R2:R2_Ref, G1:G1_Ref, G2:G2_Ref, B1:B1_Ref, B2:B2_Ref, 
    C1:C1_Ref, C2:C2_Ref, M1:M1_Ref, M2:M2_Ref, Y1:Y1_Ref, Y2:Y2_Ref, K1:K1_Ref, K2:K2_Ref, OP1:opacity1_Ref, OP2:opacity2_Ref
}

const OutputRefs={
    HSL:outputHSL_Ref, HSV:outputHSV_Ref, Hexa:outputHexa_Ref, RGB:outputRGB_Ref, CMYK:outputCMYK_Ref
}

const States={
  textColor:textColor, setTextColor:setTextColor,
  toggle:toggle, setToggle:setToggle,

  aside:aside, setAside:setAside,
  builtInColors:builtInColors, setBuiltInColors:setBuiltInColors,
  moveLeft:moveLeft, setMoveLeft:setMoveLeft,
  checkIfBuiltInColor:checkIfBuiltInColor, setCheckIfBuiltInColor:setCheckIfBuiltInColor,
  CSBG:CSBG, setCSBG:setCSBG,
  pointerPosition:pointerPosition, setPointerPosition:setPointerPosition,
  rangeBG:rangeBG, setRangeBG:setRangeBG
}

useEffect(()=>{

    let initH=210;
    let initLS=50;
    let initL=50


    const topHeight=217
    const HSLheight=351
    setMarginTop((window.innerHeight-topHeight-HSLheight)/3)

  H2_Ref.current.value=initH
  LS2_Ref.current.value=initLS
  L2_Ref.current.value=initL
  sync_Input(H2_Ref.current)
  sync_Input(LS2_Ref.current)
  sync_Input(L2_Ref.current)

  H_Ref.current.value=initH
  LS_Ref.current.value=initLS
  L_Ref.current.value=initL

  HSLtoHSV(Refs)
  HSLtoRGB(Refs)
  RGBtoHexa(Refs)
  RGBtoCMYK(Refs)
  functions(true)


setMoveLeft((window.innerWidth-section_Ref.current.getBoundingClientRect().width)/2)
aside_ul_Ref.current.style.height=window.innerHeight-aside_div_Ref.current.getBoundingClientRect().height-15+"px"
}, [])


///////////////////////////// functions /////////////////////////////
const functions=(a)=>{
    // console.log("RangeBG",rangeBG)

    if(a){
        Input(Refs, InputRefs)
        colorSpaceBG(Refs,States)
        outputColor(InputRefs, OutputRefs, showColor_Ref)
        HSLtoPointer(Refs,States)
        textColorChange(Refs,States)
        inputRangeBG(InputRefs,States)
        document.querySelector("div#right div.hexa p").innerText=""
        builtInColor(Refs,States)
    }else{
        Input(Refs, InputRefs)
        //colorSpaceBG()
        outputColor(InputRefs, OutputRefs, showColor_Ref)
        //HSLtoPointer()
        textColorChange(Refs,States)
        inputRangeBG(InputRefs,States)
        document.querySelector("div#right div.hexa p").innerText=""
        builtInColor(Refs,States)

    }

}

///////////////////////////////////////////////

  
  return (
    
    <Cntxt.Provider value={{ States,rangeBG,CSBG,toggle,setToggle,pointerPosition,setPointerPosition,checkIfBuiltInColor,OutputRefs,aside,functions,InputRefs,Refs,textColor,setAside,aside_div_Ref,aside_ul_Ref,builtInColors,showColor_Ref}}>
    
    <Hamburger/>
    <SideBar/>
    <HiddenInput/>

    <Section moveleft={moveLeft} aside={aside?1:0} ref={section_Ref}>
  

    <div className="output_color">
        <div className="showColor" ref={showColor_Ref}></div>
    </div>
    {/* <!------------------------Output------------------------> */}
    <div className="top" style={{margin:`${marginTop}px auto`}}>
    {/* <!-- No need now but keeping it because styles collapse somehow if remove it--> */}

        <OutPut/>
        
    </div>
    {/* <hr className="middleLine"/> */}
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
      {/* <script src="./src/func.jsx"></script> */}
      </Cntxt.Provider>
    
  )
}

// export default App
