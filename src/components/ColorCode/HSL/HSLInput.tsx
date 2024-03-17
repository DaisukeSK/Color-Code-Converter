import { useContext } from "react"
import { AppContext } from "../../../App.tsx"
import { Label,Range,InputNumber,HGrid,HSLGrid,HSL_RangeBG } from '../../../StyledComponents.tsx'
import { sync_Input } from '../../../Functions.tsx'
import { HSLContext } from './HSL.tsx'

const HSLInput=()=>{

	const { ColorCodes, dispatch, textColor, rangeBG, setAside }= useContext(AppContext)
	const { HSLtoggle }= useContext(HSLContext)

	const HSL_inputChange=(e: React.ChangeEvent<HTMLInputElement>):void=>{
		sync_Input(e,setAside)

		// if(e.target.className.includes("input_H")){

		// 	dispatch({type:'H', payload:+e.target.value})
		// 	dispatch({type:'HSLtoHSV', payload:null})
			
		// 	}else if(e.target.className.includes("input_LS")){

		// 	dispatch({type:'LS', payload:+e.target.value})
		// 	dispatch({type:'HSLtoHSV', payload:null})
			
		// 	}else if(e.target.className.includes("input_L")){

		// 	dispatch({type:'L', payload:+e.target.value})
		// 	dispatch({type:'HSLtoHSV', payload:null})

		// 	}else if(e.target.className.includes("input_VS")){

		// 	dispatch({type:'VS', payload:+e.target.value})
		// 	dispatch({type:'HSVtoHSL', payload:null})
			
		// 	}else if(e.target.className.includes("input_V")){

		// 	dispatch({type:'V', payload:+e.target.value})
		// 	dispatch({type:'HSVtoHSL', payload:null})
		// }

		switch(true){
			case e.target.className.includes("input_H"):
				dispatch({type:'H', payload:+e.target.value});
				dispatch({type:'HSLtoHSV', payload:null});
				break;
			case e.target.className.includes("input_LS"):
				dispatch({type:'LS', payload:+e.target.value});
				dispatch({type:'HSLtoHSV', payload:null});
				break;
			case e.target.className.includes("input_L"):
				dispatch({type:'L', payload:+e.target.value});
				dispatch({type:'HSLtoHSV', payload:null});
				break;
			case e.target.className.includes("input_VS"):
				dispatch({type:'VS', payload:+e.target.value});
				dispatch({type:'HSVtoHSL', payload:null});
				break;
			case e.target.className.includes("input_V"):
				dispatch({type:'V', payload:+e.target.value});
				dispatch({type:'HSVtoHSL', payload:null});
		}

		dispatch({type:'HSLtoRGB', payload:null})
		dispatch({type:'RGBtoHexa', payload:null})
		dispatch({type:'RGBtoCMYK', payload:null})
		dispatch({type:'trigger', payload:true})
	}

	const CCarray=[ ColorCodes.LS, ColorCodes.L, ColorCodes.VS, ColorCodes.V ]

    return(
        <div>
            <HGrid>
                <Label textcolor={textColor?1:0}>H:</Label>
                <Range>
                    <input
						className="input_H"
						type="range"
						min="0"
						max="359"
                        onChange={(e)=>{HSL_inputChange(e)}}
                        value={Math.round(ColorCodes.H)}
                    />
                </Range>
                <InputNumber
					textcolor={textColor?1:0}
					className="input_H"
					min="0"
					max="359"
					step="1"
                    onChange={(e)=>{HSL_inputChange(e)}}
                    value={Math.round(ColorCodes.H)}
                />
            </HGrid>

            {["LS","L","VS","V"].map((elm:string, key:number)=>{
                return (
					<HSLGrid toggle={key==0 || key==1?HSLtoggle:!HSLtoggle} key={key}>
						<Label textcolor={textColor?1:0}>{elm.split("")[elm.length-1]}:</Label>
						<Range>
							<HSL_RangeBG bg={elm} rangebg={rangeBG}/>
							<input
								className={`input_${elm}`}
								type="range"
								min="0"
								max="100"
								onChange={(e)=>{HSL_inputChange(e)}}
								value={Math.round(CCarray[key])}
							/>
						</Range>

						<InputNumber
							textcolor={textColor?1:0}
							className={`input_${elm}`}
							min="0"
							max="100"
							step="1"
							onChange={(e)=>{HSL_inputChange(e)}}
							value={Math.round(CCarray[key])}
						/>
					</HSLGrid>
				)
            })}
        </div>
    )
}

export default HSLInput