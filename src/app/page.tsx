'use client';

import { useState, useMemo, useEffect } from 'react';
import { ComponentName, detectComponents, componentSnippets } from '../lib/componentMapping';
import { generateSnippet } from '../helpers/generateSnippet';
import { CodeBlock } from '../components/CodeBlock';
import { SearchAnalytics } from '../components/SearchAnalytics';
import { useSearchAnalytics } from '../hooks/useSearchAnalytics';

/**
 * Main page component for the Visa Component Suggester
 * Provides natural language input interface for component suggestions
 * Includes favorites system, real-time search tracking, and analytics
 */
export default function Home() {
  // State management for user input and favorites
  const [input, setInput] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const { recordSearch } = useSearchAnalytics();

  /**
   * Load saved favorites from localStorage on component mount
   * Provides persistence across browser sessions
   */
  useEffect(() => {
    const savedFavorites = localStorage.getItem('visa-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  /**
   * Add current input to favorites list
   * Prevents duplicates and persists to localStorage
   */
  const addToFavorites = () => {
    if (input.trim() && !favorites.includes(input.trim())) {
      const updatedFavorites = [...favorites, input.trim()];
      setFavorites(updatedFavorites);
      localStorage.setItem('visa-favorites', JSON.stringify(updatedFavorites));
    }
  };

  /**
   * Remove specific item from favorites list
   * Updates both state and localStorage
   * @param item - The favorite item to remove
   */
  const removeFromFavorites = (item: string) => {
    const updatedFavorites = favorites.filter(fav => fav !== item);
    setFavorites(updatedFavorites);
    localStorage.setItem('visa-favorites', JSON.stringify(updatedFavorites));
  };

  // Check if current input is already in favorites
  const isFavorite = favorites.includes(input.trim());

  /**
   * Memoized component suggestions based on user input
   * Uses keyword detection algorithm from componentMapping
   */
  const suggestedComponents = useMemo(() => {
    if (!input.trim()) return [];
    return detectComponents(input);
  }, [input]);

  /**
   * Track search analytics when user has valid input and suggestions
   * Sends data to backend API for usage statistics
   */
  useEffect(() => {
    if (input.trim() && suggestedComponents.length > 0) {
      recordSearch(input, suggestedComponents);
    }
  }, [input, suggestedComponents, recordSearch]);

  /**
   * Generate code snippet based on suggested components
   * Combines individual component templates with proper imports
   */
  const codeSnippet = useMemo(() => {
    if (suggestedComponents.length === 0) return '';
    return generateSnippet(suggestedComponents);
  }, [suggestedComponents]);

  /**
   * Handle quick search from popular queries
   * Sets input to selected popular query
   * @param query - The popular query to search for
   */
  const handleQuickSearch = (query: string) => {
    setInput(query);
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: 'var(--size-scalable-32) var(--size-scalable-16)',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      {/* Main Header Section */}
      <div className="v-surface v-flex v-flex-col v-gap-4 v-align-items-center" style={{ 
        textAlign: 'center', 
        marginBottom: 'var(--size-scalable-48)',
        padding: 'var(--size-scalable-32)',
        borderRadius: 'var(--size-rounded-large)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        {/* Responsive title with gradient text effect */}
        <h1 style={{ 
          fontSize: 'clamp(1.8rem, 5vw, 3rem)', // Responsive font size
          fontWeight: '700',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', // Visa brand gradient
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 'var(--size-scalable-16)',
          maxWidth: '100%',
          lineHeight: '1.2',
          wordSpacing: '0.1em'
        }}>
          🔧 Visa Component Suggester
        </h1>
        
        {/* Descriptive subtitle */}
        <p style={{
          fontSize: '1.25rem',
          color: '#6b7280',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Describe your UI in natural language and get instant Visa Product Design System component suggestions with code snippets.
        </p>
      </div>
      
      {/* Input Section with Search and Favorites */}
      <div className="v-surface v-flex v-flex-col v-gap-4" style={{ 
        marginBottom: 'var(--size-scalable-32)',
        padding: 'var(--size-scalable-32)',
        borderRadius: 'var(--size-rounded-large)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        {/* Input Label */}
        <label 
          htmlFor="ui-input"
          className="v-label"
          style={{ 
            display: 'block', 
            marginBottom: 'var(--size-scalable-12)', 
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#374151'
          }}
        >
          Describe your UI:
        </label>
        
        {/* Search Input with Favorite Button */}
        <div style={{ display: 'flex', gap: 'var(--size-scalable-8)', alignItems: 'stretch' }}>
          <input
            id="ui-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., I need a responsive login form with remember me checkbox"
            style={{
              flex: '1',
              padding: 'var(--size-scalable-16) var(--size-scalable-20)',
              border: '2px solid #e5e7eb',
              borderRadius: 'var(--size-rounded-medium)',
              fontSize: '16px', // Prevents zoom on iOS
              outline: 'none',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => {
              // Focus state styling
              ((e.target as HTMLElement).style).borderColor = '#3b82f6';
              ((e.target as HTMLElement).style).boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              // Reset to default state
              ((e.target as HTMLElement).style).borderColor = '#e5e7eb';
              ((e.target as HTMLElement).style).boxShadow = 'none';
            }}
          />
          
          {/* Favorite Toggle Button */}
          <button
            onClick={isFavorite ? () => removeFromFavorites(input.trim()) : addToFavorites}
            disabled={!input.trim()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '56px',
              padding: '0 var(--size-scalable-16)',
              border: '2px solid #e5e7eb',
              borderRadius: 'var(--size-rounded-medium)',
              backgroundColor: 'white',
              color: isFavorite ? '#ef4444' : '#6b7280', // Red if favorited, gray if not
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              fontSize: '20px',
              transition: 'all 0.2s ease',
              opacity: input.trim() ? 1 : 0.5
            }}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onMouseEnter={(e) => {
              if (input.trim()) {
                ((e.target as HTMLElement).style).borderColor = '#3b82f6';
                ((e.target as HTMLElement).style).backgroundColor = '#f0f9ff';
              }
            }}
            onMouseLeave={(e) => {
              ((e.target as HTMLElement).style).borderColor = '#e5e7eb';
              ((e.target as HTMLElement).style).backgroundColor = 'white';
            }}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>

        {/* Quick Example Buttons */}
        <div style={{ marginTop: 'var(--size-scalable-12)' }}>
          <span style={{ 
            fontSize: '14px', 
            color: '#6b7280',
            marginRight: 'var(--size-scalable-12)'
          }}>
            Try:
          </span>
          {[
            'login form',
            'user profile page', 
            'admin dashboard',
            'contact form',
            'settings page'
          ].map((example, index) => (
            <button
              key={index}
              onClick={() => setInput(example)}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--size-rounded-medium)',
                padding: 'var(--size-scalable-4) var(--size-scalable-12)',
                fontSize: '14px',
                color: '#64748b',
                cursor: 'pointer',
                marginRight: 'var(--size-scalable-8)',
                marginBottom: 'var(--size-scalable-4)',
                transition: 'all 0.2s ease',
                backgroundColor: '#f8fafc',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={(e) => {
                // Hover effect
                ((e.target as HTMLElement).style).borderColor = '#3b82f6';
                ((e.target as HTMLElement).style).color = '#3b82f6';
                ((e.target as HTMLElement).style).backgroundColor = '#f0f9ff';
                ((e.target as HTMLElement).style).boxShadow = '0 2px 4px rgba(59, 130, 246, 0.15)';
              }}
              onMouseLeave={(e) => {
                // Reset to default
                ((e.target as HTMLElement).style).borderColor = '#e2e8f0';
                ((e.target as HTMLElement).style).color = '#64748b';
                ((e.target as HTMLElement).style).backgroundColor = '#f8fafc';
                ((e.target as HTMLElement).style).boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
              }}
            >
              {example}
            </button>
          ))}
        </div>

        {/* Favorites List Display */}
        {favorites.length > 0 && (
          <div style={{ marginTop: 'var(--size-scalable-16)' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: 'var(--size-scalable-8)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--size-scalable-4)'
            }}>
              ❤️ Favorites:
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--size-scalable-8)'
            }}>
              {favorites.map((favorite, index) => (
                <div 
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--size-scalable-4)',
                    padding: 'var(--size-scalable-4) var(--size-scalable-8)',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: 'var(--size-rounded-medium)',
                    fontSize: '13px',
                    color: '#dc2626'
                  }}
                >
                  {/* Clickable favorite item */}
                  <button
                    onClick={() => setInput(favorite)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'inherit',
                      cursor: 'pointer',
                      padding: 0,
                      fontSize: 'inherit',
                      fontFamily: 'inherit'
                    }}
                  >
                    {favorite}
                  </button>
                  {/* Remove favorite button */}
                  <button
                    onClick={() => removeFromFavorites(favorite)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#dc2626',
                      cursor: 'pointer',
                      padding: '0 2px',
                      fontSize: '12px',
                      lineHeight: 1,
                      opacity: 0.7
                    }}
                    title="Remove from favorites"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Section - Component Suggestions and Generated Code */}
      {suggestedComponents.length > 0 && (
        <div style={{ 
          display: 'grid', 
          gap: 'var(--size-scalable-24)', 
          gridTemplateColumns: 'minmax(300px, 0.4fr) minmax(0, 1fr)', // Responsive grid
          width: '100%',
          maxWidth: '100%',
          overflowX: 'auto', // Allow horizontal scroll if needed
          overflowY: 'visible', // Allow shadows to show
          padding: '0 4px 8px 4px' // Space for shadows
        }}>
          {/* Suggested Components Panel */}
          <div className="v-surface" style={{
            padding: 'var(--size-scalable-24)',
            borderRadius: 'var(--size-rounded-large)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ 
              marginBottom: 'var(--size-scalable-16)',
              color: '#374151',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              📦 Suggested Components
            </h3>
            
            {/* Component badges */}
            <div className="v-flex v-flex-wrap v-gap-2">
              {suggestedComponents.map((component, index) => (
                <span
                  key={index}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: 'var(--size-scalable-8) var(--size-scalable-16)',
                    backgroundColor: '#dbeafe', // Light blue background
                    color: '#1e40af', // Dark blue text
                    borderRadius: 'var(--size-rounded-medium)',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: '1px solid #93c5fd',
                    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.1)'
                  }}
                >
                  {component}
                </span>
              ))}
            </div>
            
            {/* Information panel */}
            <div style={{
              marginTop: 'var(--size-scalable-16)',
              padding: 'var(--size-scalable-12)',
              backgroundColor: '#f8fafc',
              borderRadius: 'var(--size-rounded-medium)',
              border: '1px solid #e2e8f0'
            }}>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: '#64748b',
                lineHeight: '1.5'
              }}>
                💡 These components follow Visa Product Design System standards and include proper accessibility features.
              </p>
            </div>
          </div>

          {/* Generated Code Panel */}
          <div className="v-surface" style={{
            padding: 'var(--size-scalable-24)',
            borderRadius: 'var(--size-rounded-large)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 className="v-flex v-align-items-center v-gap-2" style={{ 
              marginBottom: 'var(--size-scalable-16)',
              color: '#374151',
              fontSize: '1.25rem',
              fontWeight: '600'
            }}>
              💻 Generated Code
            </h3>
            
            {/* Code block with syntax highlighting and copy functionality */}
            <CodeBlock code={codeSnippet} />
            
            {/* Usage instructions */}
            <div style={{
              marginTop: 'var(--size-scalable-16)',
              padding: 'var(--size-scalable-12)',
              backgroundColor: '#fefce8',
              borderRadius: 'var(--size-rounded-medium)',
              border: '1px solid #fde047'
            }}>
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: '#a16207',
                lineHeight: '1.5'
              }}>
                ⚡ Ready to use! Copy the code above and paste it into your React component.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Screen - Shown when no input provided */}
      {suggestedComponents.length === 0 && (
        <div className="v-surface" style={{
          textAlign: 'center',
          padding: 'var(--size-scalable-48) var(--size-scalable-24)',
          borderRadius: 'var(--size-rounded-large)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: 'var(--size-scalable-16)' }}>🎨</div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: 'var(--size-scalable-8)'
          }}>
            Start describing your UI
          </h3>
          <p style={{
            color: '#6b7280',
            fontSize: '1.125rem',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Type a description like &ldquo;login form&rdquo; or &ldquo;user dashboard&rdquo; and watch the magic happen!
          </p>
        </div>
      )}

      {/* Analytics Dashboard */}
      <SearchAnalytics onQuickSearch={handleQuickSearch} />

      {/* Footer */}
      <div style={{
        marginTop: 'var(--size-scalable-48)',
        textAlign: 'center',
        padding: 'var(--size-scalable-24)',
        color: '#6b7280',
        fontSize: '14px'
      }}>
        <p style={{ margin: 0 }}>
          Built with Eric Huang using <strong>Visa Product Design System</strong>
        </p>
      </div>
    </div>
  );
}
