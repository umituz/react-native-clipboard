/**
 * Clipboard Domain - Clipboard Service
 *
 * Service for clipboard operations using expo-clipboard.
 * Provides abstraction layer for copy/paste functionality.
 *
 * @domain clipboard
 * @layer infrastructure/services
 */

import * as Clipboard from 'expo-clipboard';
import type { ClipboardContent, ClipboardResult } from '../../domain/entities/Clipboard';
import { ClipboardUtils, ClipboardContentType } from '../../domain/entities/Clipboard';

/**
 * Clipboard service for copy/paste operations
 */
export class ClipboardService {
  /**
   * Copy text to clipboard
   */
  static async copyText(text: string): Promise<ClipboardResult> {
    try {
      const sanitized = ClipboardUtils.sanitize(text);
      await Clipboard.setStringAsync(sanitized);
      return { success: true, content: sanitized };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to copy',
      };
    }
  }

  /**
   * Copy URL to clipboard
   */
  static async copyUrl(url: string): Promise<ClipboardResult> {
    try {
      if (!ClipboardUtils.isUrl(url)) {
        return { success: false, error: 'Invalid URL format' };
      }
      await Clipboard.setUrlAsync(url);
      return { success: true, content: url };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to copy URL',
      };
    }
  }

  /**
   * Get text from clipboard
   */
  static async getText(): Promise<ClipboardResult> {
    try {
      const hasString = await Clipboard.hasStringAsync();
      if (!hasString) {
        return { success: false, error: 'Clipboard is empty' };
      }

      const content = await Clipboard.getStringAsync();
      return { success: true, content };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to read clipboard',
      };
    }
  }

  /**
   * Get URL from clipboard (if available)
   */
  static async getUrl(): Promise<ClipboardResult> {
    try {
      const hasUrl = await Clipboard.hasUrlAsync();
      if (!hasUrl) {
        return { success: false, error: 'No URL in clipboard' };
      }

      const url = await Clipboard.getUrlAsync();
      return { success: true, content: url || '' };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to read URL',
      };
    }
  }

  /**
   * Check if clipboard has string content
   */
  static async hasContent(): Promise<boolean> {
    try {
      return await Clipboard.hasStringAsync();
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if clipboard has URL
   */
  static async hasUrl(): Promise<boolean> {
    try {
      return await Clipboard.hasUrlAsync();
    } catch (error) {
      return false;
    }
  }

  /**
   * Get clipboard content with metadata
   */
  static async getContent(): Promise<ClipboardContent | null> {
    try {
      const result = await ClipboardService.getText();
      if (!result.success || !result.content) {
        return null;
      }

      const type = ClipboardUtils.detectContentType(result.content);
      return {
        type,
        content: result.content,
        timestamp: Date.now(),
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Clear clipboard
   */
  static async clear(): Promise<boolean> {
    try {
      await Clipboard.setStringAsync('');
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Copy with feedback (returns formatted message)
   */
  static async copyWithFeedback(text: string): Promise<{ success: boolean; message: string }> {
    const result = await ClipboardService.copyText(text);

    if (result.success) {
      const preview = ClipboardUtils.formatForDisplay(text, 50);
      return {
        success: true,
        message: `Copied: ${preview}`,
      };
    }

    return {
      success: false,
      message: result.error || 'Failed to copy',
    };
  }
}
