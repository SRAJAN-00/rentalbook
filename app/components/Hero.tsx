import Button from "./ModernButton";
import Navbar from "./NavItems";

export function Hero() {
  return (
    <div>
      <Navbar />
      <div className=" text-gray-900 h-screen  text-center py-16">
        <div>
          <div className=" mt-10">
            <span className="  px-3 py-2 text-neutral-800 shadow-md text-xs rounded-full  bg-neutral-50 inline-flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#FFD700"
                stroke="#FFD700"
                strokeWidth="1"
              >
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
              Trusted by 10,000+ readers
            </span>
          </div>
        </div>
        <div className="mt-12">
          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-[80px] [text-shadow:inset_0_1px_2px_rgba(0,0,0,0.1)]">
            Your Digital
            <span className="block bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent [text-shadow:inset_0_1px_2px_rgba(0,0,0,0.1)]">
              Library Awaits 📚
            </span>
          </h1>
          <p className="text-l lg:text-xl text-gray-600 mb-12 max-w-[750px] mx-auto leading-relaxed [text-shadow:inset_0_1px_1px_rgba(0,0,0,0.05)]">
            Discover, rent, and enjoy thousands of books from our extensive
            digital collection. Your next great read is just a click away.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex gap-4 justify-center flex-wrap mt-8">
            <Button
              href="/books"
              variant="primary"
              size="lg"
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              }
              iconPosition="right"
            >
              Browse Books
            </Button>
            <Button
              href="/dashboard"
              variant="success"
              size="lg"
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              }
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
