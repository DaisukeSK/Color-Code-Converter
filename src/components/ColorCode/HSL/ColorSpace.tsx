import { useContext } from "react";
import { AppContext } from "../../../App.tsx";
import { ColorSpaceDiv } from "../../../StyledComponents.ts";
import custom_pointer from "../../../../public/pointer.png";

const ColorSpace = () => {
  const {
    ColorCodes,
    dispatch,
    pointerPosition,
    setPointerPosition,
    aside,
    HSLtoggle,
  } = useContext(AppContext);

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
        dispatch({
          type: "inputChanged",
          payload: {
            type: "LS",
            value: top == 200 || top == 0 ? 0 : (left * 100) / 360,
          },
        });

        dispatch({
          type: "inputChanged",
          payload: { type: "L", value: Math.abs(top / 2 - 100) },
        });

        dispatch({ type: "HSLtoHSV" });

        const LS = top == 200 || top == 0 ? 0 : (left * 100) / 360;
        const L = Math.abs(top / 2 - 100);
        const V = 100 * (L / 100 + (LS / 100) * Math.min(1 - L / 100, L / 100));
        const VS = V == 0 ? 0 : 200 * (1 - L / V);

        setPointerPosition({
          HSL_top: top - 12 + "px",
          HSL_left: left - 12 + "px",
          HSV_top: Math.abs(V * 2 - 200) - 12 + "px",
          HSV_left: VS * 3.6 - 12 + "px",
        });
      } else if (target.id == "CS_HSV") {
        dispatch({
          type: "inputChanged",
          payload: { type: "VS", value: top == 200 ? 0 : (left * 100) / 360 },
        });

        dispatch({
          type: "inputChanged",
          payload: { type: "V", value: Math.abs(top / 2 - 100) },
        });

        dispatch({ type: "HSVtoHSL" });

        const VS = top == 200 ? 0 : (left * 100) / 360;
        const V = Math.abs(top / 2 - 100);
        const L = 100 * ((V / 100) * (1 - VS / 100 / 2));
        const LS =
          L == 0 || L == 100
            ? 0
            : 100 * ((V / 100 - L / 100) / Math.min(L / 100, 1 - L / 100));

        setPointerPosition({
          HSL_top: Math.abs(L * 2 - 200) - 12 + "px",
          HSL_left: LS * 3.6 - 12 + "px",
          HSV_top: top - 12 + "px",
          HSV_left: left - 12 + "px",
        });
      }

      dispatch({ type: "HSLtoRGB" });
      dispatch({ type: "RGBtoHexa" });
      dispatch({ type: "RGBtoCMYK" });
      dispatch({ type: "manipulatingPointer", payload: true });
    }
  };

  return (
    <>
      {["HSL", "HSV"].map((elm, key) => {
        return (
          <ColorSpaceDiv
            pointerposition={pointerPosition}
            hue={ColorCodes.H}
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
                dispatch({ type: "manipulatingPointer", payload: false });
              }}
              onDrag={(e) => movePointer(e)}
              onDragEnd={(e) => {
                movePointer(e);
                dispatch({ type: "manipulatingPointer", payload: false });
              }}
            ></div>
          </ColorSpaceDiv>
        );
      })}
    </>
  );
};

export default ColorSpace;
