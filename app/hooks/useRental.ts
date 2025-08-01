"use client";

import { useState, useCallback } from "react";

interface UseRentalOptions {
  onRentalSuccess?: () => void; // Optional callback after successful rental
  onReturnSuccess?: () => void; // Optional callback after successful return
}

export const useRental = (options?: UseRentalOptions) => {
  // Rental form state
  const [renterName, setRenterName] = useState("");
  const [renterEmail, setRenterEmail] = useState("");

  // Modal state
  const [showRentModal, setShowRentModal] = useState(false);

  // Loading states
  const [isRenting, setIsRenting] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [isCheckingRental, setIsCheckingRental] = useState(false);

  // Selected book for rental
  const [selectedBookId, setSelectedBookId] = useState("");

  // Handle opening rental modal
  const handleRent = useCallback((bookId: string) => {
    setSelectedBookId(bookId);
    setShowRentModal(true);
  }, []);

  // Handle rental submission
  const handleRentSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      if (!selectedBookId || !renterName || !renterEmail) {
        alert("Please fill in all fields");
        return;
      }

      setIsRenting(true);
      try {
        const response = await fetch("/api/rentals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookId: selectedBookId,
            renterName,
            renterEmail,
          }),
        });

        const result = await response.json();

        if (result.success) {
          alert("Book rented successfully!");
          setShowRentModal(false);
          setRenterName("");
          setRenterEmail("");
          setSelectedBookId("");

          // Call optional success callback
          if (options?.onRentalSuccess) {
            options.onRentalSuccess();
          }
        } else {
          alert(result.error || "Failed to rent book");
        }
      } catch (error) {
        console.error("Error renting book:", error);
        alert("Error renting book. Please try again.");
      } finally {
        setIsRenting(false);
      }
    },
    [selectedBookId, renterName, renterEmail, options]
  );

  // Handle book return
  const handleReturnBook = useCallback(
    async (bookId: string) => {
      setIsReturning(true);
      try {
        const response = await fetch("/api/rentals/return", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookId }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          alert("Book returned successfully!");

          // Call optional success callback
          if (options?.onReturnSuccess) {
            options.onReturnSuccess();
          }
        } else {
          alert(result.error || "Failed to return book");
        }
      } catch (error) {
        console.error("Error returning book:", error);
        alert("Error returning book. Please try again.");
      } finally {
        setIsReturning(false);
      }
    },
    [options]
  );

  // Check if user has rented a specific book
  const checkRentalStatus = useCallback(
    async (bookId: string): Promise<boolean> => {
      setIsCheckingRental(true);
      try {
        const response = await fetch(`/api/rentals/check?bookId=${bookId}`);
        const result = await response.json();

        if (response.ok) {
          return result.isRented || false;
        }
        return false;
      } catch (error) {
        console.error("Error checking rental status:", error);
        return false;
      } finally {
        setIsCheckingRental(false);
      }
    },
    []
  );

  // Batch check rental status for multiple books using Promise.all
  const checkMultipleRentalStatus = useCallback(
    async (bookIds: string[]): Promise<Record<string, boolean>> => {
      setIsCheckingRental(true);
      try {
        // Use Promise.all to check all rental statuses simultaneously
        const rentalChecks = bookIds.map(async (bookId) => {
          const response = await fetch(`/api/rentals/check?bookId=${bookId}`);
          const result = await response.json();
          return {
            bookId,
            isRented: response.ok ? result.isRented || false : false,
          };
        });

        const results = await Promise.all(rentalChecks);

        // Convert array to object for easy lookup
        return results.reduce((acc, { bookId, isRented }) => {
          acc[bookId] = isRented;
          return acc;
        }, {} as Record<string, boolean>);
      } catch (error) {
        console.error("Error checking multiple rental statuses:", error);
        return {};
      } finally {
        setIsCheckingRental(false);
      }
    },
    []
  );

  // Close rental modal
  const closeRentModal = useCallback(() => {
    setShowRentModal(false);
    setRenterName("");
    setRenterEmail("");
    setSelectedBookId("");
  }, []);

  return {
    // Form state
    renterName,
    setRenterName,
    renterEmail,
    setRenterEmail,

    // Modal state
    showRentModal,
    setShowRentModal,

    // Loading states
    isRenting,
    isReturning,
    isCheckingRental,

    // Selected book
    selectedBookId,
    setSelectedBookId,

    // Actions
    handleRent,
    handleRentSubmit,
    handleReturnBook,
    checkRentalStatus,
    checkMultipleRentalStatus,
    closeRentModal,
  };
};
