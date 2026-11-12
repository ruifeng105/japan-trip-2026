# Japan Journey 2026 — Editable Travel Dashboard

English-language Japan itinerary planner for **December 12–22, 2026**.

## Dashboard

After GitHub Pages is enabled: https://ruifeng105.github.io/japan-trip-2026/

### Features
- Daily itinerary, sightseeing, restaurants, conference session scheduling, and notes
- Default Kobe hotel: **Hotel Okura Kobe**, December 13–18 (selected, not necessarily booked)
- Default Tokyo hotel: **APA Hotel PRIDE Akasaka Kokkaigijidomae**, December 19–22
- Editable hotels, including alternative accommodation in Kobe and Tokyo
- Fuji-region choices for December 18–19: **Lake Kawaguchi, Lake Yamanaka, and Hakone**
- EUR budget with JPY-to-EUR currency conversion and fallback rate
- Locally saved edits plus JSON import/export

## Publish with GitHub Pages

In this repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, set **main** and **/(root)**, then save.

The site is served from the root `index.html`.

## Important: sharing and privacy

This is a **static GitHub Pages website**. Visitors may use the same link, but their edits are saved to their own browsers using localStorage. This does **not** synchronize edits across users or devices.

Use the dashboard's **Export backup / Import plan** to exchange changes. True real-time collaborative editing requires an authenticated backend.

This is a public repository: do not commit passport numbers, private booking confirmations, contact details, or payment information.

Exchange rates are informational and may be stale when offline. Hotel defaults reflect **selected options**, not booking confirmations.


## Real-time shared editing

The dashboard now includes a **Collaboration** tab with Firebase-based real-time sharing. **It is not active until the project owner completes the Firebase setup.** See [COLLABORATION_SETUP.md](./COLLABORATION_SETUP.md) for instructions and security considerations. Sharing the normal GitHub Pages URL alone does not synchronize edits; participants must join the same invitation room.
