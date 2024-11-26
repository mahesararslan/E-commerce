'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AuthLayout } from '@/components/AuthLayout'
import { OtpInput } from '@/components/otp-input'
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { Toaster } from '@/components/ui/toaster'

export default function VerifyOtp() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast();
    const router = useRouter();
    const { email } = useParams();

  const handleOtpComplete = async (otp: string) => {
    setIsLoading(true)
    // Here you would typically send the OTP to your backend for verification
    console.log('OTP submitted:', otp)
    
    // @ts-ignore Simulating an API call 
    const response = await axios.post('/api/verify-otp', { email: email, otp })
    if (response.status !== 200) {
      toast({
        title: "Invalid OTP",
        description: "Please try again",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }
    
    setIsLoading(false)
    toast({
      title: "OTP Verified",
      description: "Your account has been successfully verified.",
    })
    

    // a timeout fuction before redirecting
    setTimeout(() => {
      router.push('/signin')
    }, 3000)
    
  }

  return (
    <>
      <AuthLayout title="Verify Your Account">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <p className="text-center text-muted-foreground">
          We've sent a verification code to your email. Please enter it below.
        </p>
        <OtpInput length={6} onComplete={handleOtpComplete} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <Button 
            variant="link" 
            className="text-primary"
            onClick={() => {
                // @ts-ignore
                axios.post('/api/send-otp', { email: session?.user.email })
              toast({
                title: "OTP Resent",
                description: "A new verification code has been sent to your email.",
              })
            }}

          >
            Didn't receive the code? Resend
          </Button>
        </motion.div>
      </motion.div>
    </AuthLayout>
    <Toaster />
    </>
  )
}

