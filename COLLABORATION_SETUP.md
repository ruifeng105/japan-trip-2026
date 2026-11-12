# Enable real-time collaboration (Firebase)

The site is served by GitHub Pages at https://ruifeng105.github.io/japan-trip-2026/ . GitHub Pages alone does not store shared changes; the dashboard uses Firebase Firestore as a separate cloud backend.

## One-time configuration (trip owner)

1. Open https://console.firebase.google.com/ and create a project (e.g. **japan-journey-2026**). Register a **Web App** using the </> button; copy its **firebaseConfig** (the web app object containing `apiKey`, `authDomain`, `projectId`, `appId`). Do **not** use or share Firebase Admin SDK service-account JSON.
2. In **Build → Authentication → Sign-in method**, enable **Anonymous**. You don't need to share your Google account with collaborators.
3. In **Build → Firestore Database**, create a database (choose an appropriate region; production mode). Under the **Rules** tab, paste the full contents of [firestore.rules](./firestore.rules) and click **Publish**. **If rules were published before November 12, 2026, publish the updated file again:** the schema now permits separate custom travel notes (`noteEntries`). Do not leave the database in test mode. Avoid modifying the rule to `allow read, write: if true`.
4. Ensure the site is published via GitHub **Settings → Pages → Deploy from a branch → main / (root)**.
5. Open the published dashboard, click **☁ Collaboration**, paste the Firebase **Web App config**, and click **Save Firebase config in this browser**.
6. Click **Create shared room** and **Copy invite link**. Share this complete invitation URL privately with your colleague. Do not share the bare GitHub Pages URL if you expect them to join the same room.
7. The colleague opens the invitation URL and accepts **Join the shared trip**. Both dashboards should show **Live · synced**. Test by changing a harmless note on one computer and verifying the other updates.

## Editing and safety

- Custom accommodation names are supported for each stay. You can also add, edit and remove individual custom notes from the Travel notes tab. Both are saved in the shared room after the latest Firestore rules are published.
- Hotel defaults remain **Hotel Okura Kobe**, December 13–18, and **APA Hotel PRIDE Akasaka Kokkaigijidomae**, December 19–22. The Fuji hotel and destination remain choices.
- The trip is stored as one shared Firestore document. Changes are saved locally and typically written to the cloud after about one second. Fields and separately identified activities merge; conflicting edits to the same item can overwrite each other.
- The invitation link **grants full read and edit access** to anyone who holds it. There is no separate view-only link, per-person access control, rollback history, or owner-only delete protection. Treat the invitation as a password.
- Do not store passport numbers, personal contact details, payment information, confirmation codes, or other sensitive booking information.
- If offline or a cloud write fails, export a JSON backup before closing the tab. Reconnection does not guarantee every pending change was saved.
- Use **Export backup** periodically. The currency conversion is informational.
- On the Firebase console, enable usage alerts and check that the Firestore rules are published. Free-tier limits and billing vary.
- Never expose a service-account private key in GitHub or in the dashboard.

## Troubleshooting

- **Firebase setup required:** Web app config not entered; sign-in/database setup may also be missing.
- **Permission denied:** Enable Anonymous Authentication and publish `firestore.rules`.
- **Room not found:** Ask for the *complete* invite URL, including the `#room=...` fragment.
- **Network error:** Check your connection, Firebase project status and whether an ad blocker prevents Firebase requests.
- **Changes not synced:** Verify both browsers show **Live · synced** and are using the same invitation room.

This is a lightweight shared-editing option for a small group, not a private authenticated collaboration service.