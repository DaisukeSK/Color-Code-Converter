import { useContext } from "react"
import { Cntxt } from "../App.jsx"

const HiddenInput=()=>{

    const {Refs}=useContext(Cntxt)
    return (
        <>
        
            <input type="hidden" ref={Refs.H}/>
            <input type="hidden" ref={Refs.LS}/>
            <input type="hidden" ref={Refs.L}/>
            <input type="hidden" ref={Refs.VS}/>
            <input type="hidden" ref={Refs.V}/>
            <input type="hidden" ref={Refs.R}/>
            <input type="hidden" ref={Refs.G}/>
            <input type="hidden" ref={Refs.B}/>
            <input type="hidden" ref={Refs.C}/>
            <input type="hidden" ref={Refs.M}/>
            <input type="hidden" ref={Refs.Y}/>
            <input type="hidden" ref={Refs.K}/>
        </>

    )
}

export default HiddenInput