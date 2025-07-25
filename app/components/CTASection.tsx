"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export function CTASection() {
  const router = useRouter();

  return (
    <section className="py-12 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Next Great Read
            <span className="block text-blue-300">Awaits You</span>
          </h2>
          <p className="text-lg text-blue-100 mb-6 leading-relaxed">
            Join thousands of book lovers who have discovered the joy of
            unlimited reading.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/books")}
              className="bg-white text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Browse Books Now 📖
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push("/auth/signin")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-blue-500"
            >
              Sign Up Free ✨
            </motion.button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-blue-200 text-sm">
            <div className="flex items-center">
              <span className="text-green-400 mr-1">✓</span>
              No hidden fees
            </div>
            <div className="flex items-center">
              <span className="text-green-400 mr-1">✓</span>
              Cancel anytime
            </div>
            <div className="flex items-center">
              <span className="text-green-400 mr-1">✓</span>
              24/7 support
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
            ease: "easeInOut",
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
            ease: "easeInOut",
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
            ease: "easeInOut",
          }}
        >
          📚
        </motion.div>
      </div>
    </section>
  );
}
