import {  useEffect, useRef, useState } from "react"
import { formatMs } from "./formatMs"

export const  useSetCountDown =({ seconds }:{seconds:number,})=>{
    const msStartDate = useRef<number | null>(null) 
    const msfinishCountDown = useRef<number | null>(null) 
    const [ countMsDown, setCountMsDown] = useState<number>(0)
    const [ run, setRun] = useState<boolean>(false) 
    const [ finish, setFinish] = useState<boolean>(false)
    const [ keyCountDownExternal, setKeyCountDownExternal] = useState<string>("")
    const [ pausePause, setPausePomo ] = useState<boolean>(false)
    
    useEffect(()=>{
        if(!run && !pausePause){
            setKeyCountDownExternal("")
            localStorage.removeItem(keyCountDownExternal)
            return
        }

        msStartDate.current = Date.now()
        msfinishCountDown.current = msStartDate.current - seconds  * 1000  
        setCountMsDown(msStartDate.current)

        const interval = setInterval(()=>{
            if(pausePause && !run ) return 

            const keyCountDown = `CountDown-${msStartDate.current}`
            localStorage.setItem(keyCountDown, (msStartDate.current as number).toString())
            setKeyCountDownExternal(keyCountDown)
            setFinish(false)

            setCountMsDown((statePrev) => {

                if(pausePause && run ) {
                    const savePause = {time: countMsDown - Number(localStorage.getItem(keyCountDownExternal)) + (seconds * 1000)}
                    localStorage.setItem(`${keyCountDownExternal}-pause`, JSON.stringify(savePause))
                    localStorage.removeItem(keyCountDownExternal)
                    setKeyCountDownExternal(state => `${state}-pause`)
                    setRun(false)
                    clearInterval(interval)
                }
                
                if(!run ||  statePrev <= (msfinishCountDown.current as number)){   
                    setRun(false)
                    setFinish(true)
                    clearInterval(interval)
                    return statePrev
                }
                 
                return statePrev - 1000
            }
        )
            
        },1000)

        return ()=> clearInterval(interval)

    },[seconds, run, pausePause])

    const formatDate = localStorage.getItem(keyCountDownExternal)
    ? formatMs({secondsCoundStartValue:seconds, miliseconds:countMsDown, msfinishCountDown: Number(localStorage.getItem(keyCountDownExternal))}) 
    : formatMs({miliseconds:seconds * 1000})
    
    return {formatDate, countMsDown, finish , setRun, setPausePomo}
}