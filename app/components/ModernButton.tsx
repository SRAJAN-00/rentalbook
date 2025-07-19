import Link from "next/link";
import { ReactNode } from "react";

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
    "font-normal rounded-lg transition-all duration-200 inline-flex items-center justify-center focus:outline-none shadow-md drop-shadow-sm [box-shadow:inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_6px_rgba(0,0,0,0.1)]";

  // Elegant variant style
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:bg-gray-800 shadow-sm hover:shadow-md hover:[box-shadow:inset_0_1px_2px_rgba(255,255,255,0.2),0_6px_12px_rgba(0,0,0,0.15)]",
    secondary:
      "bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm hover:shadow-md hover:[box-shadow:inset_0_1px_2px_rgba(255,255,255,0.2),0_6px_12px_rgba(0,0,0,0.15)]",
    success:
      "bg-transparent font-bold border border-blue-400 text-blue-700 hover:bg-blue-100 shadow-xs hover:shadow-md hover:[box-shadow:inset_0_1px_2px_rgba(255,255,255,0.2),0_6px_12px_rgba(0,0,0,0.15)]",
    outline:
      "border border-gray-300 text-gray-700 bg-white hover:border-gray-400 hover:bg-gray-50  hover:shadow-md hover:[box-shadow:inset_0_1px_2px_rgba(255,255,255,0.2),0_6px_12px_rgba(0,0,0,0.15)]",
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

  // Button content with icon support
  const buttonContent = (
    <>
      {icon && iconPosition === "left" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </>
  );

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {buttonContent}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {buttonContent}
    </button>
  );
}
