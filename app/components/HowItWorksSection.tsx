"use client";

import { motion } from "motion/react";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Browse & Discover",
      description: "Explore our vast collection of books across all genres. Use our smart search and filtering system to find exactly what you're looking for.",
      icon: "🔍",
      color: "blue"
    },
    {
      step: "02", 
      title: "Rent Instantly",
      description: "Found your next read? Click 'Rent Now' and the book is yours! Our streamlined process takes just seconds to complete.",
      icon: "⚡",
      color: "green"
    },
    {
      step: "03",
      title: "Enjoy Reading",
      description: "Dive into your book and enjoy! You'll have it for the full rental period with automatic reminders before it's due.",
      icon: "📖",
      color: "purple"
    },
    {
      step: "04",
      title: "Return & Repeat",
      description: "When you're done, simply return the book and discover your next adventure. Rate and review to help other readers!",
      icon: "🔄",
      color: "orange"
    }
  ];

  const colorVariants = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600", 
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600"
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting started is simple. Follow these easy steps to begin your reading journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-indigo-200 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-blue-300"></div>
                </div>
              )}

              <div className="relative z-10 text-center">
                {/* Step Number */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${colorVariants[step.color as keyof typeof colorVariants]} flex items-center justify-center shadow-lg`}
                >
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </motion.div>

                {/* Icon */}
                <div className="text-5xl mb-4">{step.icon}</div>

                {/* Content */}
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Reading Journey?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Join thousands of readers who have discovered their love for books through our platform. 
              It takes less than 2 minutes to get started!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                No membership fees
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Flexible rental periods
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                24/7 customer support
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
