import { useEffect, useState } from 'react'
import { useSetCountDown } from '../hooks/setCountDownMs'
import { AudioContextClock } from '../hooks/audioContext'
import './CountDown.css'


export const CountDownPomo = () => {
  const initialValuePomo = { pomo:1, finishPomo:8}
  const [ stateTimer, setStateTimer ] = useState<"working"|"rest">("working")
  const [, setOpenConfig]= useState<boolean>(false)
  const [ resetKey, setResetKey ] = useState(0)
  const { formatDate, setRun, finish } = useSetCountDown({
    seconds: stateTimer === "working" ? 3600 : 600,
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
      <div className='container-settings-button'>
          <button 
          className='button-settings'
            onClick={()=> setOpenConfig(state => !state)}
            >
            <span 
              id="icon-pause"
              className="fa-solid fa-gear"
              style={{ fontSize:"15px", padding:"0", margin: "0"}}
              />
          </button>
        </div>
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
        <button className='button-countdown' onClick={()=> handlerRunCount(false)}>
          <span 
            id="icon-pause"
            className="fa-solid fa-pause"
            style={{ fontSize:"15px"}}
          />
          STOP
        </button> :
        <button className='button-countdown' onClick={()=> handlerRunCount(true)}>
          <span 
            id="icon-play"
            className="fa-solid fa-play"
            style={{ fontSize:"15px"}}/>
             START
        </button>
        }
        <button className='button-countdown' onClick={()=>handlerPauseCount()}>
          <span 
            className="fa-solid fa-pause"
            style={{ fontSize:"15px"}}
          />
          PAUSE
        </button>
        <button className='button-countdown' onClick={()=> reset()}>
          <span 
            className="fa-solid fa-arrow-rotate-left"
            style={{
              fontSize:"15px"
            }}
          />
          RESET
        </button>
      </div>
    </div>
  )
}
