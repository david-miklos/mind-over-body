'use client'
import { useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { addEmail } from '~/utils/actions'

const initialState = {
  message: null,
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className="bg-slate-900 text-slate-50 px-2 py-1 font-light text-sm mx-auto"
      type="submit"
      disabled={pending}
    >
      {pending ? 'subscribing...' : 'subscribe'}
    </button>
  )
}

export function EmailForm() {
  const emailFormRef = useRef<HTMLFormElement>(null)
  const [state, fromAction] = useFormState(addEmail, initialState)
  const { pending } = useFormStatus()

  return (
    <form
      className="flex flex-col space-y-6"
      ref={emailFormRef}
      action={(formData) => {
        fromAction(formData)
        emailFormRef.current?.reset()
      }}
    >
      <div className="flex space-x-2">
        <label className="text-sm" htmlFor="email">
          add email to mailing list
        </label>
        <input
          className="border border-slate-900 rounded"
          type="text"
          id="email"
          name="email"
          required
        />
      </div>
      <SubmitButton />
      <p className="flex items-center justify-center">{state?.message}</p>
    </form>
  )
}
