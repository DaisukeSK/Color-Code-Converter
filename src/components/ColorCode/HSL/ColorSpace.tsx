import { useContext } from "react";
import { AppContext } from "../../../App.tsx";
import { ColorSpaceDiv } from "../../../StyledComponents.tsx";
import custom_pointer from "../../../../public/pointer.png";
import { useAppSelector, useAppDispatch } from "../../../hooks.ts";
import {
  inputChanged,
  HSLtoHSV,
  HSVtoHSL,
  HSLtoRGB,
  RGBtoHexa,
  RGBtoCMYK,
} from "../../../features/colorCode/colorCodeSlice.ts";
import {
  updatePointerPosition,
  manipulatingPointer,
} from "../../../features/pointer/pointerSlice.ts";

const ColorSpace = () => {
  const dispatch = useAppDispatch();
  const H = useAppSelector((state) => state.colorCode.H);
  const pointerPosition = useAppSelector((state) => state.pointer);
  const { aside, HSLtoggle } = useContext(AppContext);

  const movePointer = (
    val: React.DragEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ): void => {
    const target: HTMLDivElement = val.target as HTMLDivElement;

    if (val.pageX && val.pageY) {
      // Is this if necessary?

      let top =
        val.pageY - window.pageYOffset - target.getBoundingClientRect().top;

      top <= 0 && (top = 0);
      top >= 200 && (top = 200);

      let left =
        val.pageX - window.pageXOffset - target.getBoundingClientRect().left;

      left <= 0 && (left = 0);
      left >= 360 && (left = 360);

      if (target.id == "CS_HSL") {
        dispatch(
          inputChanged({
            type: "LS",
            value: top == 200 || top == 0 ? 0 : (left * 100) / 360,
          })
        );
        dispatch(inputChanged({ type: "L", value: Math.abs(top / 2 - 100) }));
        dispatch(HSLtoHSV());
      } else if (target.id == "CS_HSV") {
        dispatch(
          inputChanged({
            type: "VS",
            value: top == 200 ? 0 : (left * 100) / 360,
          })
        );
        dispatch(inputChanged({ type: "V", value: Math.abs(top / 2 - 100) }));
        dispatch(HSVtoHSL());
      }

      dispatch(
        updatePointerPosition({
          top: top,
          left: left,
          id: target.id,
        })
      );

      dispatch(HSLtoRGB());
      dispatch(RGBtoHexa());
      dispatch(RGBtoCMYK());
      dispatch(manipulatingPointer(true));
    }
  };

  return (
    <>
      {["HSL", "HSV"].map((elm, key) => {
        return (
          <ColorSpaceDiv
            pointerposition={pointerPosition}
            hue={H}
            toggle={key == 0 ? HSLtoggle : !HSLtoggle}
            hsl={key == 0 ? 1 : 0}
            aside={aside ? 1 : 0}
            key={key}
          >
            <img src={custom_pointer} alt="pointer" />
            <div
              draggable="true"
              id={"CS_" + elm}
              onDragStart={(e) => {
                const img = new Image();
                e.dataTransfer.setDragImage(img, 0, 0);
              }}
              onClick={(e) => {
                movePointer(e);
              }}
              onDrag={(e) => movePointer(e)}
              onDragEnd={(e) => movePointer(e)}
            ></div>
          </ColorSpaceDiv>
        );
      })}
    </>
  );
};

export default ColorSpace;
