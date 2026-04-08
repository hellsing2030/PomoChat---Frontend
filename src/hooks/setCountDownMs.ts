import { useEffect, useRef, useState } from "react"
import { formatMs } from "./formatMs"

export const  useSetCountDown =({ seconds, }:{seconds:number,})=>{
    const msStartDate = useRef<number | null>(null) 
    const msfinishCountDown = useRef<number | null>(null) 

    const [countMsDown, setCountMsDown] = useState<number>(0)
    const [run, setRun]= useState<boolean>(false) 
    const [finish,setFinish]= useState<boolean>(false)
    const [keyCountDownExternal,setKeyCountDownExternal]= useState<string>("")

    useEffect(()=>{
          if(!run){
            setKeyCountDownExternal("")
            localStorage.removeItem(keyCountDownExternal)
            return
        }

        msStartDate.current = Date.now()
        msfinishCountDown.current = msStartDate.current - seconds  * 1000  
        setCountMsDown(msStartDate.current)

        const interval = setInterval(()=>{
            const keyCountDown = `CountDown-${msStartDate.current}`
            localStorage.setItem(keyCountDown, (msStartDate.current as number).toString())
            setKeyCountDownExternal(keyCountDown)
            setFinish(false)
                        
            setCountMsDown((statePrev) => {
                if(run && statePrev > (msfinishCountDown.current as number)){
                return statePrev - 1000
            } else{
                setRun(false)
                setFinish(true)
                clearInterval(interval)
                return statePrev
            }})
            
        },1000)

        return ()=> clearInterval(interval)

    },[seconds, run])

    const formatDate = localStorage.getItem(keyCountDownExternal)
    ? formatMs({secondsCoundStartValue:seconds, miliseconds:countMsDown, msfinishCountDown: Number(localStorage.getItem(keyCountDownExternal))}) 
    : formatMs({miliseconds:seconds * 1000})
    
    return {formatDate, countMsDown, finish , setRun}
}