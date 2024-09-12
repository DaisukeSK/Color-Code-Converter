import { useContext, Fragment  } from "react"
import { AppContext } from "../../App.tsx"
import { OutputFrame,OutputCN_Label,CopyBox,OpacityGrid } from '../../StyledComponents.js'

const OutPut=()=>{

    const { ColorCodes, dispatch, textColor, builtInColor, output }= useContext(AppContext)

    const OpacityChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch({type:'opacity',payload:+e.target.value})
    }

    const copyCode=(e:React.MouseEvent<HTMLDivElement>)=>{
        const target: HTMLDivElement =e.target as HTMLDivElement
        const inputElement: HTMLInputElement=target.closest("div")!.previousElementSibling as HTMLInputElement
        inputElement.select()
        document.execCommand("copy")
    }

    const outPutArray=[output.HSL, output.HSV, output.Hexa, output.RGB, output.CMYK ]

    return(
        <OutputFrame textcolor={textColor?1:0}>
            <OutputCN_Label textcolor={textColor?1:0} bultin={builtInColor}>
                <h4>Color Name:</h4>
                <span>{builtInColor[0]}</span>
                <div></div>
            </OutputCN_Label>

            <hr/>
            
            <div className="grid">

                {["HSL", "HSV", "Hexa", "RGB", "CMYK" ].map((elm:string, key:number)=>{
                    return (
                        <Fragment key={key}>
                            <h4 key={key}>{elm}:</h4>
                            <input type='text' readOnly value={outPutArray[key]}/>
                            <CopyBox textcolor={textColor?1:0} onClick={(e)=>copyCode(e)}>
                                <span></span>
                                <span></span>
                            </CopyBox>
                        </Fragment>
                    )
                })}
                
            </div>

            <hr/>

            <OpacityGrid>
                <label>Opacity:</label>
                <div className='range'>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={(e)=>OpacityChange(e)}
                        value={ColorCodes.opacity}
                    />
                </div>
                <input type='number'
                    style={{width:"45px"}}
                    min="0"
                    max="1"
                    step="0.01"
                    onChange={(e)=>OpacityChange(e)}
                    value={ColorCodes.opacity}
                />
            </OpacityGrid>

        </OutputFrame>
    )
}

export default OutPut