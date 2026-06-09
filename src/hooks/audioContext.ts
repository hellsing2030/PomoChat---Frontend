import clockSound from '../assets/universfield-simple-short-call-153308.mp3'

export const AudioContextClock = () => {
  const audio = new Audio(clockSound)
  audio.volume = 0.8
  audio.play()
}