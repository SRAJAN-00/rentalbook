"use client";

import { motion } from "motion/react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Book Enthusiast",
      avatar: "👩‍🎓",
      rating: 5,
      text: "BookRental has completely transformed my reading habits! The selection is incredible and the rental process is so smooth. I've discovered so many new authors through their recommendations.",
      books: "45+ books rented",
    },
    {
      name: "Michael Chen",
      role: "University Student",
      avatar: "👨‍🎓",
      rating: 5,
      text: "As a student, this service has been a lifesaver. I can access textbooks and leisure reading without breaking the bank. The mobile app makes it so convenient to manage my rentals.",
      books: "32+ books rented",
    },
    {
      name: "Emily Rodriguez",
      role: "Working Professional",
      avatar: "👩‍💼",
      rating: 5,
      text: "The reminder system is fantastic - I never have to worry about late returns. The community reviews help me choose books I'll actually enjoy. Highly recommended!",
      books: "67+ books rented",
    },
    {
      name: "David Thompson",
      role: "Retired Teacher",
      avatar: "👨‍🏫",
      rating: 5,
      text: "I love how easy it is to find classic literature and new releases. The search filters are incredibly helpful, and the customer service is outstanding. This old teacher approves!",
      books: "89+ books rented",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Readers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our amazing community of
            readers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ⭐
                  </span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                "{testimonial.text}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {testimonial.books}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            Join the BookRental Community
          </h3>
          <p className="text-blue-100 mb-6 text-lg">
            Over 2,500 readers trust us with their literary journey. Your next
            favorite book is waiting!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <div className="font-semibold">Secure & Safe</div>
              <div className="text-blue-200 text-sm">
                Your data is protected
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-semibold">Lightning Fast</div>
              <div className="text-blue-200 text-sm">Instant book rentals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💬</div>
              <div className="font-semibold">24/7 Support</div>
              <div className="text-blue-200 text-sm">We're here to help</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
