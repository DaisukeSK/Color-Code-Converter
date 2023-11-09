import { useState, useEffect, useRef, useContext, createContext } from 'react'
import { OutputCN_Label,Frame,Hr,HSLFrame,OutputFrame, Section,InputNumber,CN_Label,CN_Label4HSL_HSV,Label, OutputText,CN_Label4Output,ToggleDiv,ColorSpaceDiv,Range,Grid,HGrid,HSLGrid,Hexainput,OpacityGrid,SVG,CopyBox } from './StyledComponents'
import {ChangeInput,HSLtoHSV,HSVtoHSL,HSLtoRGB,RGBtoHexa,RGBtoCMYK,HexaToRGB,RGBtoHSL,CMYKtoRGB,colorSpaceBG,HSLtoPointer,textColor,builtInColor,Input,outputColor} from "./Functions.jsx"
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
    
const [textColor1, setTextColor1]=useState(true)
const [toggle, setToggle]=useState(true)
const [aside, setAside]=useState(false)
const [builtInColors, setBuiltInColors]=useState(json)
const [moveLeft, setMoveLeft]=useState()
const [builtInColorStt, setBuiltInColorStt]=useState([])
const [CSBG, setCSBG]=useState([])
const [pointer, setPointer]=useState([])
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
    Hexa:Hexa_Ref, R:R_Ref, G:G_Ref, B:B_Ref, C:C_Ref, M:M_Ref, Y:Y_Ref, K:K_Ref,
    setCSBG:setCSBG, setPointer:setPointer, setTextColor1:setTextColor1, builtInColors:builtInColors, setBuiltInColorStt:setBuiltInColorStt
}

const InputRefs={
    H1: H1_Ref, H2: H2_Ref, LS1:LS1_Ref, LS2:LS2_Ref, L1:L1_Ref, L2:L2_Ref, VS1:VS1_Ref, VS2:VS2_Ref, V1:V1_Ref, V2:V2_Ref, 
    Hexa:Hexa_Ref, R1:R1_Ref, R2:R2_Ref, G1:G1_Ref, G2:G2_Ref, B1:B1_Ref, B2:B2_Ref, 
    C1:C1_Ref, C2:C2_Ref, M1:M1_Ref, M2:M2_Ref, Y1:Y1_Ref, Y2:Y2_Ref, K1:K1_Ref, K2:K2_Ref, OP1:opacity1_Ref, OP2:opacity2_Ref
}

const OutputRefs={
    HSL:outputHSL_Ref, HSV:outputHSV_Ref, Hexa:outputHexa_Ref, RGB:outputRGB_Ref, CMYK:outputCMYK_Ref
}

useEffect(()=>{

  H2_Ref.current.value=210
  LS2_Ref.current.value=50
  L2_Ref.current.value=50
  ChangeInput(H2_Ref.current)
  ChangeInput(LS2_Ref.current)
  ChangeInput(L2_Ref.current)

  H_Ref.current.value=210
  LS_Ref.current.value=50
  L_Ref.current.value=50
    
  HSLtoHSV(Refs)
  HSLtoRGB(Refs)
  RGBtoHexa(Refs)
  RGBtoCMYK(Refs)
  functions(true)


setMoveLeft((window.innerWidth-section_Ref.current.getBoundingClientRect().width)/2)
aside_ul_Ref.current.style.height=window.innerHeight-aside_div_Ref.current.getBoundingClientRect().height-15+"px"
}, [])


///////////////////////////// input range background /////////////////////////////
  
const SandLforSv=(Sv)=>{ // Function to get bgcolor of Sv range input
  const L=100*((parseFloat(V_Ref.current.value)/100)*(1-((Sv/100)/2)))
  let S;
      S= (L==0 || L==100)? 0 : 100*(((parseFloat(V_Ref.current.value)/100)-(L/100))/Math.min(L/100, 1-L/100))
      return [S,L]
}

const SandLforV=(V)=>{ // Function to get bgcolor of V range input
  const L=100*((V/100)*(1-((parseFloat(VS_Ref.current.value)/100)/2)))
  let S;

  S= (L==0 || L==100)? 0 : 100*(((V/100)-(L/100))/Math.min(L/100, 1-L/100))

  return [S,L]
  
}
const CMYKbgColor=(c,m,y,k)=>{
  return `rgb(${255*(1-c/100)*(1-k/100)},${255*(1-m/100)*(1-k/100)},${255*(1-y/100)*(1-k/100)})`
}

const inputRangeBG=()=>{ //Main function
  const HSL_Sleft=`hsl(0,0%,${parseFloat(L_Ref.current.value)}%)`
  const HSL_Sright=`hsl(${H_Ref.current.value},100%,${parseFloat(L_Ref.current.value)}%)`
  // document.querySelector("div.HSL_Sbg").style.background=
  // `linear-gradient(90deg, ${HSL_Sleft},${HSL_Sright})`
  const LSbg=`linear-gradient(90deg, ${HSL_Sleft},${HSL_Sright})`
  // setRangeBG({...rangeBG, LS:`linear-gradient(90deg, ${HSL_Sleft},${HSL_Sright})`})

  const HSL_Lmiddle=`hsl(${H_Ref.current.value},${LS_Ref.current.value}%,50%)`
  // document.querySelector("div.HSL_Lbg").style.background=
  // `linear-gradient(90deg, hsl(0,0%,0%), ${HSL_Lmiddle}, hsl(0,0%,100%))`
  const Lbg=`linear-gradient(90deg, hsl(0,0%,0%), ${HSL_Lmiddle}, hsl(0,0%,100%))`
  // setRangeBG({...rangeBG, L:`linear-gradient(90deg, hsl(0,0%,0%), ${HSL_Lmiddle}, hsl(0,0%,100%))`})

  //////////// HSV ////////////
  // hsv(any, 0% value)   : left of Sv
  // hsv(hue, 100% value) : right of Sv

  // hsv(any, Sv 0%)   : left of V
  // hsv(hue, Sv 100%) : right of V

  // Convert them to hsl, Use the same method as HSVtoSHL function

  // Sv
  const hsvSleft=`hsl(0,${SandLforSv(0)[0]}%,${SandLforSv(0)[1]}%)`
  const hsvSRight=`hsl(${H_Ref.current.value},${SandLforSv(100)[0]}%,${SandLforSv(100)[1]}%)`
  // document.querySelector("div.HSV_Sbg").style.background=`linear-gradient(90deg, ${hsvSleft}, ${hsvSRight})`
  const VSbg=`linear-gradient(90deg, ${hsvSleft}, ${hsvSRight})`
  // setRangeBG({...rangeBG, VS:`linear-gradient(90deg, ${hsvSleft}, ${hsvSRight})`})

  // V
  const hsvVleft=`hsl(0,${SandLforV(0)[0]}%,${SandLforV(0)[1]}%)`
  const hsvVRight=`hsl(${H_Ref.current.value},${SandLforV(100)[0]}%,${SandLforV(100)[1]}%)`
  // document.querySelector("div.HSV_Vbg").style.background=`linear-gradient(90deg, ${hsvVleft}, ${hsvVRight})`
  const Vbg=`linear-gradient(90deg, ${hsvVleft}, ${hsvVRight})`
  // setRangeBG({...rangeBG, V:`linear-gradient(90deg, ${hsvVleft}, ${hsvVRight})`})




  // RGB
  const rgbRleft=`rgb(0,${parseFloat(G_Ref.current.value)},${parseFloat(B_Ref.current.value)})`
  const rgbRright=`rgb(255,${parseFloat(G_Ref.current.value)},${parseFloat(B_Ref.current.value)})`
  // document.querySelector("div.RGB_Rbg").style.background=`linear-gradient(90deg, ${rgbRleft}, ${rgbRright})`
  const Rbg=`linear-gradient(90deg, ${rgbRleft}, ${rgbRright})`
  // setRangeBG({...rangeBG, R:`linear-gradient(90deg, ${rgbRleft}, ${rgbRright})`})
  // setRangeBG(prev=>({...prev, R:`linear-gradient(90deg, ${rgbRleft}, ${rgbRright})`}))

  const rgbGleft=`rgb(${parseFloat(R_Ref.current.value)},0,${parseFloat(B_Ref.current.value)})`
  const rgbGright=`rgb(${parseFloat(R_Ref.current.value)},255,${parseFloat(B_Ref.current.value)})`
  // document.querySelector("div.RGB_Gbg").style.background=`linear-gradient(90deg, ${rgbGleft}, ${rgbGright})`
  const Gbg=`linear-gradient(90deg, ${rgbGleft}, ${rgbGright})`
  // setRangeBG({...rangeBG, G:`linear-gradient(90deg, ${rgbGleft}, ${rgbGright})`})

  const rgbBleft=`rgb(${parseFloat(R_Ref.current.value)},${parseFloat(G_Ref.current.value)},0)`
  const rgbBright=`rgb(${parseFloat(R_Ref.current.value)},${parseFloat(G_Ref.current.value)},255)`
  // document.querySelector("div.RGB_Bbg").style.background=`linear-gradient(90deg, ${rgbBleft}, ${rgbBright})`
  const Bbg=`linear-gradient(90deg, ${rgbBleft}, ${rgbBright})`
  // setRangeBG({...rangeBG, B:`linear-gradient(90deg, ${rgbBleft}, ${rgbBright})`})





  // CMYK
  const Cleft=CMYKbgColor(0,parseFloat(M_Ref.current.value),parseFloat(Y_Ref.current.value),parseFloat(K_Ref.current.value))
  const Cright=CMYKbgColor(100,parseFloat(M_Ref.current.value),parseFloat(Y_Ref.current.value),parseFloat(K_Ref.current.value))
  // document.querySelector("div.CMYK_Cbg").style.background=`linear-gradient(90deg, ${Cleft}, ${Cright})`
  const Cbg=`linear-gradient(90deg, ${Cleft}, ${Cright})`
  // setRangeBG({...rangeBG, C:`linear-gradient(90deg, ${Cleft}, ${Cright})`})

  const Mleft=CMYKbgColor(parseFloat(C_Ref.current.value),0,parseFloat(Y_Ref.current.value),parseFloat(K_Ref.current.value))
  const Mright=CMYKbgColor(parseFloat(C_Ref.current.value),100,parseFloat(Y_Ref.current.value),parseFloat(K_Ref.current.value))
  // document.querySelector("div.CMYK_Mbg").style.background=`linear-gradient(90deg, ${Mleft}, ${Mright})`
  const Mbg=`linear-gradient(90deg, ${Mleft}, ${Mright})`
  // setRangeBG({...rangeBG, M:`linear-gradient(90deg, ${Mleft}, ${Mright})`})

  const Yleft=CMYKbgColor(parseFloat(C_Ref.current.value),parseFloat(M_Ref.current.value),0,parseFloat(K_Ref.current.value))
  const Yright=CMYKbgColor(parseFloat(C_Ref.current.value),parseFloat(M_Ref.current.value),100,parseFloat(K_Ref.current.value))
  // document.querySelector("div.CMYK_Ybg").style.background=`linear-gradient(90deg, ${Yleft}, ${Yright})`
  const Ybg=`linear-gradient(90deg, ${Yleft}, ${Yright})`
  // setRangeBG({...rangeBG, Y:`linear-gradient(90deg, ${Yleft}, ${Yright})`})

  const Kleft=CMYKbgColor(parseFloat(C_Ref.current.value),parseFloat(M_Ref.current.value),parseFloat(Y_Ref.current.value),0)
  const Kright=CMYKbgColor(parseFloat(C_Ref.current.value),parseFloat(M_Ref.current.value),parseFloat(Y_Ref.current.value),100)
  // document.querySelector("div.CMYK_Kbg").style.background=`linear-gradient(90deg, ${Kleft}, ${Kright})`
  const Kbg=`linear-gradient(90deg, ${Kleft}, ${Kright})`


  setRangeBG({LS:LSbg,L:Lbg,VS:VSbg,V:Vbg, R:Rbg,B:Bbg,G:Gbg,C:Cbg,M:Mbg,Y:Ybg,K:Kbg})
  
  
}



///////////////////////////// functions /////////////////////////////
const functions=(a)=>{
    console.log("RangeBG",rangeBG)

    if(a){
        Input(Refs, InputRefs)
        colorSpaceBG(Refs)
        outputColor(InputRefs, OutputRefs, showColor_Ref)
        HSLtoPointer(Refs)
        textColor(Refs)
        inputRangeBG()
        document.querySelector("div#right div.hexa p").innerText=""
        builtInColor(Refs)
    }else{
        Input(Refs, InputRefs)
        //colorSpaceBG()
        outputColor(InputRefs, OutputRefs, showColor_Ref)
        //HSLtoPointer()
        textColor(Refs)
        inputRangeBG()
        document.querySelector("div#right div.hexa p").innerText=""
        builtInColor(Refs)

    }

}

///////////////////////////////////////////////

  
  return (
    
    <Cntxt.Provider value={{rangeBG,CSBG,toggle,setToggle,pointer,setPointer,builtInColorStt,OutputRefs,aside,functions,InputRefs,Refs,textColor1,setAside,aside_div_Ref,aside_ul_Ref,builtInColors,showColor_Ref}}>
    
    <Hamburger/>
    <SideBar/>
    <HiddenInput/>

    <Section moveleft={moveLeft} aside={aside} ref={section_Ref}>
  

    <div className="output_color">
        <div className="showColor" ref={showColor_Ref}></div>
    </div>
    {/* <!------------------------Output------------------------> */}
    <div className="top">
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
