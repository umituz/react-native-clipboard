/**
 * Clipboard Domain - Barrel Export
 *
 * Provides clipboard copy/paste functionality using expo-clipboard.
 * Universal domain - enabled by default in all apps.
 *
 * @domain clipboard
 * @enabled true (All apps - Universal utility)
 *
 * ARCHITECTURE:
 * - Domain Layer: Entities (clipboard types, utilities)
 * - Infrastructure Layer: Services (ClipboardService)
 * - Presentation Layer: Hooks (useClipboard)
 *
 * DEPENDENCIES:
 * - expo-clipboard (system clipboard access)
 *
 * FEATURES:
 * - Copy text to clipboard
 * - Copy URLs to clipboard
 * - Paste from clipboard
 * - Check clipboard content
 * - Clear clipboard
 * - Copy feedback (2s hasCopied state)
 *
 * USAGE:
 *
 * Basic Copy/Paste:
 * ```typescript
 * import { useClipboard } from '@umituz/react-native-clipboard';
 *
 * const { copy, paste, hasCopied } = useClipboard();
 *
 * // Copy text
 * await copy('Hello World');
 *
 * // Show feedback
 * {hasCopied && <Text>Copied!</Text>}
 *
 * // Paste text
 * const text = await paste();
 * console.log('Pasted:', text);
 * ```
 *
 * Copy with Feedback:
 * ```typescript
 * import { useClipboard } from '@umituz/react-native-clipboard';
 * import { showToast } from '@umituz/react-native-toast';
 *
 * const { copyWithFeedback } = useClipboard();
 *
 * const handleCopy = async (text: string) => {
 *   const result = await copyWithFeedback(text);
 *   showToast(result.success ? 'success' : 'error', result.message);
 * };
 * ```
 *
 * Copy URL:
 * ```typescript
 * import { useClipboard } from '@umituz/react-native-clipboard';
 *
 * const { copyUrl } = useClipboard();
 *
 * await copyUrl('https://example.com');
 * ```
 *
 * Check Clipboard:
 * ```typescript
 * import { useClipboard } from '@umituz/react-native-clipboard';
 *
 * const { hasContent, hasUrl, getContent } = useClipboard();
 *
 * // Check if has content
 * const hasText = await hasContent();
 *
 * // Check if has URL
 * const hasLink = await hasUrl();
 *
 * // Get content with metadata
 * const content = await getContent();
 * console.log(content?.type); // 'text' | 'url' | 'empty'
 * ```
 *
 * Clear Clipboard:
 * ```typescript
 * import { useClipboard } from '@umituz/react-native-clipboard';
 *
 * const { clear } = useClipboard();
 *
 * await clear();
 * ```
 *
 * Clipboard Utilities:
 * ```typescript
 * import { ClipboardUtils } from '@umituz/react-native-clipboard';
 *
 * // Check if URL
 * const isUrl = ClipboardUtils.isUrl('https://example.com'); // true
 *
 * // Detect type
 * const type = ClipboardUtils.detectContentType(text);
 *
 * // Format for display
 * const preview = ClipboardUtils.formatForDisplay(longText, 50);
 * ```
 *
 * BENEFITS:
 * - Type-safe clipboard operations
 * - Automatic state management
 * - Copy feedback (2s hasCopied)
 * - Error handling
 * - URL detection
 * - Content sanitization
 * - Works across all apps
 *
 * USE CASES:
 * - Copy user info (email, phone, ID)
 * - Share URLs
 * - Copy error messages
 * - Paste user input
 * - Copy referral codes
 * - Share content
 *
 * @see https://docs.expo.dev/versions/latest/sdk/clipboard/
 */

// ============================================================================
// DOMAIN LAYER - ENTITIES
// ============================================================================

export type {
  ClipboardContent,
  ClipboardResult,
} from './domain/entities/Clipboard';

export {
  ClipboardContentType,
  CLIPBOARD_CONSTANTS,
  ClipboardUtils,
} from './domain/entities/Clipboard';

// ============================================================================
// INFRASTRUCTURE LAYER - SERVICES
// ============================================================================

export { ClipboardService } from './infrastructure/services/ClipboardService';

// ============================================================================
// PRESENTATION LAYER - HOOKS
// ============================================================================

export { useClipboard } from './presentation/hooks/useClipboard';
