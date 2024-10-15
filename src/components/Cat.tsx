import { randomRange } from '@/utils/randomRange'
import { useEffect, useRef, useState } from 'react'

type Mode = 'walk' | 'idle'

const speed = 0.8

const waitTimes = {
  walk: [5.5, 17],
  idle: [3, 6]
}

const spritesheets = {
  walk: '/public/cat/walk.gif',
  idle: '/public/cat/idle.gif',
  lick: '/public/cat/lick.gif'
}

const lickChance = 0.66

export const Cat = () => {
  const [mode, setMode] = useState<Mode>('walk')
  const [sprites, setSprites] = useState(spritesheets[mode])
  const modeRef = useRef(mode)
  const [posX, setPosX] = useState(0)

  const ref = useRef(null)
  const playgroundWidth = useRef(0)
  const direction = useRef(1)

  const waitAndToggleMode = () => {
    const [min, max] = waitTimes[mode]
    const wait = randomRange(min, max, false) * 1000

    setTimeout(() => {
      const toggledMode = mode === 'walk' ? 'idle' : 'walk'
      if (toggledMode === 'walk') direction.current = Math.random() > 0.5 ? 1 : -1
      setMode(toggledMode)
    }, wait)
  }

  // Prevent cat from going out of bounds
  useEffect(() => {
    if (posX > playgroundWidth.current) direction.current = -1
    else if (posX < 0) direction.current = 1
  }, [posX])

  const update = () => {
    if (modeRef.current === 'walk') {
      setPosX(p => p + speed * direction.current)
    }
    window.requestAnimationFrame(update)
  }
  useEffect(update, [])

  useEffect(() => {
    waitAndToggleMode()
    modeRef.current = mode

    setSprites(
      mode === 'idle'
        ? Math.random() < lickChance
          ? spritesheets.lick
          : spritesheets.idle
        : spritesheets.walk
    )
  }, [mode])

  // Get playground width, max x value
  useEffect(() => {
    if (!ref.current) return
    const element = ref.current as HTMLElement
    const parentElement = element.closest('div') as HTMLElement

    const { width: parentWidth } = parentElement.getBoundingClientRect()
    const { width: elementWidth } = element.getBoundingClientRect()
    playgroundWidth.current = parentWidth - elementWidth
  }, [ref.current])

  return (
    <img
      src={sprites}
      alt={`Gif of a cat that is ${mode}`}
      className={`
        size-32 [image-rendering:pixelated] absolute bottom-0
        `}
      style={{ right: `${posX}px`, scale: `${-direction.current} 1` }}
      draggable={false}
      ref={ref}
    />
  )
}
