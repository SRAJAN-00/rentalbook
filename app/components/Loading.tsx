"use client";

import { motion } from "motion/react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "blue" | "white" | "gray" | "purple";
  className?: string;
}

const LoadingSpinner = ({ 
  size = "md", 
  color = "blue",
  className = "" 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  const colorClasses = {
    blue: "border-blue-500",
    white: "border-white",
    gray: "border-gray-500",
    purple: "border-purple-500"
  };

  return (
    <motion.div
      className={`animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    />
  );
};

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "white" | "gray" | "purple";
  fullScreen?: boolean;
  className?: string;
}

const LoadingState = ({ 
  message = "Loading...", 
  size = "lg",
  color = "blue",
  fullScreen = false,
  className = ""
}: LoadingStateProps) => {
  const containerClasses = fullScreen 
    ? "min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center"
    : "flex items-center justify-center py-12";

  return (
    <motion.div 
      className={`${containerClasses} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <LoadingSpinner size={size} color={color} className="mx-auto mb-4" />
        <motion.p 
          className="text-gray-600 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
};

interface BookLoadingCardProps {
  count?: number;
}

const BookLoadingCard = ({ count = 1 }: BookLoadingCardProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <div className="animate-pulse">
            {/* Image placeholder */}
            <div className="w-full h-48 bg-gray-200"></div>
            
            {/* Content placeholder */}
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

interface ButtonLoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ButtonLoading = ({ size = "sm", className = "" }: ButtonLoadingProps) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <LoadingSpinner size={size} color="white" />
      <span>Loading...</span>
    </div>
  );
};

export { LoadingSpinner, LoadingState, BookLoadingCard, ButtonLoading };
export default LoadingState;
