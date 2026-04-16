import { useEffect, useState } from "react"
import { formatMs } from "./formatMs"

type UseSetCountDownOpts = {
  seconds: number
  /** Al incrementarlo se reinicia la cuenta al valor de `seconds` (p. ej. botón RESET). */
  resetKey: number
}

export const useSetCountDown = ({ seconds, resetKey }: UseSetCountDownOpts) => {
  const [remainingMs, setRemainingMs] = useState(() => seconds * 1000)
  const [run, setRun] = useState(false)
  const [finish, setFinish] = useState(false)

  // Primero: al cambiar fase o reset externo, volver a la duración completa
  useEffect(() => {
    setRemainingMs(seconds * 1000)
    setFinish(false)
  }, [seconds, resetKey])

  // Segundo: tick solo mientras run === true (pausa conserva remainingMs)
  useEffect(() => {
    if (!run) return

    const id = setInterval(() => {
      setRemainingMs((prev) => {
        if (prev <= 1000) {
          setRun(false)
          setFinish(true)
          return 0
        }
        return prev - 1000
      })
    }, 1000)

    return () => clearInterval(id)
  }, [run])

  const formatDate = formatMs({ miliseconds: remainingMs })

  return { formatDate, remainingMs, finish, setRun }
}
