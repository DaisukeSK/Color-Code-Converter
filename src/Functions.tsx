import { builtInColorsType } from './type'
import { actionType, CCs, ppType, outputType, rangeBGType } from './type'

///////////////////////////// input change /////////////////////////////
export const sync_Input=(e: React.ChangeEvent<HTMLInputElement>, setAside:(aside:boolean)=>void):void=>{

    setAside(false)
    const target: HTMLInputElement = e.target as HTMLInputElement

    if(target.type=="range"){
        const NumInput=target.parentNode!.nextSibling as HTMLInputElement
        NumInput!.value=target.value
    }else{
        const RangeInput=target.previousSibling as HTMLDivElement
        const range=RangeInput!.querySelector('input[type="range"]') as HTMLInputElement
        range!.value=target.value
    }
}

///////////////////////////// HSL to pointer /////////////////////////////
export const HSLtoPointer=(ColorCodes:CCs,setPointerPosition:(pp:ppType)=>void):void=>{
    setPointerPosition({
        HSL_top:Math.abs(ColorCodes.L*2-200)-12+"px",
        HSL_left:ColorCodes.LS*3.6-12+"px",
        HSV_top:Math.abs(ColorCodes.V*2-200)-12+"px",
        HSV_left:ColorCodes.VS*3.6-12+"px"
    })
}

///////////////////////////// text color /////////////////////////////
export const textColorChange=(ColorCodes:CCs,setTextColor:(tc:boolean)=>void):void=>{
    ColorCodes.L<=50? setTextColor(true) : setTextColor(false)
}

///////////////////////////// BuiltIn color /////////////////////////////
export const check_Built_In_Color=(
        ColorCodes : CCs,
        builtInColors : builtInColorsType,
        setBuiltInColor : (bc:Array<string|null>)=>void
    ):void=>{
    setBuiltInColor(["--",null])
    Object.keys(builtInColors).forEach((val:string)=>{
        ColorCodes.Hexa==builtInColors[val]["hexa"] &&
        setBuiltInColor(
            builtInColors[val]["hexa"]=='#00FFFF'?
            ['Aqua/Cyan',builtInColors[val]["hexa"]]:
            [val,builtInColors[val]["hexa"]]
        )
    })
}

///////////////////////////// output color /////////////////////////////
export const updateOutput=(ColorCodes:CCs, setOutput:(op:outputType)=>void):void=>{

    let h: number = Math.round(ColorCodes.H);
    let sl: number = Math.round(ColorCodes.LS);
    let l: number = Math.round(ColorCodes.L);
    let sv: number = Math.round(ColorCodes.VS);
    let v: number = Math.round(ColorCodes.V);

    sl==0 || l==0 || l==100 ? h=0:null

    if(l==0 || l==100){
        sl=0
        sv=0
    }

    let r: number = Math.round(ColorCodes.R);
    let g: number = Math.round(ColorCodes.G);
    let b: number = Math.round(ColorCodes.B);

    let c,m,y: number;
    let k: number = Math.round(ColorCodes.K);

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
        setOutput({
            HSL:`hsl(${h}, ${sl}%, ${l}%)`,
            HSV:`hsv(${h}, ${sv}%, ${v}%)`,
            Hexa:`${ColorCodes.Hexa}`,
            RGB:`rgb(${r}, ${g}, ${b})`,
            CMYK:`cmyk(${c}%, ${m}%, ${y}%, ${k}%)`
        })
    }else{

        let hexa: string = ""
        let a: number = Math.round(ColorCodes.opacity*255)
        let quotient, remainder;
        let arr=[]

        while(a!==0){
            quotient = Math.floor(a/16)
            remainder = a%16
            
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

        setOutput({
            HSL:`hsla(${h}, ${sl}%, ${l}%, ${ColorCodes.opacity})`,
            HSV:`hsva(${h}, ${sv}%, ${v}%, ${ColorCodes.opacity})`,
            Hexa:`${ColorCodes.Hexa}${hexa}`,
            RGB:`rgba(${r}, ${g}, ${b}, ${ColorCodes.opacity})`,
            CMYK:`cmyk(${c}%, ${m}%, ${y}%, ${k}%)`
        })
    }
}

///////////////////////////// input range background /////////////////////////////
const SandLforSv=(Sv:number, ob:CCs)=>{ // Function to get bgcolor of Sv range input
    const L: number = 100*(((ob.V)/100)*(1-((Sv/100)/2)))
    let S: number;
    S= (L==0 || L==100)? 0 : 100*((((ob.V)/100)-(L/100))/Math.min(L/100, 1-L/100))
    return [S,L]
}

const SandLforV=(V:number, ob:CCs)=>{ // Function to get bgcolor of V range input
    const L: number = 100*((V/100)*(1-(((ob.VS)/100)/2)))
    let S: number;
    S= (L==0 || L==100)? 0 : 100*(((V/100)-(L/100))/Math.min(L/100, 1-L/100))
    return [S,L]
}

const CMYKbgColor=(c:number, m:number, y:number, k:number)=>{
    return `rgb(${Math.round(255*(1-c/100)*(1-k/100))},${Math.round(255*(1-m/100)*(1-k/100))},${Math.round(255*(1-y/100)*(1-k/100))})`
}

export const inputRangeBG=(ColorCodes:CCs,setRangeBG:(Rbg:rangeBGType)=>void):void=>{ //Main function

    const LS_left: string = `hsl(0,0%,${Math.round(ColorCodes.L)}%)`
    const LS_right: string = `hsl(${Math.round(ColorCodes.H)},100%,${Math.round(ColorCodes.L)}%)`
    const LS_bg: string = `linear-gradient(90deg, ${LS_left},${LS_right})`

    const L_middle: string = `hsl(${Math.round(ColorCodes.H)},${Math.round(ColorCodes.LS)}%,50%)`
    const L_bg: string = `linear-gradient(90deg, hsl(0,0%,0%), ${L_middle}, hsl(0,0%,100%))`
    
    // Sv
    const VS_left: string = `hsl(0,${Math.round(SandLforSv(0,ColorCodes)[0])}%,${Math.round(SandLforSv(0,ColorCodes)[1])}%)`
    const VS_Right: string = `hsl(${Math.round(ColorCodes.H)},${Math.round(SandLforSv(100,ColorCodes)[0])}%,${Math.round(SandLforSv(100,ColorCodes)[1])}%)`

    const VS_bg: string = `linear-gradient(90deg, ${VS_left}, ${VS_Right})`

    // V
    const V_left: string = `hsl(0,${Math.round(SandLforV(0,ColorCodes)[0])}%,${Math.round(SandLforV(0,ColorCodes)[1])}%)`
    const V_Right: string = `hsl(${Math.round(ColorCodes.H)},${Math.round(SandLforV(100,ColorCodes)[0])}%,${Math.round(SandLforV(100,ColorCodes)[1])}%)`

    const V_bg: string = `linear-gradient(90deg, ${V_left}, ${V_Right})`

    // RGB
    const R_left: string = `rgb(0,${Math.round(ColorCodes.G)},${Math.round(ColorCodes.B)})`
    const R_right: string = `rgb(255,${Math.round(ColorCodes.G)},${Math.round(ColorCodes.B)})`
    const R_bg: string = `linear-gradient(90deg, ${R_left}, ${R_right})`

    const G_left: string = `rgb(${Math.round(ColorCodes.R)},0,${Math.round(ColorCodes.B)})`
    const G_right: string = `rgb(${Math.round(ColorCodes.R)},255,${Math.round(ColorCodes.B)})`
    const G_bg: string = `linear-gradient(90deg, ${G_left}, ${G_right})`

    const B_left: string = `rgb(${Math.round(ColorCodes.R)},${Math.round(ColorCodes.G)},0)`
    const B_right: string = `rgb(${Math.round(ColorCodes.R)},${Math.round(ColorCodes.G)},255)`
    const B_bg: string = `linear-gradient(90deg, ${B_left}, ${B_right})`

    // CMYK
    const C_left: string = CMYKbgColor(0,(ColorCodes.M),(ColorCodes.Y),(ColorCodes.K))
    const C_right: string = CMYKbgColor(100,(ColorCodes.M),(ColorCodes.Y),(ColorCodes.K))
    
    const C_bg: string = `linear-gradient(90deg, ${C_left}, ${C_right})`

    const M_left: string = CMYKbgColor((ColorCodes.C),0,(ColorCodes.Y),(ColorCodes.K))
    const M_right: string = CMYKbgColor((ColorCodes.C),100,(ColorCodes.Y),(ColorCodes.K))
    
    const M_bg: string = `linear-gradient(90deg, ${M_left}, ${M_right})`

    const Y_left: string = CMYKbgColor((ColorCodes.C),(ColorCodes.M),0,(ColorCodes.K))
    const Y_right: string = CMYKbgColor((ColorCodes.C),(ColorCodes.M),100,(ColorCodes.K))
    
    const Y_bg: string = `linear-gradient(90deg, ${Y_left}, ${Y_right})`

    const K_left: string = CMYKbgColor((ColorCodes.C),(ColorCodes.M),(ColorCodes.Y),0)
    const K_right: string = CMYKbgColor((ColorCodes.C),(ColorCodes.M),(ColorCodes.Y),100)
    
    const K_bg: string = `linear-gradient(90deg, ${K_left}, ${K_right})`

    setRangeBG({
        LS:LS_bg,
        L:L_bg,
        VS:VS_bg,
        V:V_bg,
        R:R_bg,
        B:B_bg,
        G:G_bg,
        C:C_bg,
        M:M_bg,
        Y:Y_bg,
        K:K_bg
    })
}

export const reducer=(state:CCs,action:actionType):CCs=>{

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
        
        const V: number = 100*(state.L/100+(state.LS/100)*Math.min(1-(state.L/100), state.L/100))
        const VS = V==0?
        0 : 200*(1-state.L/V)
        return {...state,VS:VS,V:V}

        case 'HSVtoHSL':// Wikipedia is the only source.
        
        const L2: number = 100*((state.V/100)*(1-((state.VS/100)/2)))

        let LS: number = (L2==0 || L2==100)?
        0:100*(((state.V/100)-(L2/100))/Math.min(L2/100, 1-L2/100))

        return {...state, LS:LS,L:L2}

        case 'HSLtoRGB':
        // source1: https://www.peko-step.com/tool/hslrgb.html#ppick3
        // source2: https://yanohirota.com/color-converter/

        let L,H,fx,r,g,b: number;

        L=state.L<50? state.L:100-state.L
        const max: number = 2.55*(state.L+(L*state.LS/100))
        const min: number = 2.55*(state.L-(L*state.LS/100))

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

        return {...state,R:r!,G:g!,B:b!}

        case 'RGBtoHexa':

        let rgb: Array<number> = [Math.round(state.R), Math.round(state.G), Math.round(state.B)]
        let hexa: string = "#";
        
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
            arr.length==0 && (code='00')// it means a=0
            hexa+=code
        })

        return {...state, Hexa:hexa}

        case 'RGBtoCMYK':
        //source: https://www.rapidtables.com/convert/color/rgb-to-cmyk.html
    
        // Using Math.round to avoid problem mentioned on the top of code.  ??

        const rr: number = Math.round(state.R)/255
        const gg: number = Math.round(state.G)/255
        const bb: number = Math.round(state.B)/255

        let K: number = 1-Math.max(rr,gg,bb)
        let C: number = (1-rr-K)*100/(1-K)
        let M: number = (1-gg-K)*100/(1-K)
        let Y: number = (1-bb-K)*100/(1-K)
        
        !K? K=0:null
        !C? C=0:null
        !M? M=0:null
        !Y? Y=0:null
        
        return {...state, C:C,M:M,Y:Y,K:K*100}

        case 'HexaToRGB':

        let newArray=[];
        let a;

        for(let key in state.Hexa.split('')){

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

            newArray.push(+a)
        }

        return {...state, R:newArray[1]*16+newArray[2], G:newArray[3]*16+newArray[4] ,B:newArray[5]*16+newArray[6]}
        
        case 'RGBtoHSL':
        //source1: https://www.rapidtables.com/convert/color/rgb-to-hsl.html
        //source2: Wikipedia
        const R: number = state.R/255
        const G: number = state.G/255
        const B: number = state.B/255

        const max2: number = Math.max(R,G,B)
        const min2: number = Math.min(R,G,B)
        const c: number = max2-min2
        let H2: number;
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

        H2!<0 && (H2!+=360)
        
        return {...state, H:H2!, LS:c==0? 0 : c*100/(1-Math.abs(2*((max2+min2)*100/2)/100-1)), L:(max2+min2)*100/2}

        case 'CMYKtoRGB':
        //source: https://www.rapidtables.com/convert/color/cmyk-to-rgb.html
        const R2: number = 255*(1-state.C/100)*(1-state.K/100)
        const G2: number = 255*(1-state.M/100)*(1-state.K/100)
        const B2: number = 255*(1-state.Y/100)*(1-state.K/100)
        return {...state, R:R2,G:G2,B:B2}

        case 'opacity':
        return {...state, opacity:action.payload}

        case 'trigger':

        return {...state, trigger:(!state.trigger || state.trigger>100)?1:state.trigger+1,boolean:action.payload}

        default: return {...state}
    }
}


