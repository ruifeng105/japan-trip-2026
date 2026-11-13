# Japan Journey 2026 — Editable Travel Dashboard

English-language Japan itinerary planner for **December 12–22, 2026**.

## Dashboard

After GitHub Pages is enabled: https://ruifeng105.github.io/japan-trip-2026/

### Features
- Daily itinerary, sightseeing, restaurants, conference session scheduling, and notes
- Default Kobe hotel: **Hotel Okura Kobe**, December 13–18 (selected, not necessarily booked)
- Default Tokyo hotel: **APA Hotel PRIDE Akasaka Kokkaigijidomae**, December 19–22
- Any number of destination stays (within the nine fixed nights): add, split, remove and edit destinations, hotels, check-in/out dates and accommodation costs.
- Fuji-region choices for December 18–19: **Lake Kawaguchi, Lake Yamanaka, and Hakone**
- EUR budget with JPY-to-EUR currency conversion and fallback rate
- Fully editable main travel notes, plus add/edit/delete custom titled note cards
- Locally saved edits plus JSON import/export

## Publish with GitHub Pages

In this repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, set **main** and **/(root)**, then save.

The site is served from the root `index.html`.

## Important: sharing and privacy

This is a **static GitHub Pages website**. Visitors may use the same link, but their edits are saved to their own browsers using localStorage. This does **not** synchronize edits across users or devices.

Use the dashboard's **Export backup / Import plan** to exchange changes without Firebase. Real-time collaboration works after Firebase configuration and joining the same shared room.

This is a public repository: do not commit passport numbers, private booking confirmations, contact details, or payment information.

Exchange rates are informational and may be stale when offline. Hotel defaults reflect **selected options**, not booking confirmations.


## Real-time shared editing

The dashboard now includes a **Collaboration** tab with Firebase-based real-time sharing. **It is not active until the project owner completes the Firebase setup.** See [COLLABORATION_SETUP.md](./COLLABORATION_SETUP.md) for instructions and security considerations. Sharing the normal GitHub Pages URL alone does not synchronize edits; participants must join the same invitation room.

## Flexible destinations (November 2026 update)

The itinerary is **not limited to three stops**. Under **Destinations & budget**, add or split stays, change the places and dates, or remove stops. The overall travel window remains **Dec 13–22, 2026**. All stays can have custom hotel names and accommodation costs; the editor flags gaps and overlapping dates. Header, overview, accommodation summary and backup reflect the updated route. Previous backups and Firestore room plans are migrated on load. Default daily activities still reflect the original route, so review them after changing destinations. **Republish the latest `firestore.rules`** to enable synchronization of `stays` in existing shared rooms. All participants should refresh their browsers after updating.
