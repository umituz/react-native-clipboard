/**
 * Clipboard Domain - useClipboard Hook
 *
 * React hook for clipboard operations.
 * Provides copy/paste functionality with state management.
 *
 * @domain clipboard
 * @layer presentation/hooks
 */

import { useState, useCallback } from 'react';
import { ClipboardService } from '../../infrastructure/services/ClipboardService';
import type { ClipboardContent } from '../../domain/entities/Clipboard';

/**
 * useClipboard hook for copy/paste operations
 *
 * USAGE:
 * ```typescript
 * const { copy, paste, copiedText, hasCopied } = useClipboard();
 *
 * // Copy text
 * await copy('Hello World');
 *
 * // Paste text
 * const text = await paste();
 * ```
 */
export const useClipboard = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Copy text to clipboard
   */
  const copy = useCallback(async (text: string): Promise<boolean> => {
    setError(null);
    try {
      const result = await ClipboardService.copyText(text);
      if (result.success) {
        setCopiedText(text);
        setHasCopied(true);
        // Reset hasCopied after 2 seconds
        setTimeout(() => setHasCopied(false), 2000);
        return true;
      } else {
        setError(result.error || 'Failed to copy');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to copy';
      setError(errorMessage);
      return false;
    }
  }, []);

  /**
   * Copy URL to clipboard
   */
  const copyUrl = useCallback(async (url: string): Promise<boolean> => {
    setError(null);
    try {
      const result = await ClipboardService.copyUrl(url);
      if (result.success) {
        setCopiedText(url);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
        return true;
      } else {
        setError(result.error || 'Failed to copy URL');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to copy URL';
      setError(errorMessage);
      return false;
    }
  }, []);

  /**
   * Paste text from clipboard
   */
  const paste = useCallback(async (): Promise<string | null> => {
    setError(null);
    try {
      const result = await ClipboardService.getText();
      if (result.success && result.content) {
        return result.content;
      } else {
        setError(result.error || 'Clipboard is empty');
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to paste';
      setError(errorMessage);
      return null;
    }
  }, []);

  /**
   * Get clipboard content with metadata
   */
  const getContent = useCallback(async (): Promise<ClipboardContent | null> => {
    setError(null);
    try {
      return await ClipboardService.getContent();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to read clipboard';
      setError(errorMessage);
      return null;
    }
  }, []);

  /**
   * Check if clipboard has content
   */
  const hasContent = useCallback(async (): Promise<boolean> => {
    try {
      return await ClipboardService.hasContent();
    } catch (err) {
      return false;
    }
  }, []);

  /**
   * Check if clipboard has URL
   */
  const hasUrl = useCallback(async (): Promise<boolean> => {
    try {
      return await ClipboardService.hasUrl();
    } catch (err) {
      return false;
    }
  }, []);

  /**
   * Clear clipboard
   */
  const clear = useCallback(async (): Promise<boolean> => {
    setError(null);
    try {
      const success = await ClipboardService.clear();
      if (success) {
        setCopiedText(null);
        setHasCopied(false);
      }
      return success;
    } catch (err) {
      return false;
    }
  }, []);

  /**
   * Copy with automatic toast feedback
   */
  const copyWithFeedback = useCallback(async (text: string): Promise<{ success: boolean; message: string }> => {
    setError(null);
    try {
      const result = await ClipboardService.copyWithFeedback(text);
      if (result.success) {
        setCopiedText(text);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
      } else {
        setError(result.message);
      }
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to copy';
      setError(message);
      return { success: false, message };
    }
  }, []);

  return {
    // Functions
    copy,
    copyUrl,
    paste,
    getContent,
    hasContent,
    hasUrl,
    clear,
    copyWithFeedback,

    // State
    copiedText,
    hasCopied,
    error,
  };
};
