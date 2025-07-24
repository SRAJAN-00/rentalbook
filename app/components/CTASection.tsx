"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export function CTASection() {
  const router = useRouter();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="text-7xl mb-6">📚</div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Next Great Read
            <span className="block text-blue-300">Awaits You</span>
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of book lovers who have discovered the joy of unlimited reading. 
            Start your literary adventure today with our vast collection of books.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-blue-200">Books Available</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="text-3xl font-bold text-white mb-2">2,500+</div>
              <div className="text-blue-200">Happy Readers</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="text-3xl font-bold text-white mb-2">4.9★</div>
              <div className="text-blue-200">User Rating</div>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/books')}
              className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Browse Books Now 📖
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/auth/signin')}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-blue-500"
            >
              Sign Up Free ✨
            </motion.button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-blue-200">
            <div className="flex items-center">
              <span className="text-green-400 mr-2">✓</span>
              No hidden fees
            </div>
            <div className="flex items-center">
              <span className="text-green-400 mr-2">✓</span>
              Cancel anytime
            </div>
            <div className="flex items-center">
              <span className="text-green-400 mr-2">✓</span>
              24/7 support
            </div>
            <div className="flex items-center">
              <span className="text-green-400 mr-2">✓</span>
              Instant access
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Books Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute text-4xl text-white/10 top-1/4 left-1/4"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          📚
        </motion.div>
        <motion.div
          className="absolute text-4xl text-white/10 top-1/3 right-1/4"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          📖
        </motion.div>
        <motion.div
          className="absolute text-4xl text-white/10 bottom-1/4 left-1/3"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          📚
        </motion.div>
      </div>
    </section>
  );
}
