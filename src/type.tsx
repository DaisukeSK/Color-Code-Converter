export type builtInColorsType={
    [key:string]:{hexa:string,letterColor?: string}
}

export type outputType={
    HSL:string,HSV:string,Hexa:string,RGB:string,CMYK:string
}

export type ppType={
    HSL_top:string,HSL_left:string,HSV_top:string,HSV_left:string
}

export type rangeBGType={
    LS:string,L:string,VS:string,V:string,R:string,G:string,B:string,C:string,M:string,Y:string,K:string
}

export type CCs= {H:number,LS:number,L:number,VS:number,V:number,Hexa:string,R:number,G:number,B:number,C:number,M:number,Y:number,K:number,opacity:number,trigger:number,boolean:boolean}
// export type CCs= {[key:string]:number|string|boolean|null}



export type Context={
    ColorCodes:CCs,
    dispatch:(cc:actionType)=>void,
    showColor_Ref:React.RefObject<HTMLDivElement>,
    textColor:boolean,
    rangeBG:rangeBGType,
    builtInColor:Array<string | null>,
    output:outputType,
    aside:boolean,
    pointerPosition:ppType,
    setAside:(aside:boolean)=>void,
    setPointerPosition:(pp:ppType)=>void
}


// export type actionType ={
//     type:string,
//     payload:number|boolean|null|string
// }



export type actionType={
    type:'trigger',
    payload:boolean
  } | {
    type:'opacity',
    payload:number
  } | {
    type:'CMYKtoRGB',
    payload:null
  } | {
    type:'RGBtoHSL',
    payload:null
  } | {
    type:'HexaToRGB',
    payload:null
  } | {
    type:'RGBtoCMYK',
    payload:null
  } | {
    type:'RGBtoHexa',
    payload:null
  } | {
    type:'HSLtoRGB',
    payload:null
  } | {
    type:'HSLtoHSV',
    payload:null
  } | {
    type:'HSVtoHSL',
    payload:null
  } | {
    type:'H',
    payload:number
  } | {
    type:'LS',
    payload:number
  } | {
    type:'L',
    payload:number
  } | {
    type:'VS',
    payload:number
  } | {
    type:'V',
    payload:number
  } | {
    type:'Hexa',
    payload:string
  } | {
    type:'R',
    payload:number
  } | {
    type:'G',
    payload:number
  } | {
    type:'B',
    payload:number
  } | {
    type:'C',
    payload:number
  } | {
    type:'M',
    payload:number
  } | {
    type:'Y',
    payload:number
  } | {
    type:'K',
    payload:number
  }