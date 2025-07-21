'use client';

import { useState } from 'react';

/**
 * Props interface for the CodeBlock component
 */
interface CodeBlockProps {
  code: string;
}

/**
 * CodeBlock Component
 * Displays syntax-highlighted code with copy-to-clipboard functionality
 * Features a floating copy button and dark theme styling
 * 
 * @param code - The code string to display and make copyable
 */
export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  /**
   * Handle copying code to clipboard
   * Provides visual feedback for 2 seconds after copying
   */
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copy state after 2 seconds
  };

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      width: '100%'
    }}>
      {/* Code container with floating copy button */}
      <div style={{
        borderRadius: '8px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100%',
        border: '1px solid #333',
        position: 'relative'
      }}>
        {/* Floating copy button with backdrop blur effect */}
        <button 
          onClick={handleCopy}
          style={{
            position: 'absolute',
            top: '12px',
            right: '24px',
            padding: '6px 12px',
            backgroundColor: copied ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 'var(--size-rounded-medium)',
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 10, // Ensure button appears above code
            backdropFilter: 'blur(8px)', // Modern backdrop blur effect
            display: 'flex',
            alignItems: 'center'
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        
        {/* Code display area with syntax highlighting styles */}
        <pre style={{
          margin: 0,
          padding: '16px',
          fontSize: '14px',
          backgroundColor: '#1a1a1a', // Dark theme background
          color: '#f8f8f2', // Light text for contrast
          overflow: 'auto',
          fontFamily: 'Consolas, Monaco, "Courier New", monospace', // Monospace font stack
          lineHeight: '1.5',
          width: '100%',
          maxWidth: '100%',
          maxHeight: '400px', // Limit height to prevent excessive scrolling
          whiteSpace: 'pre', // Preserve whitespace and formatting
          wordWrap: 'normal',
          boxSizing: 'border-box'
        }}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
