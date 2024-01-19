
///////////////////////////// input change /////////////////////////////
export const sync_Input=(val)=>{
  val.type=="range"?
  val.parentElement.nextSibling.value=val.value :
  val.previousSibling.querySelector('input[type="range"]').value=val.value
}

///////////////////////////// Hue /////////////////////////////
  
// export const colorSpaceBG=(ColorCodes,setCSBG)=>{
    
//   const hsl_1='hsl('+ColorCodes.H+',0%,50%)'
//   const hsl_2='hsl('+ColorCodes.H+',100%,50%)'

//   const hsv_2='hsl('+ColorCodes.H+',100%,50%)'
//   setCSBG(['linear-gradient(90deg, '+hsl_1+','+hsl_2+')', 'linear-gradient(90deg, white,'+hsv_2+')'])

// }


///////////////////////////// HSL to pointer /////////////////////////////
export const HSLtoPointer=(ColorCodes,setPointerPosition)=>{

  setPointerPosition({
    HSL_top:Math.abs(ColorCodes.L*2-200)-12+"px",
    HSL_left:ColorCodes.LS*3.6-12+"px",
    HSV_top:Math.abs(ColorCodes.V*2-200)-12+"px",
    HSV_left:ColorCodes.VS*3.6-12+"px"
  })
}

///////////////////////////// text color /////////////////////////////
export const textColorChange=(ColorCodes,setTextColor)=>{

  // console.log("ColorCodes.L",ColorCodes?.L);

  ColorCodes.L<=50? setTextColor(true) : setTextColor(false)
}

///////////////////////////// BuiltIn color /////////////////////////////

export const check_Built_In_Color=(ColorCodes,builtInColors,setBuiltInColor)=>{
  setBuiltInColor(["--",null])
  Object.keys(builtInColors).forEach((val)=>{
      
      ColorCodes.Hexa==builtInColors[val]["hexa"] &&
      setBuiltInColor([val,builtInColors[val]["hexa"]])
  })
}


///////////////////////////// output color /////////////////////////////
export const updateOutput=(ColorCodes, showcolorRef,setter)=>{

  const hsl=`hsla(${Math.round(ColorCodes.H)},${Math.round(ColorCodes.LS)}%,${Math.round(ColorCodes.L)}%,${ColorCodes.opacity})`

  showcolorRef.current.style.background=hsl

let h=Math.round(ColorCodes.H);
let sl=Math.round(ColorCodes.LS);
let l=Math.round(ColorCodes.L);
let sv=Math.round(ColorCodes.VS);
let v=Math.round(ColorCodes.V);

sl==0 || l==0 || l==100 ? h=0:null

if(l==0 || l==100){
    sl=0
    sv=0
}

let r=Math.round(ColorCodes.R);
let g=Math.round(ColorCodes.G);
let b=Math.round(ColorCodes.B);

let c,m,y;

let k=Math.round(ColorCodes.K);
if(k==100){
    c=0;
    m=0;
    y=0;
    
}else{
    c=Math.round(ColorCodes.C);
    m=Math.round(ColorCodes.M);
    y=Math.round(ColorCodes.Y);
}

c==100 && m==100 && y==100? k=0:null

if(ColorCodes.opacity==1){

  setter({
    HSL:`hsl(${h}, ${sl}%, ${l}%)`,
    HSV:`hsv(${h}, ${sv}%, ${v}%)`,
    // Hexa:`${ColorCodes.Hexa.toUpperCase()}`,
    Hexa:`${ColorCodes.Hexa}`,
    RGB:`rgb(${r}, ${g}, ${b})`,
    CMYK:`cmyk(${c}%, ${m}%, ${y}%, ${k}%)`
  })
    
}else{

  let hexa=""
  let quotient,remainder;
  let a=Math.round(ColorCodes.opacity*255)

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
        
        hexa=="undefinedundefined" && (hexa="00")

  setter({
    HSL:`hsla(${h}, ${sl}%, ${l}%, ${ColorCodes.opacity})`,
    HSV:`hsva(${h}, ${sv}%, ${v}%, ${ColorCodes.opacity})`,
    // Hexa:`${ColorCodes.Hexa.toUpperCase()}${hexa}`,
    Hexa:`${ColorCodes.Hexa}${hexa}`,
    RGB:`rgba(${r}, ${g}, ${b}, ${ColorCodes.opacity})`,
    CMYK:`cmyk(${c}%, ${m}%, ${y}%, ${k}%)`
  })
}

}

///////////////////////////// input range background /////////////////////////////
  
const SandLforSv=(Sv,ob)=>{ // Function to get bgcolor of Sv range input
  const L=100*(((ob.V)/100)*(1-((Sv/100)/2)))
  let S;
      S= (L==0 || L==100)? 0 : 100*((((ob.V)/100)-(L/100))/Math.min(L/100, 1-L/100))
      return [S,L]
}

const SandLforV=(V,ob)=>{ // Function to get bgcolor of V range input
  const L=100*((V/100)*(1-(((ob.VS)/100)/2)))
  let S;

  S= (L==0 || L==100)? 0 : 100*(((V/100)-(L/100))/Math.min(L/100, 1-L/100))

  return [S,L]
  
}
const CMYKbgColor=(c,m,y,k)=>{
  return `rgb(${Math.round(255*(1-c/100)*(1-k/100))},${Math.round(255*(1-m/100)*(1-k/100))},${Math.round(255*(1-y/100)*(1-k/100))})`
}

export const inputRangeBG=(ColorCodes,setRangeBG)=>{ //Main function

  const LS_left=`hsl(0,0%,${Math.round(ColorCodes.L)}%)`
  const LS_right=`hsl(${Math.round(ColorCodes.H)},100%,${Math.round(ColorCodes.L)}%)`
  const LS_bg=`linear-gradient(90deg, ${LS_left},${LS_right})`

  const L_middle=`hsl(${Math.round(ColorCodes.H)},${Math.round(ColorCodes.LS)}%,50%)`
  const L_bg=`linear-gradient(90deg, hsl(0,0%,0%), ${L_middle}, hsl(0,0%,100%))`
  
  // Sv
  const VS_left=`hsl(0,${Math.round(SandLforSv(0,ColorCodes)[0])}%,${Math.round(SandLforSv(0,ColorCodes)[1])}%)`
  const VS_Right=`hsl(${Math.round(ColorCodes.H)},${Math.round(SandLforSv(100,ColorCodes)[0])}%,${Math.round(SandLforSv(100,ColorCodes)[1])}%)`

  const VS_bg=`linear-gradient(90deg, ${VS_left}, ${VS_Right})`

  // V
  const V_left=`hsl(0,${Math.round(SandLforV(0,ColorCodes)[0])}%,${Math.round(SandLforV(0,ColorCodes)[1])}%)`
  const V_Right=`hsl(${Math.round(ColorCodes.H)},${Math.round(SandLforV(100,ColorCodes)[0])}%,${Math.round(SandLforV(100,ColorCodes)[1])}%)`

  const V_bg=`linear-gradient(90deg, ${V_left}, ${V_Right})`

  // RGB
  const R_left=`rgb(0,${Math.round(ColorCodes.G)},${Math.round(ColorCodes.B)})`
  const R_right=`rgb(255,${Math.round(ColorCodes.G)},${Math.round(ColorCodes.B)})`
  const R_bg=`linear-gradient(90deg, ${R_left}, ${R_right})`

  const G_left=`rgb(${Math.round(ColorCodes.R)},0,${Math.round(ColorCodes.B)})`
  const G_right=`rgb(${Math.round(ColorCodes.R)},255,${Math.round(ColorCodes.B)})`
  const G_bg=`linear-gradient(90deg, ${G_left}, ${G_right})`

  const B_left=`rgb(${Math.round(ColorCodes.R)},${Math.round(ColorCodes.G)},0)`
  const B_right=`rgb(${Math.round(ColorCodes.R)},${Math.round(ColorCodes.G)},255)`
  const B_bg=`linear-gradient(90deg, ${B_left}, ${B_right})`

  // CMYK
  const C_left=CMYKbgColor(0,(ColorCodes.M),(ColorCodes.Y),(ColorCodes.K))
  const C_right=CMYKbgColor(100,(ColorCodes.M),(ColorCodes.Y),(ColorCodes.K))
  
  const C_bg=`linear-gradient(90deg, ${C_left}, ${C_right})`

  const M_left=CMYKbgColor((ColorCodes.C),0,(ColorCodes.Y),(ColorCodes.K))
  const M_right=CMYKbgColor((ColorCodes.C),100,(ColorCodes.Y),(ColorCodes.K))
  
  const M_bg=`linear-gradient(90deg, ${M_left}, ${M_right})`

  const Y_left=CMYKbgColor((ColorCodes.C),(ColorCodes.M),0,(ColorCodes.K))
  const Y_right=CMYKbgColor((ColorCodes.C),(ColorCodes.M),100,(ColorCodes.K))
  
  const Y_bg=`linear-gradient(90deg, ${Y_left}, ${Y_right})`

  const K_left=CMYKbgColor((ColorCodes.C),(ColorCodes.M),(ColorCodes.Y),0)
  const K_right=CMYKbgColor((ColorCodes.C),(ColorCodes.M),(ColorCodes.Y),100)
  
  const K_bg=`linear-gradient(90deg, ${K_left}, ${K_right})`

  setRangeBG({LS:LS_bg,L:L_bg,VS:VS_bg,V:V_bg, R:R_bg,B:B_bg,G:G_bg,C:C_bg,M:M_bg,Y:Y_bg,K:K_bg})
  
}

export const reducer=(state,action)=>{

  switch(action.type){

    case 'H': return {...state, H:action.payload}
    case 'LS': return {...state, LS:action.payload}
    case 'L': return {...state, L:action.payload}
    case 'VS': return {...state, VS:action.payload}
    case 'V': return {...state, V:action.payload}

    case 'R': return {...state, R:action.payload}
    case 'G': return {...state, G:action.payload}
    case 'B': return {...state, B:action.payload}

    case 'Hexa': return {...state, Hexa:action.payload}

    case 'C': return {...state, C:action.payload}
    case 'M': return {...state, M:action.payload}
    case 'Y': return {...state, Y:action.payload}
    case 'K': return {...state, K:action.payload}
    
    case 'HSLtoHSV':// Wikipedia is the only source.
      
      const V=100*(state.L/100+(state.LS/100)*Math.min(1-(state.L/100), state.L/100))
      const VS = V==0?
      0 : 200*(1-state.L/V)
      return {...state,VS:VS,V:V}


    case 'HSVtoHSL':// Wikipedia is the only source.

    console.log("parseFloat:",parseFloat(state.V),state.V)
    
      const L2=100*((state.V/100)*(1-((state.VS/100)/2)))

      let LS=(L2==0 || L2==100)?
      0:100*(((state.V/100)-(L2/100))/Math.min(L2/100, 1-L2/100))

      return {...state, LS:LS,L:L2}

    case 'HSLtoRGB':
      // source1: https://www.peko-step.com/tool/hslrgb.html#ppick3
      // source2: https://yanohirota.com/color-converter/

      let L,H,fx,r,g,b;

      L=state.L<50? state.L:100-state.L
      const max=2.55*(state.L+(L*state.LS/100))
      const min=2.55*(state.L-(L*state.LS/100))

      if(0<=state.H && state.H<60){
          
          H=state.H
          fx=(H*(max-min)/60)+min
          r=max
          g=fx
          b=min
          
      }else if(60<=state.H && state.H<120){
          H=120-state.H
          fx=(H*(max-min)/60)+min
          r=fx
          g=max
          b=min
          
      }else if(120<=state.H && state.H<180){
          H=state.H-120
          fx=(H*(max-min)/60)+min
          r=min
          g=max
          b=fx
          
      }else if(180<=state.H && state.H<240){
          H=240-state.H
          fx=(H*(max-min)/60)+min
          r=min
          g=fx
          b=max
          
      }else if(240<=state.H && state.H<300){
          H=state.H-240
          fx=(H*(max-min)/60)+min
          r=fx
          g=min
          b=max

      }else if(300<=state.H && state.H<360){
          H=360-state.H
          fx=(H*(max-min)/60)+min
          r=max
          g=min
          b=fx
      }

      return {...state,R:r,G:g,B:b}

    case 'RGBtoHexa':

      let rgb=[Math.round(state.R).toString(), Math.round(state.G).toString(), Math.round(state.B).toString()]

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
      return {...state, Hexa:hexa}

    case 'RGBtoCMYK':
      //source: https://www.rapidtables.com/convert/color/rgb-to-cmyk.html
  
  // Using Math.round to avoid problem mentioned on the top of code.  ??

      const rr=Math.round(state.R)/255
      const gg=Math.round(state.G)/255
      const bb=Math.round(state.B)/255

      let K=1-Math.max(rr,gg,bb)
      let C=(1-rr-K)*100/(1-K)
      let M=(1-gg-K)*100/(1-K)
      let Y=(1-bb-K)*100/(1-K)
      
      !K? K=0:null
      !C? C=0:null
      !M? M=0:null
      !Y? Y=0:null
      
      return {...state, C:C,M:M,Y:Y,K:K*100}


    case 'HexaToRGB':

    console.log("state.Hexa",state.Hexa)
      let newArray=[];
      let a;
      for(let key in state.Hexa){

          switch(state.Hexa[key]){

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
              default: a=state.Hexa[key];

          }

          newArray.push(parseInt(a))
      }

      //////////////// For comfirmation ////////////////

  let rgb2=[parseFloat(newArray[1]*16+newArray[2]).toString(), parseFloat(newArray[3]*16+newArray[4]).toString(), parseFloat(newArray[5]*16+newArray[6]).toString()]
  let hexa2="#";
  rgb2.forEach((elm)=>{
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
  hexa2+=code
  })

console.log("hexa Confirmation:",hexa2)


      return {...state, R:newArray[1]*16+newArray[2], G:newArray[3]*16+newArray[4] ,B:newArray[5]*16+newArray[6]}
      
    case 'RGBtoHSL':
      //source1: https://www.rapidtables.com/convert/color/rgb-to-hsl.html
  //source2: Wikipedia
      const R=state.R/255
      const G=state.G/255
      const B=state.B/255

      const max2=Math.max(R,G,B)
      const min2=Math.min(R,G,B)
      const c=max2-min2
      let H2;
      if(c==0){
          // H2=0
          H2=state.H
          //Putting current hue value instead of 0 to avoid sudden color change
      }else if(max2==R){
          H2=(((G-B)/c)%6)*60
      }else if(max2==G){
          H2=(((B-R)/c)+2)*60
      }else if(max2==B){
          H2=(((R-G)/c)+4)*60
      }

      H2<0 && (H2+=360)
      
      return {...state, H:H2, LS:c==0? 0 : c*100/(1-Math.abs(2*parseFloat((max2+min2)*100/2)/100-1)), L:(max2+min2)*100/2}

    case 'CMYKtoRGB':
      //source: https://www.rapidtables.com/convert/color/cmyk-to-rgb.html
      const R2=255*(1-state.C/100)*(1-state.K/100)
      const G2=255*(1-state.M/100)*(1-state.K/100)
      const B2=255*(1-state.Y/100)*(1-state.K/100)
      return {...state, R:R2,G:G2,B:B2}

    case 'opacity':
      return {...state, opacity:action.payload}

    case 'trigger':

      return {...state, trigger:(!state.trigger || state.trigger>100)?1:state.trigger+1,boolean:action.payload}

  }

}