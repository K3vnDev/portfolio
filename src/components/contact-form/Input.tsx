import type { MailState } from '@/types'
import { firstToUpper } from '@/utils/firstToUpper'
import { getElementRef } from '@/utils/getElementRef'
import { useEffect, useRef, useState } from 'react'

interface Props {
  name: string
  className?: string
  textarea?: boolean
  mailState: MailState
}

export const Input = ({ name, textarea, mailState }: Props) => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  const recalculateHeight = () => {
    const input = getElementRef(inputRef)
    const [min, max] = [64, 192]

    input.style.height = '0px'
    const { scrollHeight } = input
    const newScrollHeight = scrollHeight < min ? min : scrollHeight > max ? max : scrollHeight
    input.style.height = `${newScrollHeight}px`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (textarea) recalculateHeight()
    setValue(e.target.value)
  }

  useEffect(() => {
    if (mailState === 'sending') setValue('')
  }, [mailState])

  const className = `
    bg-zinc-900 border border-zinc-700 rounded-[.3rem] outline-none px-2 py-1
    text-gray-200 [color-scheme:dark] -outline-offset-1 transition w-full
    hover:brightness-110 focus:brightness-125 focus:outline-2 focus:outline-zinc-600
  `
  const props = { value, onChange: handleChange, name }

  return (
    <label className='flex flex-col w-full gap-[.4rem]'>
      <span className='text-gray-100 text-sm'>{firstToUpper(name)}</span>
      {!textarea ? (
        <input {...props} className={className} />
      ) : (
        <textarea
          {...props}
          className={`${className} resize-none min-w-full overflow-hidden h-[64px] overflow-y-auto`}
          ref={inputRef}
        />
      )}
    </label>
  )
}
