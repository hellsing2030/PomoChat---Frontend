import { useEffect, useState } from 'react'
import { useSetCountDown } from '../hooks/setCountDownMs'
import './CountDown.css'

export const CountDownPomo = () => {
  const initialValuePomo = { pomo:1, finishPomo:8}
  const [ stateTimer, setStateTimer ] = useState<"working"|"rest">("working")
  const { formatDate, setRun, finish, setPausePomo }= useSetCountDown({ seconds: stateTimer === "working"?10:4})
  const [ generalRunTimer, setGeneralRunTimer ]=useState<boolean>(false)
  const [{ finishPomo, pomo }, setCountPomo ]=useState(initialValuePomo)
    
    const handlerRunCount = (stateRun:boolean)=>{   
       setGeneralRunTimer(stateRun)
       setRun(stateRun)
       setPausePomo(stateRun => stateRun ? !stateRun: stateRun)
    }
    
    const handlerPauseCount = () =>{
      setGeneralRunTimer(false)
      setPausePomo(true)
    }

    const reset  =()=>{
      handlerRunCount(false)
      setStateTimer("working")
      setCountPomo((state) => ({...state, pomo:1}))
    }

    useEffect(()=>{
      if( !finish||!generalRunTimer)return
      const valid = pomo >= finishPomo && stateTimer !== "rest"
      console.log({valid})
      if(valid){
        handlerRunCount(false)
        return
      }
      setStateTimer(state => state === "working"? "rest":"working")
      setCountPomo(state => stateTimer === "working" ? {...state, pomo: state.pomo + 1 }:{...state})
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
        <span>Pomodoro: {pomo}/{finishPomo}</span>
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
