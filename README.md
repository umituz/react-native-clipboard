# @umituz/react-native-clipboard

Clipboard copy/paste functionality for React Native using expo-clipboard.

## Installation

```bash
npm install @umituz/react-native-clipboard
```

## Peer Dependencies

- `react` >= 18.2.0
- `react-native` >= 0.74.0
- `expo-clipboard` *

## Features

- ✅ Copy text to clipboard
- ✅ Copy URLs to clipboard
- ✅ Paste from clipboard
- ✅ Check clipboard content
- ✅ Clear clipboard
- ✅ Copy feedback (2s hasCopied state)
- ✅ URL detection
- ✅ Content sanitization

## Usage

### Basic Copy/Paste

```typescript
import { useClipboard } from '@umituz/react-native-clipboard';

const { copy, paste, hasCopied } = useClipboard();

// Copy text
await copy('Hello World');

// Show feedback
{hasCopied && <Text>Copied!</Text>}

// Paste text
const text = await paste();
console.log('Pasted:', text);
```

### Copy with Feedback

```typescript
import { useClipboard } from '@umituz/react-native-clipboard';
import { useToast } from '@umituz/react-native-toast';

const { copyWithFeedback } = useClipboard();
const { show } = useToast();

const handleCopy = async (text: string) => {
  const result = await copyWithFeedback(text);
  show(result.success ? 'success' : 'error', result.message);
};
```

### Copy URL

```typescript
import { useClipboard } from '@umituz/react-native-clipboard';

const { copyUrl } = useClipboard();

await copyUrl('https://example.com');
```

### Check Clipboard

```typescript
import { useClipboard } from '@umituz/react-native-clipboard';

const { hasContent, hasUrl, getContent } = useClipboard();

// Check if has content
const hasText = await hasContent();

// Check if has URL
const hasLink = await hasUrl();

// Get content with metadata
const content = await getContent();
console.log(content?.type); // 'text' | 'url' | 'empty'
```

### Clear Clipboard

```typescript
import { useClipboard } from '@umituz/react-native-clipboard';

const { clear } = useClipboard();

await clear();
```

### Clipboard Utilities

```typescript
import { ClipboardUtils } from '@umituz/react-native-clipboard';

// Check if URL
const isUrl = ClipboardUtils.isUrl('https://example.com'); // true

// Detect type
const type = ClipboardUtils.detectContentType(text);

// Format for display
const preview = ClipboardUtils.formatForDisplay(longText, 50);
```

## Hooks

- `useClipboard()` - Main hook for clipboard operations

## Services

- `ClipboardService` - Direct service access for clipboard operations

## Utilities

- `ClipboardUtils` - Utility functions for clipboard content processing

## License

MIT

