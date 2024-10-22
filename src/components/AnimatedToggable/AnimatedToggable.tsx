import { cloneElement, useEffect, useState } from 'react'
import './animated-toggable.css'

interface Props {
  children: JSX.Element
  animation: 'pop' | 'fade' | 'none'
  toggle: boolean
  refresh?: any[]
}

export const AnimatedToggable = ({ children, animation, toggle, refresh = [] }: Props) => {
  const [clonedChild, setClonedChild] = useState<React.FunctionComponentElement<any>>()

  useEffect(() => {
    const oldClassName: string = children.props.className

    let animationClassName = `animated-toggable ${animation}`
    if (toggle) animationClassName += ' showing'

    const newClonedChild = cloneElement(children, {
      className: `${oldClassName ?? ''} ${animationClassName}`
    })
    setClonedChild(newClonedChild)
  }, [toggle, ...refresh])

  return clonedChild ?? null
}
