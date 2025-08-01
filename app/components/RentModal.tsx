"use client";

import { useRental } from "../hooks/useRental";
import Button from "./ModernButton";

interface RentModalProps {
  bookId: string;
}

export default function RentModal({ bookId }: RentModalProps) {
  const {
    renterName,
    setRenterName,
    renterEmail,
    setRenterEmail,
    showRentModal,
    setShowRentModal,
    isRenting,
    handleRentSubmit,
    closeRentModal,
  } = useRental({
    onRentalSuccess: () => {
      // Refresh the page to update availability
      window.location.reload();
    },
  });

  // Set the book ID when the modal is opened
  const handleOpenModal = () => {
    setShowRentModal(true);
    // We need to set the selected book ID in the hook
    // For now, we'll handle this by passing it to the submit function
  };

  // Custom submit handler that includes the bookId
  const handleSubmitWithBookId = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookId || !renterName || !renterEmail) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("/api/rentals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId,
          renterName,
          renterEmail,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("Book rented successfully!");
        closeRentModal();
        // Refresh the page to update availability
        window.location.reload();
      } else {
        alert(result.error || "Failed to rent book");
      }
    } catch (error) {
      alert("Error renting book");
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        variant="primary"
        className="px-8 font-semibold"
      >
        📚 Rent This Book
      </Button>

      {showRentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Rent This Book
            </h3>

            <form onSubmit={handleSubmitWithBookId} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={renterName}
                  onChange={(e) => setRenterName(e.target.value)}
                  required
                  disabled={isRenting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  value={renterEmail}
                  onChange={(e) => setRenterEmail(e.target.value)}
                  required
                  disabled={isRenting}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={isRenting}
                >
                  {isRenting ? "Renting..." : "Rent Book"}
                </Button>
                <Button
                  type="button"
                  onClick={closeRentModal}
                  variant="outline"
                  className="flex-1"
                  disabled={isRenting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
