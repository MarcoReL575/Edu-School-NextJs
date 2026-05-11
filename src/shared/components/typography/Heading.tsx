import clsx from "clsx";
import React from "react"

interface Props {
    children: React.ReactNode;
    level: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
}

export default function Heading({ children, level, className }: Props) {

    const sizeMap: Record<number, string> = {
        1: 'text-4xl',
        2: 'text-3xl',
        3: 'text-2xl',
        4: 'text-xl',
        5: 'text-lg',
        6: 'text-md',
    }

    const Tag: React.ElementType = `h${level}`

  return (
    <Tag className={clsx('capitalize', sizeMap[level], className)}>
        {children}
    </Tag>
  )
}
