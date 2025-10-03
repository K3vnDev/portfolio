import { EVENTS } from '@/consts'
import { useErrorMessage } from '@/hooks/useErrorMessage'
import type { MailState } from '@/types.d'
import { extractFormData } from '@/utils/extractFormData'
import { firstToUpper } from '@/utils/firstToUpper'
import { sendMail } from '@/utils/sendMail'
import { AnimatedToggable } from '@components/animated-toggable/AnimatedToggable'
import * as EmailValidator from 'email-validator'
import { useEffect, useState } from 'react'
import { CheckIcon, CrossIcon, LoadingIcon, MailIcon } from '../icons'
import { Input } from './Input'

export const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [mailState, setMailState] = useState<MailState>('initial')
  const { isShowingError, setNewError, errorMessage, hideError } = useErrorMessage(4000)

  useEffect(() => {
    document.addEventListener(EVENTS.OPEN_CONTACT, open)
    return () => document.removeEventListener(EVENTS.OPEN_CONTACT, open)
  }, [])

  const close = () => {
    setIsOpen(false)
    setMailState('initial')
  }
  const open = () => {
    hideError()
    setIsOpen(true)
  }

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
    console.log('click')

    if (!(e.target as HTMLElement).closest('form')) {
      close()
    }
  }

  const icons = {
    sending: <LoadingIcon className='animate-spin' />,
    sent: <CheckIcon />,
    error: <CrossIcon />
  }

  return (
    <>
      {/* Dialog menu */}
      <AnimatedToggable
        animation='pop'
        refresh={[isShowingError, errorMessage, mailState]}
        toggle={isOpen}
      >
        <form
          className={`
            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-top-left z-[99999]
            flex-col items-center md:gap-y-5 gap-y-4 bg-zinc-950/75 border-2
            border-zinc-800 rounded-xl p-9 pb-4 shadow-xl
            md:w-auto w-[calc(100vw-20px)] max-w-[32rem] backdrop-blur-xl
          `}
          onSubmit={handleSubmit}
        >
          <header className='text-white flex gap-2 items-center mb-2'>
            <MailIcon className='sm:size-7 size-6' />
            <span className='sm:text-2xl text-xl font-semibold'>Contact</span>
          </header>

          <div className='flex md:flex-row md:justify-between flex-col gap-x-7 md:gap-y-5 gap-y-4 max-w-full w-full'>
            <Input name='name' mailState={mailState} />
            <Input name='email' mailState={mailState} />
          </div>
          <Input name='message' textarea mailState={mailState} />

          <button
            className={`
              bg-black px-20 py-2 rounded-lg hover:brightness-150 active:scale-95
              active:brightness-90 disabled:brightness-50 disabled:scale-100 
              transition mt-1 flex gap-2 items-center text-white
              border border-zinc-800
              `}
            disabled={mailState === 'sending'}
          >
            <span className='text-xl *:size-8'>
              {mailState === 'initial' ? 'Send' : firstToUpper(mailState)}
            </span>
            {mailState !== 'initial' && icons[mailState]}
          </button>

          {/* Error message */}
          <AnimatedToggable animation='fade' toggle={isShowingError} refresh={[errorMessage]}>
            <span
              className={`
                absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-11 
                text-red-400 text-lg [text-shadow:0_0_3rem_black]
              `}
            >
              {errorMessage}
            </span>
          </AnimatedToggable>
        </form>
      </AnimatedToggable>

      {/* Black background */}
      <AnimatedToggable
        animation='fade'
        refresh={[isShowingError, errorMessage, mailState]}
        toggle={isOpen}
      >
        <div
          onPointerDown={handleClick}
          className={`
            fixed z-[9999] top-0 left-0
            h-dvh w-screen bg-black/35 backdrop-blur-sm
          `}
        />
      </AnimatedToggable>
    </>
  )
}
