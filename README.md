# Pulse Social — Navy Edition (HeroUI v3)

React 19 + Vite + JavaScript + Tailwind CSS v4 + HeroUI v3.2.6, React Query, React Hook Form, Zod, Axios and Context API.

## Setup on Windows

1. Open this folder in VS Code.
2. In PowerShell run `npm.cmd install` (or `npm install` in Command Prompt).
3. Copy `.env.example` to `.env`: `Copy-Item .env.example .env`.
4. Start: `npm.cmd run dev`.
5. Visit the local URL printed by Vite.
6. Verify the production build: `npm.cmd run build`.

## Structure

- `src/api`: Route Posts API calls and Axios configuration
- `src/components`: reusable posts, comments, composer and small UI adapter
- `src/pages`: feed, auth, profile, bookmarks, notifications and settings
- `src/context`: authentication state
- `src/schemas`: Zod validation

HeroUI v3 Button is used through `src/components/ui.jsx`; inputs and select are intentionally simple native controls to keep React Hook Form integration clear. The UI adapter avoids the incompatible v2 HeroUI APIs. This project has not been end-to-end verified against authenticated production API data.
"# pulse-social" 
"# pulse-social" 
