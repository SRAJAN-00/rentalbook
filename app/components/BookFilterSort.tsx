import Button from "./ModernButton";

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
  return (
    <div className="mb-8 p-6 bg-white rounded-xl border border-gray-200 text-neutral-900 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Filter & Sort Books
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Genre Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genre
          </label>
          <select
            value={genreFilter}
            onChange={(e) => onGenreChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Availability Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Availability
          </label>
          <select
            value={availabilityFilter}
            onChange={(e) => onAvailabilityChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Books</option>
            <option value="available">📗 Available</option>
            <option value="unavailable">📕 Not Available</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="title">📖 Title A-Z</option>
            <option value="author">👤 Author A-Z</option>
            <option value="year">📅 Newest First</option>
            <option value="availability">✅ Most Available</option>
          </select>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
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
        </div>
      </div>
    </div>
  );
}
