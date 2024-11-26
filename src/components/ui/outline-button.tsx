import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function OutlineButton(props: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className={twMerge(
        'flex items-center px-3 py-2 gap-2 leading-none rounded-full border border-dashed border-sky-800 text-sm text-zinc-300 hover:border-rose-700 disabled:opacity-50 disabled:border-zinc-800 disabled:pointer-events-none outline-none focus-visible:border-pink-500 ring-pink-500/10 focus-visible:ring-4',
        props.className
      )}
    />
  )
}
