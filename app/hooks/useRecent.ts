import { useState, useCallback } from "react";

export const useRecent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trackBookView = useCallback(async (bookId: string) => {
    if (!bookId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/recent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Don't show error for "already exists" - that's expected behavior
        if (data.error !== "Activity already exists") {
          console.error("Failed to track book view:", data.error);
        }
        return false;
      }

      return true;
    } catch (err) {
      console.error("Error tracking book view:", err);
      setError("Failed to track activity");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRecentActivities = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/recent");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch recent activities");
      }

      return data.data || [];
    } catch (err) {
      console.error("Error fetching recent activities:", err);
      setError("Failed to fetch activities");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    trackBookView,
    fetchRecentActivities,
    loading,
    error,
  };
};
