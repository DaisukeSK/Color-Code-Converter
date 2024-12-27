import { useContext } from "react";
import { AppContext } from "../../../App.tsx";
import { HSLFrame, ToggleDiv } from "../../../StyledComponents.tsx";
import ColorSpace from "./ColorSpace.tsx";
import HSLInput from "./HSLInput.tsx";

export const HSL = () => {
  const { textColor, aside, HSLtoggle, setHSLtoggle } = useContext(AppContext);

  return (
    <HSLFrame aside={aside ? 1 : 0} textcolor={textColor ? 1 : 0}>
      <ToggleDiv toggle={HSLtoggle ? 1 : 0}>
        <h4 onClick={() => setHSLtoggle(true)}>HSL</h4>
        <h4 onClick={() => setHSLtoggle(false)}>HSV</h4>
        <div></div>
      </ToggleDiv>
      <ColorSpace />
      <HSLInput />
    </HSLFrame>
  );
};
