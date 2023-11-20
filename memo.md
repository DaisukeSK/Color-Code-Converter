for hexa, better use regulr expression

when try cmyk=50,50,50,50, HSL not working correctly

Switch available in HSLtoRGB?

in Hexa input, seperate # and the rest

should remove Math.round in RGBtoCMYK?

when moving pointer, result codes are different everytime

color name display not working if hexa input is not capital cases

In HSLaddE, each if using inputRefs. is it ok?

Many cases, in addE events, e.target.value isn't used. they are getting input value changes from inputRefs state.

Need both oninput and onchange for each input?

Clean the below part in HSLInput.jsx if working fine without any problem.
Now many of these elements should be unnecessary.
[
    ["HSL","S", InputRefs.LS1, InputRefs.LS2,"LS"],
    ["HSL","L", InputRefs.L1, InputRefs.L2,"L"],
    ["HSV","S", InputRefs.VS1, InputRefs.VS2,"VS"],
    ["HSV","V", InputRefs.V1, InputRefs.V2,"V"]
].map((elm, key)=>{.....})

className={`input_${elm[4]}`} is unnecessary too, but is kept there in case of using it in the future.

Is it possible to make Frame component nest its children like CNLabel,range,label and so on in styledComponent.jsx?
If possible, no need to pass the same props textColor in many component, just pass it only from the parent, Frame component.

In hambugerDiv, there is a div, why? If not necessary, remove it.