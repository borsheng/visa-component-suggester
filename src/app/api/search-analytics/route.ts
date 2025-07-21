import { NextRequest, NextResponse } from 'next/server';

/**
 * Search Analytics API Route
 * Handles search tracking and statistics for the Visa Component Suggester
 * Uses in-memory storage for demo purposes (production should use database)
 */

/**
 * Interface for individual search records
 * Tracks user queries and suggested components with metadata
 */
interface SearchRecord {
  id: string;
  query: string;
  components: string[];
  timestamp: number;
  userAgent?: string;
}

/**
 * Interface for aggregated search statistics
 * Provides analytics data for the dashboard
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
 * In-memory storage for search records
 * In production, this would be replaced with a database
 * Initial data includes sample records for demo purposes
 */
let searchRecords: SearchRecord[] = [
  {
    id: '1',
    query: 'login form',
    components: ['EmailInput', 'PasswordInput', 'Checkbox', 'SubmitButton'],
    timestamp: Date.now() - 86400000, // 1 day ago
  },
  {
    id: '2',
    query: 'user profile',
    components: ['Avatar', 'Input', 'EmailInput', 'Button'],
    timestamp: Date.now() - 3600000, // 1 hour ago
  },
  {
    id: '3',
    query: 'dashboard',
    components: ['ContentCard', 'Banner', 'Table', 'Progress'],
    timestamp: Date.now() - 1800000, // 30 min ago
  },
];

/**
 * Mock query templates for generating realistic demo data
 * Represents common UI patterns developers search for
 */
const mockQueries = [
  'login form', 'user profile', 'dashboard', 'search form', 'contact form',
  'data table', 'navigation menu', 'checkout form', 'settings page', 'admin panel'
];

/**
 * Generate mock historical data for demo purposes
 * Creates 100 sample records with random timestamps over past 7 days
 * Provides realistic analytics data for initial demo
 */
for (let i = 0; i < 100; i++) {
  const randomQuery = mockQueries[Math.floor(Math.random() * mockQueries.length)];
  searchRecords.push({
    id: `mock-${i}`,
    query: randomQuery,
    components: ['Input', 'Button'], // Simplified components for mock data
    timestamp: Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000, // Random time within past 7 days
  });
}

/**
 * POST /api/search-analytics
 * Records a new search query and its suggested components
 * 
 * @param request - NextRequest containing query and components data
 * @returns Success/error response with record ID
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, components } = body;

    // Validate required fields
    if (!query || !components) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: query and components' },
        { status: 400 }
      );
    }

    // Create new search record with metadata
    const newRecord: SearchRecord = {
      id: Date.now().toString(), // Simple ID generation for demo
      query: query.trim(),
      components,
      timestamp: Date.now(),
      userAgent: request.headers.get('user-agent') || undefined,
    };

    // Add to in-memory storage
    searchRecords.push(newRecord);

    // Maintain storage size limit (keep only recent 1000 records)
    if (searchRecords.length > 1000) {
      searchRecords = searchRecords.slice(-1000);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Search recorded successfully',
      recordId: newRecord.id
    });
  } catch (error) {
    console.error('Error recording search:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record search' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/search-analytics
 * Retrieves aggregated search statistics and analytics
 * 
 * @returns SearchStats object with analytics data
 */
export async function GET() {
  try {
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000; // 24 hours ago in milliseconds

    // Calculate basic metrics
    const totalQueries = searchRecords.length;
    const todayQueries = searchRecords.filter(record => record.timestamp > oneDayAgo).length;
    
    // Aggregate query popularity counts
    const queryCount = new Map<string, number>();
    searchRecords.forEach(record => {
      const count = queryCount.get(record.query) || 0;
      queryCount.set(record.query, count + 1);
    });

    // Sort and get top 5 popular queries
    const popularQueries = Array.from(queryCount.entries())
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count) // Sort by count descending
      .slice(0, 5); // Take top 5

    // Compile statistics response
    const stats: SearchStats = {
      totalQueries,
      todayQueries,
      totalComponents: 28, // Static count of available components
      popularQueries,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
} 