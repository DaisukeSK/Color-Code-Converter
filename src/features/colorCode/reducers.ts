import { PayloadAction } from "@reduxjs/toolkit";
import { colorCodeType } from "./colorCodeSlice";

const reducers = {
  inputChanged: (
    state: colorCodeType,
    action: PayloadAction<{ type: string; value: number }>
  ) => {
    switch (action.payload.type) {
      case "H":
        state.H = action.payload.value;
        break;
      case "LS":
        state.LS = action.payload.value;
        break;
      case "L":
        state.L = action.payload.value;
        break;
      case "VS":
        state.VS = action.payload.value;
        break;
      case "V":
        state.V = action.payload.value;
        break;
      case "R":
        state.R = action.payload.value;
        break;
      case "G":
        state.G = action.payload.value;
        break;
      case "B":
        state.B = action.payload.value;
        break;
      case "C":
        state.C = action.payload.value;
        break;
      case "M":
        state.M = action.payload.value;
        break;
      case "Y":
        state.Y = action.payload.value;
        break;
      case "K":
        state.K = action.payload.value;
        break;
      case "opacity":
        state.opacity = action.payload.value;
        break;
    }
  },

  inputHexaChanged: (state: colorCodeType, action: PayloadAction<string>) => {
    state.Hexa = action.payload;
  },

  // case 'HSLtoHSV':

  //     const V: number = 100*(state.L/100+(state.LS/100)*Math.min(1-(state.L/100), state.L/100))
  //     const VS = V==0?
  //     0 : 200*(1-state.L/V)
  //     return {...state,VS:VS,V:V}
  HSLtoHSV: (state: colorCodeType) => {
    const V: number =
      100 *
      (state.L / 100 +
        (state.LS / 100) * Math.min(1 - state.L / 100, state.L / 100));
    const VS = V == 0 ? 0 : 200 * (1 - state.L / V);
    // return {...state,VS:VS,V:V}
    state.VS = VS;
    state.V = V;
  },
  HSVtoHSL: (state: colorCodeType) => {
    const L: number = 100 * ((state.V / 100) * (1 - state.VS / 100 / 2));

    const LS: number =
      L == 0 || L == 100
        ? 0
        : 100 * ((state.V / 100 - L / 100) / Math.min(L / 100, 1 - L / 100));

    // return {...state, LS:LS,L:L2}
    state.LS = LS;
    state.L = L;
  },

  //     case 'HSVtoHSL':

  //     const L2: number = 100*((state.V/100)*(1-((state.VS/100)/2)))

  //     let LS: number = (L2==0 || L2==100)?
  //     0:100*(((state.V/100)-(L2/100))/Math.min(L2/100, 1-L2/100))

  //     return {...state, LS:LS,L:L2}

  HSLtoRGB: (state: colorCodeType) => {
    let H, fx, r, g, b: number;

    const L: number = state.L < 50 ? state.L : 100 - state.L;
    const max: number = 2.55 * (state.L + (L * state.LS) / 100);
    const min: number = 2.55 * (state.L - (L * state.LS) / 100);

    // switch(true){
    //     case 0<=state.H && state.H<60:
    //         H=state.H
    //     fx=(H*(max-min)/60)+min
    //     r=max
    //     g=fx
    //     b=min
    //     break
    // }

    if (0 <= state.H && state.H < 60) {
      H = state.H;
      fx = (H * (max - min)) / 60 + min;
      r = max;
      g = fx;
      b = min;
    } else if (60 <= state.H && state.H < 120) {
      H = 120 - state.H;
      fx = (H * (max - min)) / 60 + min;
      r = fx;
      g = max;
      b = min;
    } else if (120 <= state.H && state.H < 180) {
      H = state.H - 120;
      fx = (H * (max - min)) / 60 + min;
      r = min;
      g = max;
      b = fx;
    } else if (180 <= state.H && state.H < 240) {
      H = 240 - state.H;
      fx = (H * (max - min)) / 60 + min;
      r = min;
      g = fx;
      b = max;
    } else if (240 <= state.H && state.H < 300) {
      H = state.H - 240;
      fx = (H * (max - min)) / 60 + min;
      r = fx;
      g = min;
      b = max;
    } else if (300 <= state.H && state.H < 360) {
      H = 360 - state.H;
      fx = (H * (max - min)) / 60 + min;
      r = max;
      g = min;
      b = fx;
    }
    state.R = r!;
    state.G = g!;
    state.B = b!;

    // return {...state,R:r!,G:g!,B:b!}
  },

  //   case 'HSLtoRGB':

  RGBtoHexa: (state: colorCodeType) => {
    const rgb: Array<number> = [
      Math.round(state.R),
      Math.round(state.G),
      Math.round(state.B),
    ];
    let hexa: string = "#";

    rgb.forEach((elm) => {
      let quotient, remainder;
      let a = elm;
      let arr = [];
      while (a !== 0) {
        quotient = Math.floor(a / 16);
        remainder = a % 16;
        switch (remainder) {
          case 10:
            remainder = "A";
            break;
          case 11:
            remainder = "B";
            break;
          case 12:
            remainder = "C";
            break;
          case 13:
            remainder = "D";
            break;
          case 14:
            remainder = "E";
            break;
          case 15:
            remainder = "F";
        }
        arr.push(remainder);
        a = quotient;
        a == 0 && arr.length == 1 ? arr.push(a) : null;
      }
      let code = String(arr[1]) + arr[0];
      arr.length == 0 && (code = "00"); // it means a=0
      hexa += code;
    });

    state.Hexa = hexa;

    // return {...state, Hexa:hexa}
  },

  RGBtoCMYK: (state: colorCodeType) => {
    // Using Math.round to avoid problem mentioned on the top of code.  ??
    const r: number = Math.round(state.R) / 255;
    const g: number = Math.round(state.G) / 255;
    const b: number = Math.round(state.B) / 255;

    let K: number = 1 - Math.max(r, g, b);
    let C: number = ((1 - r - K) * 100) / (1 - K);
    let M: number = ((1 - g - K) * 100) / (1 - K);
    let Y: number = ((1 - b - K) * 100) / (1 - K);

    !K ? (K = 0) : null;
    !C ? (C = 0) : null;
    !M ? (M = 0) : null;
    !Y ? (Y = 0) : null;

    state.C = C;
    state.M = M;
    state.Y = Y;
    state.K = K * 100;

    // return { ...state, C: C, M: M, Y: Y, K: K * 100 };
  },

  RGBtoHSL: (state: colorCodeType) => {
    const R: number = state.R / 255;
    const G: number = state.G / 255;
    const B: number = state.B / 255;

    const max: number = Math.max(R, G, B);
    const min: number = Math.min(R, G, B);
    const c: number = max - min;
    let H: number;
    if (c == 0) {
      // H2=0
      H = state.H;
      //Putting current hue value instead of 0 to avoid sudden color change
    } else if (max == R) {
      H = (((G - B) / c) % 6) * 60;
    } else if (max == G) {
      H = ((B - R) / c + 2) * 60;
    } else if (max == B) {
      H = ((R - G) / c + 4) * 60;
    }

    H! < 0 && (H! += 360);

    state.H = H!;
    state.LS =
      c == 0
        ? 0
        : (c * 100) / (1 - Math.abs((2 * (((max + min) * 100) / 2)) / 100 - 1));
    state.L = ((max + min) * 100) / 2;

    //   return {...state, H:H!, LS:c==0? 0 : c*100/(1-Math.abs(2*((max+min)*100/2)/100-1)), L:(max+min)*100/2}
  },

  //   case 'RGBtoHSL':

  CMYKtoRGB: (state: colorCodeType) => {
    // const R2: number = 255 * (1 - state.C / 100) * (1 - state.K / 100);
    // const G2: number = 255 * (1 - state.M / 100) * (1 - state.K / 100);
    // const B2: number = 255 * (1 - state.Y / 100) * (1 - state.K / 100);

    state.R = 255 * (1 - state.C / 100) * (1 - state.K / 100);
    state.G = 255 * (1 - state.M / 100) * (1 - state.K / 100);
    state.B = 255 * (1 - state.Y / 100) * (1 - state.K / 100);
    //   return {...state, R:R2,G:G2,B:B2}
  },

  HexaToRGB: (state: colorCodeType) => {
    let newArray = [];
    let a;

    for (let key in state.Hexa.split("")) {
      switch (state.Hexa[key]) {
        case "a":
        case "A":
          a = 10;
          break;
        case "b":
        case "B":
          a = 11;
          break;
        case "c":
        case "C":
          a = 12;
          break;
        case "d":
        case "D":
          a = 13;
          break;
        case "e":
        case "E":
          a = 14;
          break;
        case "f":
        case "F":
          a = 15;
          break;
        default:
          a = state.Hexa[key];
      }

      newArray.push(+a);
    }

    state.R = newArray[1] * 16 + newArray[2];
    state.G = newArray[3] * 16 + newArray[4];
    state.B = newArray[5] * 16 + newArray[6];

    // return {...state, R:newArray[1]*16+newArray[2], G:newArray[3]*16+newArray[4] ,B:newArray[5]*16+newArray[6]}
  },

  //   case 'HexaToRGB':

  //   case 'CMYKtoRGB':
};

export default reducers;
