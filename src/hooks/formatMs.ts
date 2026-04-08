const padTo2Digits = (num:number)=>{
    return num.toString().padStart(2, "0")
}


export const formatMs = ({miliseconds, msfinishCountDown , secondsCoundStartValue}:{ miliseconds:number,secondsCoundStartValue?: number, msfinishCountDown?:number})=>{

    const secondsStartValue =  secondsCoundStartValue ? secondsCoundStartValue * 1000: 0
    const dateCurrent =  msfinishCountDown && msfinishCountDown ? miliseconds - msfinishCountDown + secondsStartValue: miliseconds
    let seconds = 0;
    let minutes = 0;
    let hour = 0;

    seconds = Math.floor(dateCurrent / 1000)
    minutes = Math.floor(seconds / 60)
    hour = Math.floor(minutes / 60)

    seconds = seconds % 60
    minutes = minutes % 60

    return `${padTo2Digits(hour)==="00" ? "" : padTo2Digits(hour) + ":"}${ padTo2Digits(minutes)}:${padTo2Digits(seconds)}` 
}