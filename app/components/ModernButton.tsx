import Link from "next/link";
import { ReactNode } from "react";
import { easeInOut, motion } from "motion/react";

type ButtonVariant = "primary" | "secondary" | "success" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  icon,
  iconPosition = "left",
}: ButtonProps) {
  // Sleek minimal base styles
  const baseStyles =
    "font-normal rounded-lg inline-flex items-center justify-center focus:outline-none shadow-md drop-shadow-sm [box-shadow:inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_6px_rgba(0,0,0,0.1)]";

  // Elegant variant style
  const variantStyles = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm",
    secondary: "bg-gray-100 text-gray-900 shadow-sm",
    success:
      "bg-transparent font-bold border border-blue-400 text-blue-700 shadow-xs",
    outline: "border border-gray-300 text-gray-700 bg-white",
  };

  // Compact size styles
  const sizeStyles = {
    sm: "px-4 py-1 text-sm gap-1.5",
    md: "px-8 py-1.5 text-sm gap-2",
    lg: "px-8 py-2 text-base gap-2",
  };

  // Disabled styles
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  // Combine all styles
  const buttonClasses =
    `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`.trim();

  // Button content with animated icons
  const buttonContent = (
    <>
      {icon && iconPosition === "left" && (
        <motion.span
          className="flex-shrink-0"
          whileHover={{ scale: 1.1, rotate: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {icon}
        </motion.span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <motion.span
          className="flex-shrink-0"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {icon}
        </motion.span>
      )}
    </>
  );

  // If href is provided, render as Link
  if (href) {
    return (
      <motion.div
        whileHover={{
          scale: 1.02,

          transition: {
            duration: 0.1,

            ease: "easeInOut",
          },
        }}
      >
        <Link href={href} className={buttonClasses}>
          {buttonContent}
        </Link>
      </motion.div>
    );
  }

  // Otherwise render as button
  return (
    <motion.button
      whileHover={{
        scale: 1.02,
        transition: {
          duration: 0.03,
        },
      }}
      whileTap={{
        scale: 0.98,
      }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {buttonContent}
    </motion.button>
  );
}
