"use client";

import { motion } from "motion/react";

export function FeaturesSection() {
  const features = [
    {
      icon: "🔍",
      title: "Smart Search",
      description:
        "Find books instantly with our advanced search filters by author, genre, rating, and availability.",
      color: "blue",
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description:
        "Access your library anywhere, anytime. Our responsive design works perfectly on all devices.",
      color: "green",
    },
    {
      icon: "⚡",
      title: "Instant Rentals",
      description:
        "Rent books with just one click. No waiting, no complicated processes - just pure convenience.",
      color: "purple",
    },
    {
      icon: "🔔",
      title: "Smart Reminders",
      description:
        "Never miss a return date with our intelligent notification system that keeps you organized.",
      color: "orange",
    },
    {
      icon: "💎",
      title: "Premium Collection",
      description:
        "Access exclusive titles, latest releases, and rare finds carefully curated for our community.",
      color: "indigo",
    },
    {
      icon: "🤝",
      title: "Community Reviews",
      description:
        "Discover your next great read through honest reviews and recommendations from fellow readers.",
      color: "pink",
    },
  ];

  const colorVariants = {
    blue: "from-blue-500 to-blue-600 border-blue-200 hover:border-blue-300",
    green:
      "from-green-500 to-green-600 border-green-200 hover:border-green-300",
    purple:
      "from-purple-500 to-purple-600 border-purple-200 hover:border-purple-300",
    orange:
      "from-orange-500 to-orange-600 border-orange-200 hover:border-orange-300",
    indigo:
      "from-indigo-500 to-indigo-600 border-indigo-200 hover:border-indigo-300",
    pink: "from-pink-500 to-pink-600 border-pink-200 hover:border-pink-300",
  };

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Why Choose BookRental?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of book lending with innovative features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -3,
                transition: { duration: 0.2 },
              }}
              className={`bg-white rounded-xl p-6 border transition-all duration-300 hover:shadow-lg ${
                colorVariants[feature.color as keyof typeof colorVariants]
              }`}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
