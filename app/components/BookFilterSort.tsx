import Button from "./ModernButton";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface FilterSortProps {
  genres: string[];
  genreFilter: string;
  availabilityFilter: string;
  sortBy: string;
  onGenreChange: (genre: string) => void;
  onAvailabilityChange: (availability: string) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

// Custom Animated Dropdown Component
function AnimatedDropdown({
  value,
  onChange,
  options,
  placeholder = "Select option",
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${className}`}>
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 bg-white flex items-center justify-between"
        whileTap={{ scale: 0.99 }}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <motion.svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
          >
            {options.map((option, index) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left hover:bg-blue-50 transition-colors ${
                  value === option.value ? " text-blue-700" : "text-gray-700"
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                whileHover={{ backgroundColor: "#eff6ff", x: 2 }}
              >
                {option.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}

export default function BookFilterSort({
  genres,
  genreFilter,
  availabilityFilter,
  sortBy,
  onGenreChange,
  onAvailabilityChange,
  onSortChange,
  onClearFilters,
  hasActiveFilters,
}: FilterSortProps) {
  // Prepare options for dropdowns
  const genreOptions = [
    { value: "", label: "All Genres" },
    ...genres.map((genre) => ({ value: genre, label: genre })),
  ];

  const availabilityOptions = [
    { value: "", label: "All Books" },
    { value: "available", label: "📗 Available" },
    { value: "unavailable", label: "📕 Not Available" },
  ];

  const sortOptions = [
    { value: "title", label: "📖 Title A-Z" },
    { value: "author", label: "👤 Author A-Z" },
    { value: "year", label: "📅 Newest First" },
    { value: "availability", label: "✅ Most Available" },
  ];
  function nameanimate() {
    return {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: 0.2, duration: 0.4 },
    };
  }
  return (
    <motion.div
      className="mb-8 p-6 bg-white rounded-xl border border-gray-200 text-neutral-900 shadow-sm"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Filter & Sort Books
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Genre Filter */}
        <motion.div {...nameanimate()}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genre
          </label>
          <AnimatedDropdown
            value={genreFilter}
            onChange={onGenreChange}
            options={genreOptions}
            placeholder="Select genre"
          />
        </motion.div>

        {/* Availability Filter */}
        <motion.div {...nameanimate()}>
          <label className="block text-sm font-medium text-gray-700  mb-2">
            Availability
          </label>
          <AnimatedDropdown
            value={availabilityFilter}
            onChange={onAvailabilityChange}
            options={availabilityOptions}
            placeholder="Select availability"
          />
        </motion.div>

        {/* Sort By */}
        <motion.div {...nameanimate()}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <AnimatedDropdown
            value={sortBy}
            onChange={onSortChange}
            options={sortOptions}
            placeholder="Select sort option"
          />
        </motion.div>

        {/* Clear Filters */}
        <motion.div className="flex items-end" {...nameanimate()}>
          {hasActiveFilters ? (
            <Button
              onClick={onClearFilters}
              variant="outline"
              className="w-full"
            >
              Clear Filters
            </Button>
          ) : (
            <div className="w-full p-2 text-center text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
              No filters active
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
