# Pulse Social — Consolidated QA Notes

This is the consolidated source revision from the earlier `pulse-social-final-qa.zip` snapshot.

## Changes made
- Fixed Avatar export mismatch that prevented the app from compiling.
- Added account dropdown in the header for mobile and desktop (Profile, Settings, Logout).
- Improved dark-theme contrast on names, comment text, card actions, menu items and button hover states.
- Added page-local search for Feed, Explore, Bookmarks and People. This filters the *currently loaded* API results; it is not server-side global search.
- Updated saved-post action label to switch between Save and Unsave when state is known.
- Added accessible labels and more visible active states for comment likes and bookmark actions.
- Improved notifications copy and click-through when a post/user identifier is present in the response.
- Made follower/following counts interactive. A list is shown if included in the profile response; otherwise a clear message is displayed.
- Retained password success feedback and sanitized API error handling from the source snapshot.

## Known verification limitations
- No end-to-end browser/API validation has been performed on this revision.
- `npm install` could not complete in the build environment, so `npm run build` was not executed successfully here.
- Follow status persistence depends on the Route Posts API `isFollowing` field; bookmarks similarly depend on API status fields.
- Comment likes depend on Route Posts API response and authentication.
- Notifications only navigate if the API includes the relevant post/sender identifier.

## Run locally (Windows CMD)
1. Extract the ZIP and open the `pulse-social-navy-v3` folder.
2. Run `npm install`.
3. Run `npm run build` to check compilation.
4. Run `npm run dev` to start the development server.

Do not commit `.env` secrets or account credentials.
