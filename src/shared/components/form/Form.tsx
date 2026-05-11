import clsx from "clsx"
import { FormHTMLAttributes } from "react"

type Props = FormHTMLAttributes<HTMLFormElement>

export function Form(props: Props) {
  return (
    <form {...props} className={clsx('mt-10 space-y-6 container mx-auto max-w-4xl', props.className)}>
        {props.children}
    </form>
  )
}
