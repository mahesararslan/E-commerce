import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Logo } from './Logo'


interface AuthLayoutProps {
  children: ReactNode
  title: string
}

export function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-background rounded-lg shadow-xl p-8"
      >
        <Logo />
        <h2 className="text-3xl font-bold text-center mb-6">{title}</h2>
        {children}
      </motion.div>
    </div>
  )
}

