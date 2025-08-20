"use client";

interface FavProps {
  bookId?: string;
  isFavorite: boolean;
  onToggle: (bookId: string, isFav: boolean) => Promise<void>;
}

const Fav = ({ bookId, isFavorite, onToggle }: FavProps) => {
  const handleFavClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!bookId) return;

    await onToggle(bookId, isFavorite);
  };

  return (
    <button
      onClick={handleFavClick}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`
        group relative top-[-4px] rounded-full transition-all duration-200 
       
        transform hover:scale-110 active:scale-95
      `}
    >
      <div className="relative">
        {isFavorite ? (
          <div className="text-xl ">❤️</div>
        ) : (
          <div className="text-xl group-hover:scale-110 transition-transform duration-200">
            🤍
          </div>
        )}

        {/* Subtle glow effect for favorited items */}
        {isFavorite && <div className="absolute inset-0  "></div>}
      </div>
    </button>
  );
};

export default Fav;
