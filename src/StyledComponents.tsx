
import Styled from "styled-components";
import { css } from "styled-components";
import { ppType,rangeBGType,CCs } from './type'

export const Section=Styled.section<{aside:number}>`
    position:relative; // for aside menu.
    display :flex;
    flex-direction: column;
    justify-content: center;
    left:${props=>props.aside? css`250px`:css`0`};
    transition: left .5s;
    width: fit-content;
    min-height: 100vh;
    margin: 0 auto;
    box-sizing: border-box;
`;

export const HamburgerDiv=Styled.div<{textcolor:number}>`
    position:absolute;
    top:15px;
    left:15px;
    width:35px;
    height:25px;

    &:hover {
        svg {
            .blurPath {
                display:  block;
            }
        }
    }
        
    svg {
        path {
            fill:  ${(props)=>props.textcolor ? css`white`: css`black`}
        }
        .blurPath {
            display:  none;
        }
    }
`;

export const Frame=Styled.div<{textcolor:number}>`
    background: rgba(200, 200, 200, 0.5);
    padding: 7px 0;
    border-radius: 5px;
    overflow: hidden;
    border: ${props=>props.textcolor? css`1px solid white;`:css`1px solid grey;`};
    box-sizing: border-box;

    h4 {
        margin: 0;
        text-align:center;
    
    }

    // label {
    //     font-size: 0.9rem;
    //     margin-left: auto;
    //     font-size: 97%;
    // }

    // .range {
    //     position:relative;
    //     height: 15px;
    //     div, input{
    //         position: absolute;
    //         top: 0;
    //         left: 0;
    //         height: 100%;
    //         width: 100%;
    //         margin: 0;
    //     }
    // }

    // input[type='number'] {
    //     width: 40px;
    //     background: transparent;
    //     outline: none;
    //     border: none;
    // }

    color: ${(props)=>props.textcolor ? css`white`: css`black`};

    input {
        color: ${(props)=>props.textcolor ? css`white`: css`black`};
    }
`;

export const HSLFrame=Styled(Frame)<{aside:number}>`
    margin-right: ${props=>props.aside? css`20px`:css`40px`};
    transition: margin-right .5s;
    padding-bottom: 15px;
`;

export const OutputFrame=Styled(Frame)`

    .grid {
        display: grid;
        grid-template-columns: 75px 210px 15px;
        grid-template-rows: repeat(5, 22px);
        gap: 2px 0;
        margin: 10px 45px;
        align-items: center;

        h4 {
            text-align: left;
        }

        input[type="text"] {
            background: none;
            margin: 0;
            padding: 0;
            border: none;
        }
        
        input[type="text"]:focus {
            outline: none;
        }
        input[type="text"]::selection {
            background: none;
            
        }
        input[type="text"]::-moz-selection {
            background: none;
            
        }
    }
`;


export const Aside=Styled.aside<{aside:number}>`
    position: absolute;
    left:${props=>props.aside? css`0`:css`-500px`};
    top:0;
    height: 100vh;
    width:500px;
    background-color: #161616;
    z-index:2; //should be higher than pointer.
    transition: left .5s;

    &>div { // If change this height, don't forget to change height of sibling ul too.
        position: relative;
        padding: 30px 0;
        box-sizing:border-box;

        .close {
            position: absolute;
            top: 10px;
            left: 10px;
            width: 20px;
            height: 20px;
            svg {
                path,rect {
                    stroke: #717171;
                    stroke-width:2;
                    fill: none;
                }
            }
            &:hover {
                svg {
                    path,rect {
                        stroke: #cccccc;
                    }
                }
            }
        }// .close
        
        .logo {
            margin: 0 auto;
            width: 80%;
            height: 100px;

            img {
                width: 100%;
            }
            .presentedBy{
                color: white;
                text-align: center;
            }
        }
        &>h4 {
            text-align:center;
            margin: 20px auto 0;
            color: white;
        }
    }//div

    &>ul {
        display:flex;
        flex-wrap:wrap;
        justify-content: space-evenly;
        list-style:none;
        padding: 0;
        margin: 0;
        overflow:auto;
        height: ${window.innerHeight-200-10+"px"}; // If change height sibling div, don't forget to change this too.
        
        &>li{
            margin: 7px 0;
            width: 150px;
            height:60px;
            padding-top:12px;
            box-sizing: border-box;
            border-radius:5px;
            &>div{
                width: fit-content;
                margin: 0 auto;
                font-weight: bold;
            }
        }

        /* width */
        &::-webkit-scrollbar {
        width: 8px;
        }
    
        /* Track */
        &::-webkit-scrollbar-track {
        background-color: #999999;
        }
    
        /* Handle */
        &::-webkit-scrollbar-thumb {
        background-color: #eeeeee;
        outline: none;

            &:hover {
                background-color: #ffffff;
                outline: 1px white solid;
            }
            &:active {
                background-color: #dddddd;
                outline: 1px white solid;
            }
        }
    }//ul
`;

export const ToggleDiv=Styled.div<{toggle:number}>`
    position: absolute;
    width: 48px;
    height: 100%;
    top: 0;

    left: ${(props) => props.toggle? css`0`: css`100%`};
    transform: ${(props) => props.toggle? css`none`: css`translateX(-100%);`};
    transition: all .3s ease-out;

    background-color: hsl(0, 0%, 30%);
    border-radius: 7px;
`;

export const CN_Label4HSL_HSV=Styled.h4<{toggle:number}>`
    padding-top: 2px;
    z-index:1;
    color:  ${(props)=>props.toggle ? css`white`: css`#888888`};

`;

export const Hr=Styled.hr<{textcolor:number}>`
    border-bottom: none;
    border-top: ${props=>props.textcolor? css`1px solid white;`:css`1px solid grey;`};
`;

export const ColorSpaceDiv=Styled.div<{toggle:boolean, hue:number, hsl:number, pointerposition:ppType, aside:number}>`
    display: ${(props)=>props.toggle? css`block`: css`none`};
    position: relative;
    width: 360px;
    height: 200px; 
    overflow: hidden;
    margin-bottom: 15px;
    transition: ${(prop)=>prop.aside?css`all 1s ease-out`:css`none`};
    background: ${(props)=>css`hsl(${props.hue},100%,50%)`};
    
    &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 100%;
        height: 100%;
        background: ${(props)=>props.hsl?
            css`linear-gradient(90deg, hsl(0,0%,50%),transparent)`:
            css`linear-gradient(90deg, white,transparent)`
        };
        
    }
    &::after {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 100%;
        height: 100%;
        
        background: ${(props)=>props.hsl?
            css`linear-gradient(white, transparent,black)`:
            css`linear-gradient(transparent,black)`};
    }
    img {
        position: absolute;
        top: ${(props)=>props.hsl?css`${props.pointerposition.HSL_top}`:css`${props.pointerposition.HSV_top}`};
        left: ${(props)=>props.hsl?css`${props.pointerposition.HSL_left}`:css`${props.pointerposition.HSV_left}`};
        z-index:1;
    }
    div {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 100%;
        height: 100%;
        z-index:1;
    }
`;

export const Grid=Styled.div`
    display: grid;
    gap: 5px;
    margin: 7px auto;
    align-items: center;
    grid-template-columns: 40px 255px 40px;
    grid-template-rows: 20px;

    
    label {
        font-size: 0.9rem;
        margin-left: auto;
        font-size: 97%;
    }

    .range {
        position:relative;
        height: 15px;
        div, input{
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            margin: 0;
        }
    }

    input[type='number'] {
        width: 40px;
        background: transparent;
        outline: none;
        border: none;
    }
`;

export const OpacityGrid=Styled(Grid)<{textcolor:number}>`
    grid-template-columns: 55px 150px 45px;
    margin: 7px auto;
    width: fit-content;
    div {
        input {
            background: linear-gradient(90deg, #00000000,#ffffff);
            border: ${(props)=>props.textcolor ? css`1px solid white`: css`1px solid #888888`};
        }
    }
`;

export const HSLGrid=Styled(Grid)<{toggle:boolean}>`
    grid-template-columns: 40px 360px 40px;
    display: ${(props)=>props.toggle ? css`grid`: css`none`};

`;

export const Hexainput=Styled.input<{textcolor:number}>`
    display: block;
    margin: 7px auto 0;
    width: 75px;
    border: none;
    border-bottom: ${(props)=>props.textcolor ? css`1px solid white`: css`1px solid black`};
    background: transparent;
    color: ${(props)=>props.textcolor ? css`white`: css`black`};

    &:focus {
        outline: none;
    }
`;

export const SVG=Styled.svg<{textcolor:number}>`
    path, rect{
        stroke: ${(props)=>props.textcolor ? css`white`: css`black`};
    }
`;

export const CopyBox=Styled.div<{textcolor:number}>`
    width: 16px;
    height: 16px;
    position: relative;
    & > * {
        position: absolute;
        width: 12px;
        height: 12px;
        box-sizing: border-box;
        top: 0;
        left: 0;
        border-left: ${(props)=>props.textcolor ? css`1px white solid`: css`1px black solid`};
        border-top: ${(props)=>props.textcolor ? css`1px white solid`: css`1px black solid`};
    }
    & :first-child{
        top:auto;
        left:auto;
        bottom: 0;
        right: 0;
        border: ${(props)=>props.textcolor ? css`1px white solid`: css`1px black solid`};
    }

    &:hover {
        & :first-child{
            background:#FFFFFF77;
        }
    }

    &:active {
        top:1px;
        left:1px;
        & :first-child{
            background:white;
        }
    }
`;

export const HSL_RangeBG=Styled.div<{bg:string,rangebg:rangeBGType}>`
    background:${(props)=>props.bg=="LS"? css`${props.rangebg.LS}`: props.bg=="L"? css`${props.rangebg.L}`: props.bg=="VS"? css`${props.rangebg.VS}`:css`${props.rangebg.V}`};
`;

export const RGB_RangeBG=Styled.div<{bg:string,rangebg:rangeBGType}>`
    background:${(props)=>props.bg=="R"? css`${props.rangebg.R}`: props.bg=="G"? css`${props.rangebg.G}`:css`${props.rangebg.B}`};
`;

export const CMYK_RangeBG=Styled.div<{bg:string,rangebg:rangeBGType}>`
    background:${(props)=>props.bg=="C"? css`${props.rangebg.C}`: props.bg=="M"? css`${props.rangebg.M}`: props.bg=="Y"? css`${props.rangebg.Y}`:css`${props.rangebg.K}`};
`;

export const OutputCN_Label=Styled.div<{textcolor:number, bultin:Array<string | null>}>`
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        // color: ${(props)=>props.textcolor ? css`white`: css`black`};
        margin: 0 0 0 5px;
    }

    div {
        width: 30px;
        height: 15px;
        border: 1px solid grey;
        margin: 0 0 0 5px;
        background-color:${(props)=>props.bultin[1]};
        display: ${(props)=>props.bultin[1] ? css`block`: css`none`};
    }
`;

export const BG=Styled.div<{aside:number,colorcodes:CCs}>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color:${(props)=>css`hsla(${Math.round(props.colorcodes.H)},${Math.round(props.colorcodes.LS)}%,${Math.round(props.colorcodes.L)}%,${props.colorcodes.opacity})`};
    transition:${(props)=>props.aside?css`all 1s ease-out`:`none`}
`;