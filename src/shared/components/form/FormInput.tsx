import clsx from "clsx";
import { InputHTMLAttributes } from "react"


type Props = InputHTMLAttributes<HTMLInputElement>;

export function FormInput(props: Props) {
  return (
    <input {...props} className={clsx('py-2 px-4 border border-gray-300 rounded-lg', props.className)}/>
  )
}
