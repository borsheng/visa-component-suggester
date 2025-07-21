import { useState, useCallback } from 'react';

/**
 * Interface for search record data sent to analytics API
 */
interface SearchRecord {
  query: string;
  components: string[];
}

/**
 * Custom hook for tracking search analytics
 * Provides functionality to record user searches for statistical analysis
 * 
 * @returns Object containing recordSearch function and recording state
 */
export function useSearchAnalytics() {
  const [isRecording, setIsRecording] = useState(false);

  /**
   * Record a search query and its suggested components to analytics API
   * Handles the POST request to track user search patterns
   * 
   * @param query - The search query entered by the user
   * @param components - Array of component names suggested for the query
   */
  const recordSearch = useCallback(async (query: string, components: string[]) => {
    // Skip recording if query is empty or no components suggested
    if (!query.trim() || components.length === 0) return;

    try {
      setIsRecording(true);
      
      // Send search data to analytics API
      const response = await fetch('/api/search-analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query.trim(),
          components,
        }),
      });

      // Log warning if API call fails (non-blocking)
      if (!response.ok) {
        console.warn('Failed to record search analytics');
      }
    } catch (error) {
      // Log error but don't break user experience
      console.error('Error recording search analytics:', error);
    } finally {
      setIsRecording(false);
    }
  }, []);

  return {
    recordSearch,
    isRecording,
  };
} 