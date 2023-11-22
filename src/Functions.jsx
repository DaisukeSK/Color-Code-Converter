
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

  // H<0? H+=360:null
  H<0 && (H+=360)
  
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
export const textColorChange=(obj,states)=>{

  parseFloat(obj.L.current.value)<=50? states.setTextColor(true) : states.setTextColor(false)
}

///////////////////////////// BuiltIn color /////////////////////////////

export const check_Built_In_Color=(obj,states)=>{
  states.setBuiltInColor(["--",null])
  Object.keys(states.builtInColors).forEach((val)=>{
      
      obj.Hexa.current.value==states.builtInColors[val]["hexa"] &&
      states.setBuiltInColor([val,states.builtInColors[val]["hexa"]])
  })
}


// export const updateInput=(ref, inputref)=>{
  // inputref.H1.current.value=Math.round(ref.H.current.value)
  // inputref.H2.current.value=Math.round(ref.H.current.value)
  // inputref.LS1.current.value=Math.round(ref.LS.current.value)
  // inputref.LS2.current.value=Math.round(ref.LS.current.value)
  // inputref.L1.current.value=Math.round(ref.L.current.value)
  // inputref.L2.current.value=Math.round(ref.L.current.value)

  // inputref.VS1.current.value=Math.round(ref.VS.current.value)
  // inputref.VS2.current.value=Math.round(ref.VS.current.value)
  // inputref.V1.current.value=Math.round(ref.V.current.value)
  // inputref.V2.current.value=Math.round(ref.V.current.value)

  // inputref.R1.current.value=Math.round(ref.R.current.value)
  // inputref.R2.current.value=Math.round(ref.R.current.value)
  // inputref.G1.current.value=Math.round(ref.G.current.value)
  // inputref.G2.current.value=Math.round(ref.G.current.value)
  // inputref.B1.current.value=Math.round(ref.B.current.value)
  // inputref.B2.current.value=Math.round(ref.B.current.value)

  // inputref.C1.current.value=Math.round(ref.C.current.value)
  // inputref.C2.current.value=Math.round(ref.C.current.value)
  // inputref.M1.current.value=Math.round(ref.M.current.value)
  // inputref.M2.current.value=Math.round(ref.M.current.value)
  // inputref.Y1.current.value=Math.round(ref.Y.current.value)
  // inputref.Y2.current.value=Math.round(ref.Y.current.value)
  // inputref.K1.current.value=Math.round(ref.K.current.value)
  // inputref.K2.current.value=Math.round(ref.K.current.value)
// }


///////////////////////////// output color /////////////////////////////
export const updateOutput=(refs, inputRef, showcolorRef,setter)=>{

  // console.log(inputRef.LS2.current.value, refs.LS.current.value,)

  const hsl=`hsla(${Math.round(refs.H.current.value)},${Math.round(refs.LS.current.value)}%,${Math.round(refs.L.current.value)}%,${inputRef.OP2.current.value})`

  showcolorRef.current.style.background=hsl

document.body.style.background=hsl

// if(inputRef.OP2.current.value!==1){
  
        
// }

let h=Math.round(refs.H.current.value);
let sl=Math.round(refs.LS.current.value);
let l=Math.round(refs.L.current.value);
let sv=Math.round(refs.VS.current.value);
let v=Math.round(refs.V.current.value);

sl==0 || l==0 || l==100 ? h=0:null

if(l==0 || l==100){
    sl=0
    sv=0
}

let r=Math.round(refs.R.current.value);
let g=Math.round(refs.G.current.value);
let b=Math.round(refs.B.current.value);

let c,m,y;

let k=Math.round(refs.K.current.value);
if(k==100){
    c=0;
    m=0;
    y=0;
    
}else{
    c=Math.round(refs.C.current.value);
    m=Math.round(refs.M.current.value);
    y=Math.round(refs.Y.current.value);
}

c==100 && m==100 && y==100? k=0:null

if(inputRef.OP2.current.value==1){
  // outputRef.HSL.current.value=`hsl(${h}, ${sl}%, ${l}%)`
  // outputRef.HSV.current.value=`hsv(${h}, ${sv}%, ${v}%)`
  // outputRef.Hexa.current.value=`${inputRef.Hexa.current.value.toUpperCase()}`
  // outputRef.RGB.current.value=`rgb(${r}, ${g}, ${b})`
  // outputRef.CMYK.current.value=`cmyk(${c}%, ${m}%, ${y}%, ${k}%)`

  setter({
    HSL:`hsl(${h}, ${sl}%, ${l}%)`,
    HSV:`hsv(${h}, ${sv}%, ${v}%)`,
    Hexa:`${inputRef.Hexa.current.value.toUpperCase()}`,
    RGB:`rgb(${r}, ${g}, ${b})`,
    CMYK:`cmyk(${c}%, ${m}%, ${y}%, ${k}%)`
  })
    
}else{
  // outputRef.HSL.current.value=`hsla(${h}, ${sl}%, ${l}%, ${inputRef.OP2.current.value})`
  // outputRef.HSV.current.value=`hsva(${h}, ${sv}%, ${v}%, ${inputRef.OP2.current.value})`
  // outputRef.Hexa.current.value=`${inputRef.Hexa.current.value.toUpperCase()}${hexa}`
  // outputRef.RGB.current.value=`rgba(${r}, ${g}, ${b}, ${inputRef.OP2.current.value})`
  // outputRef.CMYK.current.value=`cmyk(${c}%, ${m}%, ${y}%, ${k}%)`
  let hexa=""
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
        
        // hexa=="undefinedundefined"? hexa="00":null
        hexa=="undefinedundefined" && (hexa="00")

  setter({
    HSL:`hsla(${h}, ${sl}%, ${l}%, ${inputRef.OP2.current.value})`,
    HSV:`hsva(${h}, ${sv}%, ${v}%, ${inputRef.OP2.current.value})`,
    Hexa:`${inputRef.Hexa.current.value.toUpperCase()}${hexa}`,
    RGB:`rgba(${r}, ${g}, ${b}, ${inputRef.OP2.current.value})`,
    CMYK:`cmyk(${c}%, ${m}%, ${y}%, ${k}%)`
  })
}

}

///////////////////////////// input range background /////////////////////////////
  
const SandLforSv=(Sv,ob)=>{ // Function to get bgcolor of Sv range input
  const L=100*(((ob.V.current.value)/100)*(1-((Sv/100)/2)))
  let S;
      S= (L==0 || L==100)? 0 : 100*((((ob.V.current.value)/100)-(L/100))/Math.min(L/100, 1-L/100))
      return [S,L]
}

const SandLforV=(V,ob)=>{ // Function to get bgcolor of V range input
  const L=100*((V/100)*(1-(((ob.VS.current.value)/100)/2)))
  let S;

  S= (L==0 || L==100)? 0 : 100*(((V/100)-(L/100))/Math.min(L/100, 1-L/100))

  return [S,L]
  
}
const CMYKbgColor=(c,m,y,k)=>{
  return `rgb(${Math.round(255*(1-c/100)*(1-k/100))},${Math.round(255*(1-m/100)*(1-k/100))},${Math.round(255*(1-y/100)*(1-k/100))})`
}

export const inputRangeBG=(refs, obj,stts)=>{ //Main function

  // console.log(refs.H.current.value, typeof refs.H.current.value, Math.round(refs.H.current.value))

  const LS_left=`hsl(0,0%,${Math.round(refs.L.current.value)}%)`
  const LS_right=`hsl(${Math.round(refs.H.current.value)},100%,${Math.round(refs.L.current.value)}%)`
  const LS_bg=`linear-gradient(90deg, ${LS_left},${LS_right})`

  const L_middle=`hsl(${Math.round(refs.H.current.value)},${Math.round(refs.LS.current.value)}%,50%)`
  const L_bg=`linear-gradient(90deg, hsl(0,0%,0%), ${L_middle}, hsl(0,0%,100%))`
  //////////// HSV ////////////
  // hsv(any, 0% value)   : left of Sv
  // hsv(hue, 100% value) : right of Sv

  // hsv(any, Sv 0%)   : left of V
  // hsv(hue, Sv 100%) : right of V

  // Convert them to hsl, Use the same method as HSVtoSHL function

  // Sv
  const VS_left=`hsl(0,${Math.round(SandLforSv(0,refs)[0])}%,${Math.round(SandLforSv(0,refs)[1])}%)`
  const VS_Right=`hsl(${Math.round(refs.H.current.value)},${Math.round(SandLforSv(100,refs)[0])}%,${Math.round(SandLforSv(100,refs)[1])}%)`

  const VS_bg=`linear-gradient(90deg, ${VS_left}, ${VS_Right})`

  // V
  const V_left=`hsl(0,${Math.round(SandLforV(0,refs)[0])}%,${Math.round(SandLforV(0,refs)[1])}%)`
  const V_Right=`hsl(${Math.round(refs.H.current.value)},${Math.round(SandLforV(100,refs)[0])}%,${Math.round(SandLforV(100,refs)[1])}%)`

  const V_bg=`linear-gradient(90deg, ${V_left}, ${V_Right})`

  // RGB
  const R_left=`rgb(0,${Math.round(refs.G.current.value)},${Math.round(refs.B.current.value)})`
  const R_right=`rgb(255,${Math.round(refs.G.current.value)},${Math.round(refs.B.current.value)})`
  const R_bg=`linear-gradient(90deg, ${R_left}, ${R_right})`

  const G_left=`rgb(${Math.round(refs.R.current.value)},0,${Math.round(refs.B.current.value)})`
  const G_right=`rgb(${Math.round(refs.R.current.value)},255,${Math.round(refs.B.current.value)})`
  const G_bg=`linear-gradient(90deg, ${G_left}, ${G_right})`

  const B_left=`rgb(${Math.round(refs.R.current.value)},${Math.round(refs.G.current.value)},0)`
  const B_right=`rgb(${Math.round(refs.R.current.value)},${Math.round(refs.G.current.value)},255)`
  const B_bg=`linear-gradient(90deg, ${B_left}, ${B_right})`

  // CMYK
  const C_left=CMYKbgColor(0,(refs.M.current.value),(refs.Y.current.value),(refs.K.current.value))
  const C_right=CMYKbgColor(100,(refs.M.current.value),(refs.Y.current.value),(refs.K.current.value))
  
  const C_bg=`linear-gradient(90deg, ${C_left}, ${C_right})`

  const M_left=CMYKbgColor((refs.C.current.value),0,(refs.Y.current.value),(refs.K.current.value))
  const M_right=CMYKbgColor((refs.C.current.value),100,(refs.Y.current.value),(refs.K.current.value))
  
  const M_bg=`linear-gradient(90deg, ${M_left}, ${M_right})`

  const Y_left=CMYKbgColor((refs.C.current.value),(refs.M.current.value),0,(refs.K.current.value))
  const Y_right=CMYKbgColor((refs.C.current.value),(refs.M.current.value),100,(refs.K.current.value))
  
  const Y_bg=`linear-gradient(90deg, ${Y_left}, ${Y_right})`

  const K_left=CMYKbgColor((refs.C.current.value),(refs.M.current.value),(refs.Y.current.value),0)
  const K_right=CMYKbgColor((refs.C.current.value),(refs.M.current.value),(refs.Y.current.value),100)
  
  const K_bg=`linear-gradient(90deg, ${K_left}, ${K_right})`

  stts.setRangeBG({LS:LS_bg,L:L_bg,VS:VS_bg,V:V_bg, R:R_bg,B:B_bg,G:G_bg,C:C_bg,M:M_bg,Y:Y_bg,K:K_bg})
  
}