'use client';

import { useState, useEffect } from 'react';

/**
 * Interface for search statistics data from the analytics API
 */
interface SearchStats {
  totalQueries: number;
  todayQueries: number;
  totalComponents: number;
  popularQueries: Array<{
    query: string;
    count: number;
  }>;
}

/**
 * Props interface for SearchAnalytics component
 */
interface SearchAnalyticsProps {
  onQuickSearch?: (query: string) => void;
}

/**
 * SearchAnalytics Component
 * Displays usage statistics and popular queries for the component suggester
 * Fetches data from the analytics API and provides quick search functionality
 * 
 * @param onQuickSearch - Callback function to handle quick search from popular queries
 */
export function SearchAnalytics({ onQuickSearch }: SearchAnalyticsProps) {
  const [stats, setStats] = useState<SearchStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch statistics on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  /**
   * Fetch search statistics from the analytics API
   * Updates component state with fetched data or error information
   */
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/search-analytics');
      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  // Loading state display
  if (loading) {
    return (
      <div className="v-surface" style={{
        padding: 'var(--size-scalable-24)',
        borderRadius: 'var(--size-rounded-large)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <div style={{ color: '#6b7280' }}>Loading analytics...</div>
      </div>
    );
  }

  // Error state display
  if (error) {
    return (
      <div className="v-surface" style={{
        padding: 'var(--size-scalable-24)',
        borderRadius: 'var(--size-rounded-large)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca'
      }}>
        <div style={{ color: '#dc2626', fontSize: '14px' }}>
          ⚠️ Failed to load analytics: {error}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="v-surface" style={{
      padding: 'var(--size-scalable-24)',
      borderRadius: 'var(--size-rounded-large)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginTop: 'var(--size-scalable-32)'
    }}>
      {/* Analytics Header */}
      <h3 style={{
        margin: '0 0 var(--size-scalable-20) 0',
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#374151',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--size-scalable-8)'
      }}>
        📊 Usage Analytics
      </h3>

      {/* Statistics Grid - Component Count, Total Queries, Today's Activity */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: 'var(--size-scalable-16)',
        marginBottom: 'var(--size-scalable-24)'
      }}>
        {/* Component Count Card */}
        <div style={{
          padding: 'var(--size-scalable-16)',
          backgroundColor: '#f0f9ff',
          borderRadius: 'var(--size-rounded-medium)',
          border: '1px solid #e0f2fe',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0369a1' }}>
            {stats.totalComponents}+
          </div>
          <div style={{ fontSize: '12px', color: '#0369a1', fontWeight: '500' }}>
            Components
          </div>
        </div>

        {/* Total Queries Card */}
        <div style={{
          padding: 'var(--size-scalable-16)',
          backgroundColor: '#f0fdf4',
          borderRadius: 'var(--size-rounded-medium)',
          border: '1px solid #dcfce7',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#15803d' }}>
            {stats.totalQueries.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#15803d', fontWeight: '500' }}>
            Total Queries
          </div>
        </div>

        {/* Today's Activity Card */}
        <div style={{
          padding: 'var(--size-scalable-16)',
          backgroundColor: '#fef3c7',
          borderRadius: 'var(--size-rounded-medium)',
          border: '1px solid #fde68a',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#92400e' }}>
            {stats.todayQueries}
          </div>
          <div style={{ fontSize: '12px', color: '#92400e', fontWeight: '500' }}>
            Today
          </div>
        </div>
      </div>

      {/* Popular Queries Section */}
      {stats.popularQueries.length > 0 && (
        <div>
          <h4 style={{
            margin: '0 0 var(--size-scalable-12) 0',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151'
          }}>
            🔥 Popular Queries
          </h4>
          
          {/* Popular Query Buttons */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--size-scalable-8)'
          }}>
            {stats.popularQueries.map((item, index) => (
              <button
                key={index}
                onClick={() => onQuickSearch?.(item.query)}
                style={{
                  padding: 'var(--size-scalable-8) var(--size-scalable-12)',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 'var(--size-rounded-medium)',
                  fontSize: '13px',
                  color: '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit'
                }}
                onMouseOver={(e) => {
                  // Hover effect
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = '#e2e8f0';
                  target.style.borderColor = '#cbd5e1';
                }}
                onMouseOut={(e) => {
                  // Reset to default
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = '#f8fafc';
                  target.style.borderColor = '#e2e8f0';
                }}
              >
                &ldquo;{item.query}&rdquo; ({item.count})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer Information */}
      <div style={{
        marginTop: 'var(--size-scalable-16)',
        padding: 'var(--size-scalable-12)',
        backgroundColor: '#f8fafc',
        borderRadius: 'var(--size-rounded-medium)',
        border: '1px solid #e2e8f0'
      }}>
        <p style={{
          margin: 0,
          fontSize: '12px',
          color: '#64748b',
          lineHeight: '1.4'
        }}>
          💡 Analytics help improve component suggestions. Data is stored locally and resets on server restart.
        </p>
      </div>
    </div>
  );
} 