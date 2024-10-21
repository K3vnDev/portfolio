import { EVENTS } from '@/consts.d'
import { firstToUpper } from '@/utils/firstToUpper'
import { getElementRef } from '@/utils/getElementRef'
import Check from '@icons/Check'
import Cross from '@icons/Cross'
import Loading from '@icons/Loading'
import MailIcon from '@icons/Mail'
import { useEffect, useRef, useState } from 'react'

export const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false)

  const close = () => {
    setIsOpen(false)
    setMailState('initial')
  }
  const open = () => setIsOpen(true)

  type MailState = 'initial' | 'sending' | 'sent' | 'error'
  const [mailState, setMailState] = useState<MailState>('initial')

  useEffect(() => {
    document.addEventListener(EVENTS.OPEN_CONTACT, open)
    return () => document.removeEventListener(EVENTS.OPEN_CONTACT, open)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.target as HTMLFormElement)
    e.preventDefault()

    const data = {
      name: formData.get('name')?.toString(),
      email: formData.get('email')?.toString(),
      message: formData.get('message')?.toString()
    }

    // TODO: Check fields

    setMailState('sending')

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        setMailState('error')
        return
      }

      const { success } = await response.json()
      success ? setMailState('sent') : setMailState('error')
    } catch {
      setMailState('error')
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    !(e.target as HTMLElement).closest('form') ? close() : undefined
  }

  return isOpen ? (
    <div
      onPointerDown={handleClick}
      className='fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center h-screen w-screen bg-black/15 backdrop-blur-[4px]'
    >
      <form
        className='flex flex-col items-center md:gap-y-5 gap-y-4 bg-zinc-900 border-2 border-zinc-800 rounded-xl p-7 pb-4 shadow-xl md:w-auto w-full max-w-[32rem] mx-12'
        onSubmit={handleSubmit}
      >
        <header className='text-white flex gap-2 items-center mb-2'>
          <MailIcon className='sm:size-7 size-6' />
          <span className='sm:text-2xl text-xl font-semibold'>Conctact me</span>
        </header>

        <div className='flex md:flex-row md:justify-between flex-col gap-x-7 md:gap-y-5 gap-y-4 max-w-full w-full'>
          <Input name='name' />
          <Input name='email' />
        </div>
        <Input name='message' textarea />

        <button
          className='bg-zinc-950 px-12 py-2 rounded-lg hover:brightness-150 active:scale-95 active:brightness-90 disabled:brightness-50 disabled:scale-100 transition mt-1 flex gap-2 items-center text-white'
          disabled={mailState === 'sending'}
        >
          <span className='text-xl *:size-8'>Send</span>
          {mailState === 'sending' && <Loading className='animate-spin' />}
          {mailState === 'sent' && <Check />}
          {mailState === 'error' && <Cross />}
        </button>
      </form>
    </div>
  ) : (
    <></>
  )
}

interface InputProps {
  name: string
  className?: string
  textarea?: boolean
}

const Input = ({ name, textarea }: InputProps) => {
  const className =
    'bg-zinc-800 border border-zinc-700 rounded-[.3rem] outline-none px-2 py-1 text-gray-200 hover:brightness-110 focus:brightness-125 focus:outline-2 focus:outline-zinc-600 -outline-offset-1 transition w-full'

  const textareaRef = useRef(null)

  const recalculateHeight = () => {
    const input = getElementRef(textareaRef)
    const [min, max] = [64, 192]

    input.style.height = '0px'
    const { scrollHeight } = input
    const newScrollHeight = scrollHeight < min ? min : scrollHeight > max ? max : scrollHeight
    input.style.height = `${newScrollHeight}px`
  }

  return (
    <label className='flex flex-col w-full gap-[.4rem]'>
      <span className='text-gray-100 text-sm'>{firstToUpper(name)}</span>
      {!textarea ? (
        <input name={name} className={className} />
      ) : (
        <textarea
          onChange={recalculateHeight}
          name={name}
          className={`${className} resize-none min-w-full overflow-hidden h-[64px] overflow-y-auto [color-scheme:dark]`}
          ref={textareaRef}
        />
      )}
    </label>
  )
}
