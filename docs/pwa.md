# Progressive Web App (PWA) Support

This project is configured as a Progressive Web App (PWA), providing offline capabilities, installability, and enhanced user experience on mobile and desktop devices.

---

## Manifest

- **Location:** `src/app/manifest.ts`
- **Purpose:** Describes the app's name, icons, theme colors, and how it should appear when installed on a device.
- **Icons:** Provided in multiple sizes in `public/icons/` for various device requirements.

---

## Service Worker

- **Location:** `public/sw.js`
- **Purpose:** Handles caching, offline support, and background tasks.
- **Workbox Integration:** The file `public/workbox-4754cb34.js` is used for advanced caching strategies and offline functionality via [Workbox](https://developer.chrome.com/docs/workbox/).

---

## Offline Support

- The Service Worker caches static assets and API responses, enabling the app to function offline or in poor network conditions.
- Users can access previously visited pages and resources even without an internet connection.

---

## Installation on Device

- The presence of `manifest.ts` and appropriate icons allows users to install the app on their device home screen.
- On supported browsers, users will see an "Add to Home Screen" prompt.

---

## Lighthouse PWA Audit

- The project meets the main requirements for PWA:
  - Valid manifest file
  - Service Worker registered and controlling the page
  - Responsive design
  - Offline support
  - Installable with icons
- To verify, run a Lighthouse audit in Chrome DevTools and check the PWA section.

---

## Requirements

- HTTPS is required for Service Worker and PWA functionality (except on localhost).
- Modern browsers with PWA support (Chrome, Edge, Safari, Firefox).

---

## Update Strategy

- Service Worker updates automatically on new deploys.
- Old cache is cleared and replaced with the latest version.

---

## Limitations

- Full offline mode is limited to cached routes.
- Push notifications and background sync are not implemented.


## PWA Configuration in `next.config.ts`

The project uses the [`next-pwa`](https://github.com/shadowwalker/next-pwa) plugin for Progressive Web App support.  
Key PWA options in your `next.config.ts`:

```typescript
withPWA({
  dest: 'public',         // Output location for service worker and related files
  disable: false,         // PWA is enabled (not disabled)
  register: true,         // Automatically registers the service worker
  skipWaiting: true,      // New service worker activates immediately after installation
  clientsClaim: true,     // Service worker takes control of all clients as soon as it activates
})
```

**Explanation:**
- **dest: 'public'** — Service worker and Workbox files are generated in the `public` directory.
- **disable: false** — PWA features are enabled in all environments.
- **register: true** — The service worker is automatically registered on the client.
- **skipWaiting: true** — The new service worker will activate and control pages as soon as it's finished installing, without waiting for old service workers to close.
- **clientsClaim: true** — The service worker will immediately take control of all open pages/clients after activation.

This configuration ensures that PWA features (offline support, caching, installability) are always active and up-to-date for

---

## References

- [Web App Manifest Documentation](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Workers Overview](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Workbox Documentation](https://developer.chrome.com/docs/workbox/)
- [Lighthouse PWA Checklist](https://web.dev/pwa-checklist/)