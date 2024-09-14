import { useState, useEffect, useReducer, createContext } from 'react'
import { Main } from './StyledComponents.tsx'
import { HSLtoPointer, textColorChange, check_Built_In_Color, updateOutput, inputRangeBG, reducer } from "./Functions.tsx"
import { SideBar } from './components/Aside.tsx'
import { HSL } from './components/ColorCode/HSL/HSL.tsx'
import { BG } from './StyledComponents.tsx'
import CMYK from './components/ColorCode/CMYK.tsx'
import RGB from './components/ColorCode/RGB.tsx'
import Hexa from './components/ColorCode/Hexa.tsx'
import OutPut from './components/ColorCode/OutPut.tsx'
import imgPath from '../public/tree.png'

import { outputType,ppType,rangeBGType,Context, builtInColorsType } from './type'

import json from "./builtInColors.json"

export const builtInColors:builtInColorsType={...json}

export const AppContext= createContext<Context>({} as Context)

export function App() {

    const [ColorCodes, dispatch]=useReducer(
        reducer,
        {H:210, LS:50, L:50, VS:0, V:0, Hexa:'', R:0, G:0, B:0, C:0, M:0, Y:0, K:0, opacity:1, trigger:0, boolean:true}
    )

    const [textColor, setTextColor] = useState<boolean>(true)
    const [aside, setAside] = useState<boolean>(false)
    const [HSLtoggle, setHSLtoggle]=useState<boolean>(true)
    const [builtInColor, setBuiltInColor] = useState<Array<string | null>>([])
    const [output, setOutput] = useState<outputType>({HSL:'',HSV:'',Hexa:'',RGB:'',CMYK:''})
    const [pointerPosition, setPointerPosition] = useState<ppType>({HSL_top:'',HSL_left:'',HSV_top:'',HSV_left:''})
    const [rangeBG, setRangeBG] = useState<rangeBGType>({LS:'',L:'',VS:'',V:'',R:'',G:'',B:'',C:'',M:'',Y:'',K:''})

    useEffect(()=>{

        dispatch({type:'HSLtoHSV',payload:null})
        dispatch({type:'HSLtoRGB',payload:null})
        dispatch({type:'RGBtoHexa',payload:null})
        dispatch({type:'RGBtoCMYK',payload:null})
        dispatch({type:'trigger', payload:true})

        // If put them in css, tree img shows up when loading page.
        document.body.style.background = `url(${imgPath})`;
        document.body.style.backgroundPositionX = `100px`;
        document.body.style.backgroundPositionY = `50px`;
        document.body.style.backgroundRepeat = `no-repeat`;

    }, [])

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
        
        <AppContext.Provider value={{ ColorCodes,dispatch, textColor,rangeBG,builtInColor,output,aside,pointerPosition,setAside, setPointerPosition, HSLtoggle, setHSLtoggle}}>
        
            <BG aside={aside?1:0} colorcodes={ColorCodes}/>
            <svg
                className='hamburger'
                width='35'
                height='22'
                fill={textColor? '#ffffff': '#000000'}
                onClick={()=>{setAside(true)}}
            >
                <path d="M0 0 h35 v4 h-35 Z"/>
                <path d="M0 9 h35 v4 h-35 Z"/>
                <path d="M0 18 h35 v4 h-35 Z"/>
            </svg>
            
            <SideBar/>

            <Main aside={aside?1:0} onClick={()=>aside && setAside(false)}>

                <OutPut/>

                <div className="flex">
                    <HSL/>
                    <div className="right">
                        <Hexa/>
                        <RGB/>
                        <CMYK/>
                    </div>
                </div>

            </Main>

        </AppContext.Provider>
    )
}