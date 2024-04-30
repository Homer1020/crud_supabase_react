import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  error?: string
}

export default function Input({error, className, name, label, ...props}: Props) {
  return (
    <>
      <label htmlFor={name} className="label">{label}</label>
      <input {...props} name={name} id={name} className={`input input-bordered w-full ${className}`} />
      { error && (
        <span className="text-red-400 mt-2 block text-sm">{error}</span>
      ) }
    </>
  )
}