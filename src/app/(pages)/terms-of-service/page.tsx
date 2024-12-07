"use client"
import { motion } from 'framer-motion'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <section className="py-16 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Terms of Service
            </motion.h1>
            <motion.div 
              className="max-w-3xl mx-auto space-y-6 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p>Welcome to DeviceHaven. By using our website and services, you agree to comply with and be bound by the following terms and conditions:</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>By accessing or using DeviceHaven's website and services, you agree to these Terms of Service and all applicable laws and regulations.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Use of Service</h2>
              <p>You agree to use DeviceHaven's services only for lawful purposes and in accordance with these Terms of Service.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Product Information</h2>
              <p>We strive to provide accurate product information, but we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Pricing and Availability</h2>
              <p>All prices are subject to change without notice. We reserve the right to modify or discontinue any product or service without notice.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. User Accounts</h2>
              <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Privacy</h2>
              <p>Your use of DeviceHaven's services is subject to our Privacy Policy. Please review our Privacy Policy, which also governs the site and informs users of our data collection practices.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Intellectual Property</h2>
              <p>The content, organization, graphics, design, and other matters related to the site are protected under applicable copyrights and other proprietary laws. Copying, redistribution, use or publication by you of any such matters or any part of the site is strictly prohibited.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">8. Limitation of Liability</h2>
              <p>DeviceHaven shall not be liable for any special or consequential damages that result from the use of, or the inability to use, the services and products offered on this site.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">9. Governing Law</h2>
              <p>These Terms of Service and your use of the site are governed by and construed in accordance with the laws applicable in the jurisdiction where DeviceHaven operates.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">10. Changes to Terms</h2>
              <p>DeviceHaven reserves the right to modify these Terms of Service at any time. We do so by posting and drawing attention to the updated terms on the site. Your decision to continue to visit and make use of the site after such changes have been made constitutes your formal acceptance of the new Terms of Service.</p>
              
              <p className="mt-8">If you have any questions about these Terms of Service, please contact us at legal@devicehaven.com.</p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

