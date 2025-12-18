/**
 * Centralized Environment Configuration
 *
 * This file provides a single source of truth for all environment variables
 * used throughout the application. It handles both client-side and server-side
 * environment variables with proper validation and fallbacks.
 */

// ==============================================
// URL CONFIGURATION
// ==============================================

/**
 * Base URL for the main website
 * Falls back to localhost:3000 in development
 */
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BASE_URL ||
  'http://localhost:3000';

/**
 * Documentation site URL
 * Falls back to localhost:3001 in development
 */
export const DOCS_URL =
  process.env.NEXT_PUBLIC_DOCS_URL ||
  process.env.DOCS_URL ||
  'http://localhost:3001';

/**
 * Analytics (Umami) site URL
 * Falls back to localhost:3003 in development
 */
export const ANALYTICS_URL =
  process.env.NEXT_PUBLIC_ANALYTICS_URL ||
  process.env.ANALYTICS_URL ||
  'http://localhost:3003';

/**
 * Forum (Discourse) URL
 * Falls back to localhost:4000 in development
 */
export const FORUM_URL =
  process.env.NEXT_PUBLIC_FORUM_URL ||
  process.env.FORUM_URL ||
  'http://localhost:4000';

/**
 * Crash reporting (GlitchTip) URL
 * Falls back to localhost:8000 in development
 */
export const CRASH_URL =
  process.env.NEXT_PUBLIC_CRASH_URL ||
  process.env.CRASH_URL ||
  'http://localhost:8000';

/**
 * Monitoring (Grafana) URL
 * Falls back to localhost:3002 in development
 */
export const MONITORING_URL =
  process.env.NEXT_PUBLIC_MONITORING_URL ||
  process.env.MONITORING_URL ||
  'http://localhost:3002';

// ==============================================
// ANALYTICS CONFIGURATION
// ==============================================

/**
 * Umami Analytics website ID
 */
export const UMAMI_WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ||
  '1299d78a-7f04-411f-9fa2-22ffbbc3258c';

/**
 * Full Umami script URL
 */
export const UMAMI_SCRIPT_URL = `${ANALYTICS_URL}/script.js`;

// ==============================================
// ENVIRONMENT DETECTION
// ==============================================

/**
 * Current environment (production, development, test)
 */
export const ENVIRONMENT = process.env.NODE_ENV || 'development';

/**
 * Check if running in production
 */
export const IS_PRODUCTION = ENVIRONMENT === 'production';

/**
 * Check if running in development
 */
export const IS_DEVELOPMENT = ENVIRONMENT === 'development';

// ==============================================
// HELPER FUNCTIONS
// ==============================================

/**
 * Get full URL path
 * @param path - Relative path (e.g., '/about')
 * @returns Full URL with base
 */
export function getFullUrl(path: string): string {
  return `${BASE_URL}${path}`;
}

/**
 * Get docs URL path
 * @param path - Docs relative path (e.g., '/getting-started')
 * @returns Full docs URL
 */
export function getDocsUrl(path: string = ''): string {
  return `${DOCS_URL}${path}`;
}

/**
 * Get forum URL path
 * @param path - Forum relative path (e.g., '/c/support')
 * @returns Full forum URL
 */
export function getForumUrl(path: string = ''): string {
  return `${FORUM_URL}${path}`;
}

/**
 * Get analytics dashboard URL
 * @returns Full analytics URL
 */
export function getAnalyticsUrl(): string {
  return ANALYTICS_URL;
}

/**
 * Get monitoring dashboard URL
 * @returns Full monitoring URL
 */
export function getMonitoringUrl(): string {
  return MONITORING_URL;
}

// ==============================================
// VALIDATION
// ==============================================

/**
 * Validate that required environment variables are set
 * This should be called at app startup
 */
export function validateEnv(): void {
  const required = {
    BASE_URL,
    DOCS_URL,
  };

  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0 && IS_PRODUCTION) {
    console.warn(
      `Warning: Missing environment variables in production: ${missing.join(', ')}`
    );
  }
}

// ==============================================
// EXPORT ALL CONFIG
// ==============================================

export const env = {
  // URLs
  BASE_URL,
  DOCS_URL,
  ANALYTICS_URL,
  FORUM_URL,
  CRASH_URL,
  MONITORING_URL,

  // Analytics
  UMAMI_WEBSITE_ID,
  UMAMI_SCRIPT_URL,

  // Environment
  ENVIRONMENT,
  IS_PRODUCTION,
  IS_DEVELOPMENT,

  // Helpers
  getFullUrl,
  getDocsUrl,
  getForumUrl,
  getAnalyticsUrl,
  getMonitoringUrl,
  validateEnv,
};

export default env;
