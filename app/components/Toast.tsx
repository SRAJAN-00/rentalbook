"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

export interface ToastProps {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast = ({ id, type, title, message, duration = 5000, onClose }: ToastProps) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-500",
          border: "border-green-600",
          icon: "✓",
          iconBg: "bg-green-600"
        };
      case "error":
        return {
          bg: "bg-red-500",
          border: "border-red-600",
          icon: "✗",
          iconBg: "bg-red-600"
        };
      case "warning":
        return {
          bg: "bg-yellow-500",
          border: "border-yellow-600",
          icon: "⚠",
          iconBg: "bg-yellow-600"
        };
      case "info":
        return {
          bg: "bg-blue-500",
          border: "border-blue-600",
          icon: "i",
          iconBg: "bg-blue-600"
        };
    }
  };

  const styles = getToastStyles();

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`${styles.bg} ${styles.border} border-l-4 text-white p-4 rounded-lg shadow-lg max-w-sm w-full pointer-events-auto`}
    >
      <div className="flex items-start">
        <div className={`${styles.iconBg} rounded-full w-6 h-6 flex items-center justify-center text-white text-sm font-bold mr-3 mt-0.5`}>
          {styles.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm">
            {title}
          </div>
          {message && (
            <div className="text-sm opacity-90 mt-1">
              {message}
            </div>
          )}
        </div>
        <button
          onClick={() => onClose(id)}
          className="ml-3 text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default Toast;
