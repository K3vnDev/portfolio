import { useEffect, useRef, useState } from 'react'

export const useErrorMessage = (miliseconds: number) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isShowingError, setIsShowingError] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const setNewError = (err: string) => {
    setErrorMessage(err)
    setIsShowingError(true)

    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setIsShowingError(false)
    }, miliseconds)
  }
  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const hideError = () => {
    setIsShowingError(false)
  }

  return { isShowingError, setNewError, errorMessage, hideError }
}
