"use client";
import { motion } from 'framer-motion'

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </motion.h1>
            <motion.div 
              className="max-w-3xl mx-auto space-y-6 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p>At DeviceHaven, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines our practices concerning the collection, use, and sharing of your data.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact our customer service. This may include your name, email address, postal address, phone number, and payment information.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
              <p>We use your information to process orders, provide customer service, send promotional communications, improve our services, and comply with legal obligations.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Information Sharing and Disclosure</h2>
              <p>We do not sell your personal information. We may share your information with service providers who assist us in our operations, when required by law, or in connection with a sale or merger of our company.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Data Security</h2>
              <p>We implement a variety of security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Cookies and Tracking Technologies</h2>
              <p>We use cookies and similar technologies to enhance your experience on our site, analyze trends, and administer the website.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Your Rights and Choices</h2>
              <p>You may update, correct, or delete your account information at any time. You may also opt-out of receiving promotional communications from us.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">7. Children's Privacy</h2>
              <p>Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">8. Changes to this Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
              
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">9. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at privacy@devicehaven.com.</p>
              
              <p className="mt-8">This Privacy Policy was last updated on 4 December 2024.</p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

