# Pulse Social QA fixes

- Dark navy interface, updated loading fallback.
- Existing image preview in edit composer; changing text preserves existing image.
- Post action ellipsis dropdown (carried forward from v4).
- Share copies post URL rather than sending an empty API body.
- Like/bookmark state indicators (carried forward from v4).
- Follow button immediate feedback in People suggestions.
- Offline API errors show retry on Feed/Explore rather than an empty state.
- Server errors sanitized so passwords and tokens are not reflected in UI.
- Settings password success/error feedback (carried forward from v4).

## Verification
Run `npm install`, `npm run build`, then `npm run dev`.
Check post image edits, suggestions, sharing, notification navigation, and API response variants against a live authenticated account.

Note: `npm install` text is not present in the project's HTML source. If it flashes in the browser, check extensions or cached/served content.
