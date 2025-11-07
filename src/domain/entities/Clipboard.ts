/**
 * Clipboard Domain - Core Entities
 *
 * This file defines core types and interfaces for clipboard operations.
 * Handles copy/paste text and URLs using expo-clipboard.
 *
 * @domain clipboard
 * @layer domain/entities
 */

/**
 * Clipboard content type
 */
export enum ClipboardContentType {
  TEXT = 'text',
  URL = 'url',
  EMPTY = 'empty',
}

/**
 * Clipboard content interface
 */
export interface ClipboardContent {
  type: ClipboardContentType;
  content: string;
  timestamp: number;
}

/**
 * Clipboard operation result
 */
export interface ClipboardResult {
  success: boolean;
  content?: string;
  error?: string;
}

/**
 * Clipboard constants
 */
export const CLIPBOARD_CONSTANTS = {
  MAX_CONTENT_LENGTH: 10000, // 10K characters max
  URL_PATTERN: /^https?:\/\//i,
} as const;

/**
 * Clipboard utilities
 */
export class ClipboardUtils {
  /**
   * Check if string is a URL
   */
  static isUrl(text: string): boolean {
    return CLIPBOARD_CONSTANTS.URL_PATTERN.test(text);
  }

  /**
   * Detect content type
   */
  static detectContentType(text: string): ClipboardContentType {
    if (!text || text.length === 0) {
      return ClipboardContentType.EMPTY;
    }
    if (ClipboardUtils.isUrl(text)) {
      return ClipboardContentType.URL;
    }
    return ClipboardContentType.TEXT;
  }

  /**
   * Validate content length
   */
  static isValidLength(text: string): boolean {
    return text.length <= CLIPBOARD_CONSTANTS.MAX_CONTENT_LENGTH;
  }

  /**
   * Sanitize clipboard content
   */
  static sanitize(text: string): string {
    return text.trim().substring(0, CLIPBOARD_CONSTANTS.MAX_CONTENT_LENGTH);
  }

  /**
   * Format content for display (truncate if too long)
   */
  static formatForDisplay(text: string, maxLength: number = 100): string {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.substring(0, maxLength)}...`;
  }
}
