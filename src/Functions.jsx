
///////////////////////////// input change /////////////////////////////
export const sync_Input=(val)=>{
  val.type=="range"?
  val.parentElement.nextSibling.value=val.value :
  val.previousSibling.querySelector('input[type="range"]').value=val.value
}

///////////////////////////// HSL to HSV /////////////////////////////OK
// Wikipedia is the only source.
export const HSLtoHSV=(obj)=>{
  obj.V.current.value=100*(obj.L.current.value/100+(obj.LS.current.value/100)*Math.min(1-(obj.L.current.value/100), obj.L.current.value/100))
  
  obj.VS.current.value = obj.V.current.value==0?
  0 : 200*(1-obj.L.current.value/parseFloat(obj.V.current.value))
}

///////////////////////////// HSV to HSL /////////////////////////////ok
  // Wikipedia is the only source.
export const HSVtoHSL=(obj)=>{

  obj.L.current.value=100*((parseFloat(obj.V.current.value)/100)*(1-((parseFloat(obj.VS.current.value)/100)/2)))

  if(obj.L.current.value==0 || obj.L.current.value==100){
      obj.LS.current.value=0
  }else{
      obj.LS.current.value=100*(((parseFloat(obj.V.current.value)/100)-(obj.L.current.value/100))/Math.min(obj.L.current.value/100, 1-obj.L.current.value/100))
  }
}

///////////////////////////// HSL to RGB /////////////////////////////
export const HSLtoRGB=(obj)=>{
  // source1: https://www.peko-step.com/tool/hslrgb.html#ppick3
  // source2: https://yanohirota.com/color-converter/

  let L,H,fx,r,g,b;

  L=obj.L.current.value<50? obj.L.current.value:100-obj.L.current.value
  const max=2.55*(parseFloat(obj.L.current.value)+(L*obj.LS.current.value/100))
  const min=2.55*(parseFloat(obj.L.current.value)-(L*obj.LS.current.value/100))

  if(0<=obj.H.current.value && obj.H.current.value<60){
      
      H=obj.H.current.value
      fx=(H*(max-min)/60)+min
      r=max
      g=fx
      b=min
      
  }else if(60<=obj.H.current.value && obj.H.current.value<120){
      H=120-obj.H.current.value
      fx=(H*(max-min)/60)+min
      r=fx
      g=max
      b=min
      
  }else if(120<=obj.H.current.value && obj.H.current.value<180){
      H=obj.H.current.value-120
      fx=(H*(max-min)/60)+min
      r=min
      g=max
      b=fx
      
  }else if(180<=obj.H.current.value && obj.H.current.value<240){
      H=240-obj.H.current.value
      fx=(H*(max-min)/60)+min
      r=min
      g=fx
      b=max
      
  }else if(240<=obj.H.current.value && obj.H.current.value<300){
      H=obj.H.current.value-240
      fx=(H*(max-min)/60)+min
      r=fx
      g=min
      b=max

  }else if(300<=obj.H.current.value && obj.H.current.value<360){
      H=360-obj.H.current.value
      fx=(H*(max-min)/60)+min
      r=max
      g=min
      b=fx
  }

  obj.R.current.value=r
  obj.G.current.value=g
  obj.B.current.value=b
}


///////////////////////////// RGB to Hexa /////////////////////////////
export const RGBtoHexa=(obj)=>{

  let rgb=[Math.round(obj.R.current.value).toString(), Math.round(obj.G.current.value).toString(), Math.round(obj.B.current.value).toString()]
  let hexa="#";

  rgb.forEach((elm)=>{
    let quotient, remainder;
    let a=elm;
    let arr=[]
    while(a!==0){
        quotient=Math.floor(a/16)
        remainder=a%16

        switch(remainder){
            case 10:remainder="A"; break;
            case 11:remainder="B"; break;
            case 12:remainder="C"; break;
            case 13:remainder="D"; break;
            case 14:remainder="E"; break;
            case 15:remainder="F"
        }
        arr.push(remainder)
        a=quotient
        a==0 && arr.length==1 ? arr.push(a) : null
    }
    let code=String(arr[1])+arr[0]
  hexa+=code
  })

  obj.Hexa.current.value=hexa

}

///////////////////////////// RGB to CMYK /////////////////////////////ok
export const RGBtoCMYK=(obj)=>{
  //source: https://www.rapidtables.com/convert/color/rgb-to-cmyk.html
  
  // Using Math.round to avoid problem mentioned on the top of code.

  const r=Math.round(parseFloat(obj.R.current.value))/255
  const g=Math.round(parseFloat(obj.G.current.value))/255
  const b=Math.round(parseFloat(obj.B.current.value))/255

  let K=1-Math.max(r,g,b)
  let C=(1-r-K)*100/(1-K)
  let M=(1-g-K)*100/(1-K)
  let Y=(1-b-K)*100/(1-K)
  
  !K? K=0:null
  !C? C=0:null
  !M? M=0:null
  !Y? Y=0:null
  
  obj.C.current.value=C
  obj.M.current.value=M
  obj.Y.current.value=Y
  obj.K.current.value=K*100

}

///////////////////////////// RGB to HSL /////////////////////////////ok
export const RGBtoHSL=(obj)=>{
  /////////////////////////////////////////////////////////////////////
  //source1: https://www.rapidtables.com/convert/color/rgb-to-hsl.html
  //source2: Wikipedia
  
  const R=parseFloat(obj.R.current.value)/255
  const G=parseFloat(obj.G.current.value)/255
  const B=parseFloat(obj.B.current.value)/255
  
  const max=Math.max(R,G,B)
  const min=Math.min(R,G,B)
  const c=max-min
  let H;
  if(c==0){
      H=0
      H=obj.H.current.value
      //Putting current hue value instead of 0 to avoid sudden color change
  }else if(max==R){
      H=(((G-B)/c)%6)*60
  }else if(max==G){
      H=(((B-R)/c)+2)*60
  }else if(max==B){
      H=(((R-G)/c)+4)*60
  }

  H<0? H+=360:null
  
  obj.H.current.value=H
  obj.L.current.value=(max+min)*100/2
  obj.LS.current.value= c==0? 0 : c*100/(1-Math.abs(2*parseFloat(obj.L.current.value)/100-1))

}

///////////////////////////// Hexa to RGB /////////////////////////////ok
export const HexaToRGB=(obj)=>{
    
  let newArray=[];
  let a;
  for(let key in obj.Hexa.current.value){

      switch(obj.Hexa.current.value[key]){

          case "a": case "A": a=10;
          break;
          case "b": case "B": a=11;
          break;
          case "c": case "C": a=12;
          break;
          case "d": case "D": a=13;
          break;
          case "e": case "E": a=14;
          break;
          case "f": case "F": a=15;
          break;
          default: a=obj.Hexa.current.value[key];

      }

      newArray.push(parseInt(a))
  }

  obj.R.current.value=newArray[1]*16+newArray[2]
  obj.G.current.value=newArray[3]*16+newArray[4]
  obj.B.current.value=newArray[5]*16+newArray[6]
  
  //////////////// For comfirmation ////////////////

  let rgb=[parseFloat(obj.R.current.value).toString(), parseFloat(obj.G.current.value).toString(), parseFloat(obj.B.current.value).toString()]
  let hexa="#";
  rgb.forEach((elm)=>{
  let quotient, remainder;
  let a=elm;
  let arr=[]
  while(a!==0){
  quotient=Math.floor(a/16)
  remainder=a%16

  switch(remainder){
    case 10:remainder="A"; break;
    case 11:remainder="B"; break;
    case 12:remainder="C"; break;
    case 13:remainder="D"; break;
    case 14:remainder="E"; break;
    case 15:remainder="F"
  }
  arr.push(remainder)
  a=quotient
  a==0 && arr.length==1 ? arr.push(a) : null
  }
  let code=String(arr[1])+arr[0]
  hexa+=code
  })

// console.log("hexa Confirmation:",hexa)
}


///////////////////////////// CMYK to RGB /////////////////////////////ok
export const CMYKtoRGB=(obj)=>{
  //source: https://www.rapidtables.com/convert/color/cmyk-to-rgb.html
  
  obj.R.current.value=255*(1-parseFloat(obj.C.current.value)/100)*(1-parseFloat(obj.K.current.value)/100)
  obj.G.current.value=255*(1-parseFloat(obj.M.current.value)/100)*(1-parseFloat(obj.K.current.value)/100)
  obj.B.current.value=255*(1-parseFloat(obj.Y.current.value)/100)*(1-parseFloat(obj.K.current.value)/100)

}

///////////////////////////// Hue /////////////////////////////
  
export const colorSpaceBG=(obj,stts)=>{
    
  const hsl_1='hsl('+obj.H.current.value+',0%,50%)'
  const hsl_2='hsl('+obj.H.current.value+',100%,50%)'

  const hsv_2='hsl('+obj.H.current.value+',100%,50%)'
  stts.setCSBG(['linear-gradient(90deg, '+hsl_1+','+hsl_2+')', 'linear-gradient(90deg, white,'+hsv_2+')'])

}


///////////////////////////// HSL to pointer /////////////////////////////
export const HSLtoPointer=(obj,stts)=>{

  stts.setPointerPosition({
    HSL_top:Math.abs(obj.L.current.value*2-200)-12+"px",
    HSL_left:obj.LS.current.value*3.6-12+"px",
    HSV_top:Math.abs(obj.V.current.value*2-200)-12+"px",
    HSV_left:obj.VS.current.value*3.6-12+"px"
  })
}

///////////////////////////// text color /////////////////////////////
export const textColorChange=(obj,stts)=>{

  parseFloat(obj.L.current.value)<=50? stts.setTextColor(true) : stts.setTextColor(false)
}

///////////////////////////// BuiltIn color /////////////////////////////

export const builtInColor=(obj,stts)=>{
  stts.setCheckIfBuiltInColor(["--",null])
  Object.keys(stts.builtInColors).forEach((val)=>{
      
      obj.Hexa.current.value==stts.builtInColors[val]["hexa"] &&
      stts.setCheckIfBuiltInColor([val,stts.builtInColors[val]["hexa"]])
  })
}


export const Input=(ref, inputref)=>{
  inputref.H1.current.value=Math.round(ref.H.current.value)
  inputref.H2.current.value=Math.round(ref.H.current.value)
  inputref.LS1.current.value=Math.round(ref.LS.current.value)
  inputref.LS2.current.value=Math.round(ref.LS.current.value)
  inputref.L1.current.value=Math.round(ref.L.current.value)
  inputref.L2.current.value=Math.round(ref.L.current.value)

  inputref.VS1.current.value=Math.round(ref.VS.current.value)
  inputref.VS2.current.value=Math.round(ref.VS.current.value)
  inputref.V1.current.value=Math.round(ref.V.current.value)
  inputref.V2.current.value=Math.round(ref.V.current.value)

  inputref.R1.current.value=Math.round(ref.R.current.value)
  inputref.R2.current.value=Math.round(ref.R.current.value)
  inputref.G1.current.value=Math.round(ref.G.current.value)
  inputref.G2.current.value=Math.round(ref.G.current.value)
  inputref.B1.current.value=Math.round(ref.B.current.value)
  inputref.B2.current.value=Math.round(ref.B.current.value)

  inputref.C1.current.value=Math.round(ref.C.current.value)
  inputref.C2.current.value=Math.round(ref.C.current.value)
  inputref.M1.current.value=Math.round(ref.M.current.value)
  inputref.M2.current.value=Math.round(ref.M.current.value)
  inputref.Y1.current.value=Math.round(ref.Y.current.value)
  inputref.Y2.current.value=Math.round(ref.Y.current.value)
  inputref.K1.current.value=Math.round(ref.K.current.value)
  inputref.K2.current.value=Math.round(ref.K.current.value)
}


///////////////////////////// output color /////////////////////////////
export const outputColor=(inputRef, outputRef, showcolorRef)=>{

  const hsl=`hsla(${inputRef.H2.current.value},${inputRef.LS2.current.value}%,${inputRef.L2.current.value}%,${inputRef.OP2.current.value})`

  showcolorRef.current.style.background=hsl

document.querySelector("body").style.background=hsl

let hexa=""
if(inputRef.OP2.current.value!==1){
  let quotient,remainder;
  let a=Math.round(inputRef.OP2.current.value*255)

    let arr=[]

        while(a!==0){
          quotient=Math.floor(a/16)
          remainder=a%16
      
      switch(remainder){
          case 10:remainder="A"; break;
          case 11:remainder="B"; break;
          case 12:remainder="C"; break;
          case 13:remainder="D"; break;
          case 14:remainder="E"; break;
          case 15:remainder="F"
      }
            arr.push(remainder)
            a=quotient
            a==0 && arr.length==1 ? arr.push(a):null
            
        }
        hexa=String(arr[1])+arr[0]
        
        hexa=="undefinedundefined"? hexa="00":null
        
}

let h=inputRef.H2.current.value;
let sl=inputRef.LS2.current.value;
let l=inputRef.L2.current.value;
let sv=inputRef.VS2.current.value;
let v=inputRef.V2.current.value;

sl==0 || l==0 || l==100 ? h=0:null

if(l==0 || l==100){
    sl=0
    sv=0
}

let r=inputRef.R2.current.value;
let g=inputRef.G2.current.value;
let b=inputRef.B2.current.value;

let c,m,y;

let k=inputRef.K2.current.value;
if(k==100){
    c=0;
    m=0;
    y=0;
    
}else{
    c=inputRef.C2.current.value;
    m=inputRef.M2.current.value;
    y=inputRef.Y2.current.value;
}

c==100 && m==100 && y==100? k=0:null

if(inputRef.OP2.current.value==1){
  outputRef.HSL.current.value=`hsl(${h}, ${sl}%, ${l}%)`
  outputRef.HSV.current.value=`hsv(${h}, ${sv}%, ${v}%)`
  outputRef.Hexa.current.value=`${inputRef.Hexa.current.value.toUpperCase()}`
  outputRef.RGB.current.value=`rgb(${r}, ${g}, ${b})`
  outputRef.CMYK.current.value=`cmyk(${c}%, ${m}%, ${y}%, ${k}%)`
    
}else{
  outputRef.HSL.current.value=`hsla(${h}, ${sl}%, ${l}%, ${inputRef.OP2.current.value})`
  outputRef.HSV.current.value=`hsva(${h}, ${sv}%, ${v}%, ${inputRef.OP2.current.value})`
  outputRef.Hexa.current.value=`${inputRef.Hexa.current.value.toUpperCase()}${hexa}`
  outputRef.RGB.current.value=`rgba(${r}, ${g}, ${b}, ${inputRef.OP2.current.value})`
  outputRef.CMYK.current.value=`cmyk(${c}%, ${m}%, ${y}%, ${k}%)`
}

}

///////////////////////////// input range background /////////////////////////////
  
const SandLforSv=(Sv,ob)=>{ // Function to get bgcolor of Sv range input
  const L=100*((parseFloat(ob.V2.current.value)/100)*(1-((Sv/100)/2)))
  let S;
      S= (L==0 || L==100)? 0 : 100*(((parseFloat(ob.V2.current.value)/100)-(L/100))/Math.min(L/100, 1-L/100))
      return [S,L]
}

const SandLforV=(V,ob)=>{ // Function to get bgcolor of V range input
  const L=100*((V/100)*(1-((parseFloat(ob.VS2.current.value)/100)/2)))
  let S;

  S= (L==0 || L==100)? 0 : 100*(((V/100)-(L/100))/Math.min(L/100, 1-L/100))

  return [S,L]
  
}
const CMYKbgColor=(c,m,y,k)=>{
  return `rgb(${255*(1-c/100)*(1-k/100)},${255*(1-m/100)*(1-k/100)},${255*(1-y/100)*(1-k/100)})`
}

export const inputRangeBG=(obj,stts)=>{ //Main function
  const HSL_Sleft=`hsl(0,0%,${parseFloat(obj.L2.current.value)}%)`
  const HSL_Sright=`hsl(${obj.H2.current.value},100%,${parseFloat(obj.L2.current.value)}%)`
  const LSbg=`linear-gradient(90deg, ${HSL_Sleft},${HSL_Sright})`

  const HSL_Lmiddle=`hsl(${obj.H2.current.value},${obj.LS2.current.value}%,50%)`
  const Lbg=`linear-gradient(90deg, hsl(0,0%,0%), ${HSL_Lmiddle}, hsl(0,0%,100%))`
  //////////// HSV ////////////
  // hsv(any, 0% value)   : left of Sv
  // hsv(hue, 100% value) : right of Sv

  // hsv(any, Sv 0%)   : left of V
  // hsv(hue, Sv 100%) : right of V

  // Convert them to hsl, Use the same method as HSVtoSHL function

  // Sv
  const hsvSleft=`hsl(0,${SandLforSv(0,obj)[0]}%,${SandLforSv(0,obj)[1]}%)`
  const hsvSRight=`hsl(${obj.H2.current.value},${SandLforSv(100,obj)[0]}%,${SandLforSv(100,obj)[1]}%)`

  const VSbg=`linear-gradient(90deg, ${hsvSleft}, ${hsvSRight})`

  // V
  const hsvVleft=`hsl(0,${SandLforV(0,obj)[0]}%,${SandLforV(0,obj)[1]}%)`
  const hsvVRight=`hsl(${obj.H2.current.value},${SandLforV(100,obj)[0]}%,${SandLforV(100,obj)[1]}%)`

  const Vbg=`linear-gradient(90deg, ${hsvVleft}, ${hsvVRight})`

  // RGB
  const rgbRleft=`rgb(0,${parseFloat(obj.G2.current.value)},${parseFloat(obj.B2.current.value)})`
  const rgbRright=`rgb(255,${parseFloat(obj.G2.current.value)},${parseFloat(obj.B2.current.value)})`

  const Rbg=`linear-gradient(90deg, ${rgbRleft}, ${rgbRright})`

  const rgbGleft=`rgb(${parseFloat(obj.R2.current.value)},0,${parseFloat(obj.B2.current.value)})`
  const rgbGright=`rgb(${parseFloat(obj.R2.current.value)},255,${parseFloat(obj.B2.current.value)})`
  const Gbg=`linear-gradient(90deg, ${rgbGleft}, ${rgbGright})`

  const rgbBleft=`rgb(${parseFloat(obj.R2.current.value)},${parseFloat(obj.G2.current.value)},0)`
  const rgbBright=`rgb(${parseFloat(obj.R2.current.value)},${parseFloat(obj.G2.current.value)},255)`

  const Bbg=`linear-gradient(90deg, ${rgbBleft}, ${rgbBright})`

  // CMYK
  const Cleft=CMYKbgColor(0,parseFloat(obj.M2.current.value),parseFloat(obj.Y2.current.value),parseFloat(obj.K2.current.value))
  const Cright=CMYKbgColor(100,parseFloat(obj.M2.current.value),parseFloat(obj.Y2.current.value),parseFloat(obj.K2.current.value))
  
  const Cbg=`linear-gradient(90deg, ${Cleft}, ${Cright})`

  const Mleft=CMYKbgColor(parseFloat(obj.C2.current.value),0,parseFloat(obj.Y2.current.value),parseFloat(obj.K2.current.value))
  const Mright=CMYKbgColor(parseFloat(obj.C2.current.value),100,parseFloat(obj.Y2.current.value),parseFloat(obj.K2.current.value))
  
  const Mbg=`linear-gradient(90deg, ${Mleft}, ${Mright})`

  const Yleft=CMYKbgColor(parseFloat(obj.C2.current.value),parseFloat(obj.M2.current.value),0,parseFloat(obj.K2.current.value))
  const Yright=CMYKbgColor(parseFloat(obj.C2.current.value),parseFloat(obj.M2.current.value),100,parseFloat(obj.K2.current.value))
  
  const Ybg=`linear-gradient(90deg, ${Yleft}, ${Yright})`

  const Kleft=CMYKbgColor(parseFloat(obj.C2.current.value),parseFloat(obj.M2.current.value),parseFloat(obj.Y2.current.value),0)
  const Kright=CMYKbgColor(parseFloat(obj.C2.current.value),parseFloat(obj.M2.current.value),parseFloat(obj.Y2.current.value),100)
  
  const Kbg=`linear-gradient(90deg, ${Kleft}, ${Kright})`

  stts.setRangeBG({LS:LSbg,L:Lbg,VS:VSbg,V:Vbg, R:Rbg,B:Bbg,G:Gbg,C:Cbg,M:Mbg,Y:Ybg,K:Kbg})
  
}