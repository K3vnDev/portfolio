import { useEffect, useRef, useState } from 'react'

export const useErrorMessage = (miliseconds: number) => {
  const [errorMessage, setErrorMessage] = useState('')
  const timeoutRef = useRef<NodeJS.Timeout>()

  const setNewError = (err: string) => {
    setErrorMessage(err)

    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setErrorMessage('')
    }, miliseconds)
  }
  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  return { errorMessage, setNewError }
}
