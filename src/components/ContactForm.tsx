import { EVENTS } from '@/consts'
import { useErrorMessage } from '@/hooks/useErrorMessage'
import type { MailState } from '@/types.d'
import { extractFormData } from '@/utils/extractFormData'
import { firstToUpper } from '@/utils/firstToUpper'
import { getElementRef } from '@/utils/getElementRef'
import { sendMail } from '@/utils/sendMail'
import { AnimatedToggable } from '@components/AnimatedToggable/AnimatedToggable'
import Check from '@icons/Check'
import Cross from '@icons/Cross'
import Loading from '@icons/Loading'
import MailIcon from '@icons/Mail'
import * as EmailValidator from 'email-validator'
import { useEffect, useRef, useState } from 'react'

export const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mailState, setMailState] = useState<MailState>('initial')
  const { isShowingError, setNewError, errorMessage } = useErrorMessage(4000)

  useEffect(() => {
    document.addEventListener(EVENTS.OPEN_CONTACT, open)
    return () => document.removeEventListener(EVENTS.OPEN_CONTACT, open)
  }, [])

  const close = () => {
    setIsOpen(false)
    setMailState('initial')
  }
  const open = () => setIsOpen(true)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.target as HTMLFormElement)
    e.preventDefault()

    const [name, email, message] = extractFormData(formData, 'name', 'email', 'message')

    const emptyParams = !(name && message && email)
    if (emptyParams) return setNewError('There are empty fields.')

    const invalidEmail = !EmailValidator.validate(email)
    if (invalidEmail) return setNewError("That's not a valid email.")

    setMailState('sending')
    sendMail(name, email, message)
      .then(() => setMailState('sent'))
      .catch(() => setMailState('error'))
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    !(e.target as HTMLElement).closest('form') ? close() : undefined
  }

  const icons = {
    sending: <Loading className='animate-spin' />,
    sent: <Check />,
    error: <Cross />
  }

  return (
    <AnimatedToggable
      animation='fade'
      refresh={[isShowingError, errorMessage, mailState]}
      toggle={isOpen}
    >
      <div
        onPointerDown={handleClick}
        className='fixed z-50 top-0 left-0 flex justify-center items-center h-screen w-screen bg-black/50 backdrop-blur-[1px]'
      >
        <AnimatedToggable
          animation='pop'
          refresh={[isShowingError, errorMessage, mailState]}
          toggle={isOpen}
        >
          <form
            className='flex-col items-center relative md:gap-y-5 gap-y-4 bg-zinc-900 border-2 border-zinc-700 rounded-xl p-9 pb-4 shadow-xl md:w-auto w-full max-w-[32rem] mx-12'
            onSubmit={handleSubmit}
          >
            <header className='text-white flex gap-2 items-center mb-2'>
              <MailIcon className='sm:size-7 size-6' />
              <span className='sm:text-2xl text-xl font-semibold'>Conctact me</span>
            </header>

            <div className='flex md:flex-row md:justify-between flex-col gap-x-7 md:gap-y-5 gap-y-4 max-w-full w-full'>
              <Input name='name' mailState={mailState} />
              <Input name='email' mailState={mailState} />
            </div>
            <Input name='message' textarea mailState={mailState} />

            <button
              className='bg-zinc-950 px-20 py-2 rounded-lg hover:brightness-150 active:scale-95 active:brightness-90 disabled:brightness-50 disabled:scale-100 transition mt-1 flex gap-2 items-center text-white'
              disabled={mailState === 'sending'}
            >
              <span className='text-xl *:size-8'>
                {mailState === 'initial' ? 'Send' : firstToUpper(mailState)}
              </span>
              {mailState !== 'initial' && icons[mailState]}
            </button>

            <AnimatedToggable animation='fade' toggle={isShowingError} refresh={[errorMessage]}>
              <span className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-11 text-red-400 text-lg [text-shadow:0_0_.5rem_black]'>
                {errorMessage}
              </span>
            </AnimatedToggable>
          </form>
        </AnimatedToggable>
      </div>
    </AnimatedToggable>
  )
}

interface InputProps {
  name: string
  className?: string
  textarea?: boolean
  mailState: MailState
}

const Input = ({ name, textarea, mailState }: InputProps) => {
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
    bg-zinc-800 border border-zinc-700 rounded-[.3rem] outline-none px-2 py-1 text-gray-200 [color-scheme:dark] 
    hover:brightness-110 focus:brightness-125 focus:outline-2 focus:outline-zinc-600 -outline-offset-1 transition w-full
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
