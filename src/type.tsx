export type builtInColorsType = {
  [key: string]: { hexa: string; letterColor?: string };
};

export interface positionType {
  HSL_top: string;
  HSL_left: string;
  HSV_top: string;
  HSV_left: string;
  pointerManipulated: boolean;
}

export type rangeBGType = {
  LS: string;
  L: string;
  VS: string;
  V: string;
  R: string;
  G: string;
  B: string;
  C: string;
  M: string;
  Y: string;
  K: string;
};

export type Context = {
  textColor: boolean;
  rangeBG: rangeBGType;
  builtInColor: Array<string | null>;
  aside: boolean;
  setAside: (aside: boolean) => void;
  HSLtoggle: boolean;
  setHSLtoggle: React.Dispatch<React.SetStateAction<boolean>>;
};
