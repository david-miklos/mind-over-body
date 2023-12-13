'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { addEmail } from '~/utils/actions'

const initialState = {
  message: null,
}

export function EmailForm() {
  const [state, fromAction] = useFormState(addEmail, initialState)
  const { pending } = useFormStatus()

  return (
    <form className="flex flex-col space-y-6" action={fromAction}>
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
      <button
        className="bg-slate-900 text-slate-50 px-2 py-1 font-light text-sm mx-auto"
        type="submit"
        disabled={pending}
      >
        subscribe
      </button>
      <p className="flex items-center justify-center">{state?.message}</p>
    </form>
  )
}
