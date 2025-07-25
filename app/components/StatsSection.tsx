"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export function StatsSection() {
  const [stats, setStats] = useState([
    {
      number: "-",
      label: "Books Available",
      icon: "📚",
      description: "Extensive collection across all genres",
    },
    {
      number: "-",
      label: "Happy Readers",
      icon: "👥",
      description: "Growing community of book lovers",
    },
    {
      number: "-",
      label: "Books Rented",
      icon: "📖",
      description: "Stories shared and knowledge spread",
    },
    {
      number: "-",
      label: "User Rating",
      icon: "⭐",
      description: "Excellent service satisfaction",
    },
  ]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        if (data.success) {
          setStats([
            {
              number: data.booksAvailable,
              label: "Books Available",
              icon: "📚",
              description: "Extensive collection across all genres",
            },
            {
              number: data.happyReaders,
              label: "Happy Readers",
              icon: "👥",
              description: "Growing community of book lovers",
            },
            {
              number: data.booksRented,
              label: "Books Rented",
              icon: "📖",
              description: "Stories shared and knowledge spread",
            },
            {
              number: data.userRating,
              label: "User Rating",
              icon: "⭐",
              description: "Excellent service satisfaction",
            },
          ]);
        }
      } catch (err) {
        // fallback: keep dashes
      }
    }
    fetchStats();
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our growing community of readers
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {stat.number}
              </div>
              <div className="text-sm font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-gray-600 text-xs">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
