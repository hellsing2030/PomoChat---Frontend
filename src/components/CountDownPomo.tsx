import { useEffect, useState } from 'react'
import { useSetCountDown } from '../hooks/setCountDownMs'
import './CountDown.css'
import { AudioContextClock } from '../hooks/audioContext'

export const CountDownPomo = () => {
  const initialValuePomo = { pomo:1, finishPomo:8}
  const [ stateTimer, setStateTimer ] = useState<"working"|"rest">("working")
  const [ resetKey, setResetKey ] = useState(0)
  const { formatDate, setRun, finish } = useSetCountDown({
    seconds: stateTimer === "working" ? 10 : 4,
    resetKey,
  })
  const [ generalRunTimer, setGeneralRunTimer ]=useState<boolean>(false)
  const [{ finishPomo, pomo }, setCountPomo ]=useState(initialValuePomo)
    
    const handlerRunCount = (stateRun:boolean)=>{   
       setGeneralRunTimer(stateRun)
       setRun(stateRun)
    }
    
    const handlerPauseCount = () =>{
      setGeneralRunTimer(false)
      setRun(false)
    }

    const reset  =()=>{
      handlerRunCount(false)
      setStateTimer("working")
      setCountPomo((state) => ({...state, pomo:1}))
      setResetKey((k) => k + 1)
    }

    useEffect(()=>{
      if( !finish||!generalRunTimer)return
      const valid = pomo >= finishPomo && stateTimer !== "rest"

      if(valid){
        handlerRunCount(false)
        return
      }
      setStateTimer(state => state === "working"? "rest":"working")
      setCountPomo(state => stateTimer === "working" ? {...state, pomo: state.pomo + 1 }:{...state})
      AudioContextClock()
      setRun(true)
    },[finish , generalRunTimer])
    

  return (
    <div className='container-countdown'>
      <div className='countdown' >
          <span id="clock">
         {formatDate}
          </span>
      </div>
      <div className='countPomo'>
        <span>{stateTimer === "working"? "Pomodoro":"Descanso"}: {pomo}/{finishPomo}</span>
      </div>
      <div className='countdown'>
        {
          generalRunTimer ?
        <button onClick={()=> handlerRunCount(false)}>STOP</button> :
        <button onClick={()=> handlerRunCount(true)}>START</button>
        }
        <button onClick={()=>handlerPauseCount()}>PAUSE</button>
        <button onClick={()=> reset()}>RESET</button>
      </div>
    </div>
  )
}
