import React, { useState, useRef, useEffect } from 'react'
import { Input } from "@/components/ui/input"

interface OtpInputProps {
  length: number
  onComplete: (otp: string) => void
}

export function OtpInput({ length, onComplete }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    if (element.nextSibling && element.value !== '') {
      (element.nextSibling as HTMLInputElement).focus()
    }

    if (index === length - 1 && element.value !== '') {
      onComplete(otp.join('') + element.value)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex justify-center space-x-2">
      {otp.map((_, index) => (
        <Input
          key={index}
          type="text"
          maxLength={1}
          ref={el => {
            inputRefs.current[index] = el;
          }}
          value={otp[index]}
          onChange={e => handleChange(e.target, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          className="w-12 h-12 text-center text-2xl"
        />
      ))}
    </div>
  )
}

