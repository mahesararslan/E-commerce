"use client";
import { motion } from 'framer-motion'
import FaqItem from "@/components/faq-item"

const faqs = [
  {
    question: "What types of devices does DeviceHaven offer?",
    answer: "DeviceHaven offers a wide range of electronic devices including smartphones, laptops, tablets, smartwatches, wireless earbuds, and other accessories from various leading brands."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we offer international shipping to many countries. Shipping costs and delivery times may vary depending on the destination. Please check our shipping policy for more details."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for most items. Products must be returned in their original condition with all accessories. Some exceptions apply for certain products. Please refer to our return policy page for full details."
  },
  {
    question: "Are the products you sell brand new?",
    answer: "Yes, all our products are brand new and come with full manufacturer warranty unless explicitly stated otherwise (e.g., in the case of refurbished items which are clearly marked as such)."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this number on our website or the carrier's website to track your package."
  },
  {
    question: "Do you offer price matching?",
    answer: "Yes, we offer price matching on identical products from authorized retailers. Please contact our customer service with the details of the lower-priced item within 7 days of your purchase."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and various digital wallets. For specific regions, we also offer options like bank transfers and cash on delivery."
  },
  {
    question: "Do you offer warranties on your products?",
    answer: "All our products come with standard manufacturer warranties. We also offer extended warranty options for many items. Check the product page or contact customer service for specific warranty information."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach our customer support team via email at support@devicehaven.com, through our live chat on the website, or by phone at 1-800-DEVICE-HAVEN. Our support hours are Monday to Friday, 9 AM to 6 PM EST."
  },
  {
    question: "Do you offer repair services for devices?",
    answer: "While we don't offer repair services directly, we can assist you in connecting with authorized service centers for the brands we sell. For warranty-covered repairs, we'll guide you through the process of claiming the warranty."
  },
  {
    question: "Can I cancel or modify my order after it's been placed?",
    answer: "You can cancel or modify your order within 1 hour of placing it. After that, we start processing orders for shipment. Please contact our customer service immediately if you need to make changes to a recent order."
  },
  {
    question: "Do you have a loyalty program?",
    answer: "Yes, we have a DeviceHaven Rewards program. Members earn points on purchases which can be redeemed for discounts on future orders. Sign up is free and you start earning points with your first purchase!"
  }
]

export default function FaqPage() {
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
              Frequently Asked Questions
            </motion.h1>
            <motion.div 
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}

