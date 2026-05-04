"use client";

import Button from "./ModernButton";
import Navbar from "./NavItems";
import { motion } from "motion/react";
import { Star, Zap, Smartphone, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <Navbar />

      <div className="relative max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8  lg:py-20">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-semibold text-slate-700 mb-8"
          >
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            Trusted by 10,000+ readers worldwide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight
             leading-[1]"
          >
            Rent. Read. Repeat.
            <span className="block mt-4 text-blue-600 text-shadow-sm">
              Find your next favorite book.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Thousands of titles across all genres. Rent instantly, read across
            all your devices, and enjoy a sustainable way of reading. Flexible
            periods and secure payments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full"
          >
            <Button
              href="/books"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto px-8"
            >
              Browse Books
            </Button>
            <Button
              href="/signup"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto px-8"
            >
              Create Account
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-16 flex flex-wrap gap-6 sm:gap-10 justify-center items-center"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <span className="font-medium text-slate-700">Instant Access</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <span className="font-medium text-slate-700">Read Anywhere</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <span className="font-medium text-slate-700">
                Secure Payments
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
