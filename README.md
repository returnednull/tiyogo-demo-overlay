# @tiyogo/demo-overlay

A small, aesthetic "**This demo brought to you by Tiyogo**" overlay badge for React & Next.js demo previews. Drop it in once at the root of any app; it sits in a corner, expands on hover, and reveals demo metadata + call-to-action buttons on click.

- **Zero runtime dependencies** — styles self-inject, no CSS import needed.
- **Three states** — collapsed circle → hover card → expanded detail panel.
- **Live note bubbles** — annotate per-page from anywhere (`setNotes`, `addNote`).
- **Fully customizable** — every text, both dates, position, idle opacity, accent color. Editable via props *or* live at runtime with `configure()`.
- **SSR-safe** — works in the Next.js App Router; demo URL auto-detects on the client.

## Install

```bash
npm i @tiyogo/demo-overlay
```

`react` and `react-dom` (>=18) are peer dependencies.

## Usage

Mount it once, as high in the tree as possible.

### React / Vite

```tsx
import { TiyogoOverlay } from '@tiyogo/demo-overlay';

export default function App() {
  return (
    <>
      <YourApp />
      <TiyogoOverlay
        firstPublished="24 May 2026"
        lastUpdated="25 May 2026"
        description="A live preview built for your team."
      />
    </>
  );
}
```

### Next.js (App Router)

The overlay uses browser APIs, so render it in a client boundary. Add it to your root `app/layout.tsx`:

```tsx
// app/tiyogo.tsx
'use client';
export { TiyogoOverlay } from '@tiyogo/demo-overlay';
```

```tsx
// app/layout.tsx
import { TiyogoOverlay } from './tiyogo';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <TiyogoOverlay description="Preview build — data is not live." />
      </body>
    </html>
  );
}
```

## Per-page notes

The overlay reads from a tiny built-in store, so any component on any route can push notes without prop-drilling or context wiring.

```tsx
'use client';
import { useEffect } from 'react';
import { setNotes } from '@tiyogo/demo-overlay';

export default function DashboardPage() {
  useEffect(() => {
    setNotes(['Payment and authentication are mocked for demo purposes']);
    // optionally clear on unmount: return () => setNotes([])
  }, []);
  // ...
}
```

- `setNotes(string[])` — replace all bubbles.
- `addNote(string)` — append one bubble.
- `clearNotes()` — remove all.

## Live config

Change any text or style at runtime from anywhere — useful for setting the description per route:

```ts
import { configure } from '@tiyogo/demo-overlay';

configure({
  description: 'We can build any kind of report here as you wish.',
  lastUpdated: '25 May 2026',
  accentColor: '#6a19e2',
});
```

## Props / config reference

All props are optional. Each can also be set later via `configure()`.

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-right'` | Corner anchor. |
| `opacity` | `number` | `0.65` | Idle opacity of the collapsed badge. Hover restores `1`. |
| `heading` | `string` | `'This demo brought you by:'` | Line above the logo. |
| `learnMoreText` | `string` | `'Click here to learn more'` | Line below the logo. |
| `demoUrl` | `string` | *(auto)* | Empty → auto-detects `window.location.host`. |
| `firstPublished` | `string` | `''` | Hidden when empty. |
| `lastUpdated` | `string` | `''` | Hidden when empty. |
| `description` | `string` | `''` | Hidden when empty. |
| `websiteButtonText` | `string` | `'Visit Our Website'` | Primary button label. |
| `websiteUrl` | `string` | `'https://tiyogo.com'` | Primary button target. |
| `contactButtonText` | `string` | `'Contact Us'` | Secondary button label. |
| `contactUrl` | `string` | `'https://tiyogo.com/contact'` | Secondary target (URL, `tel:`, `mailto:`). |
| `accentColor` | `string` | `'#6a19e2'` | Primary button color. |
| `notes` | `string[]` | `[]` | Initial bubbles. Mutate live via `setNotes`/`addNote`/`clearNotes`. |

## Behavior

- **Hover** expands the badge into a logo card.
- **Click** opens the detail panel; the logo stays put while the panel grows away from the anchored edge.
- **Click outside** or **Esc** collapses it. Keyboard: `Enter`/`Space` toggles.
- Respects `prefers-reduced-motion`.

## Development

```bash
npm install
npm run dev    # blank Vite preview at localhost:5173
npm run build  # tsup → dist (ESM + CJS + d.ts)
```

## License

MIT © [Tiyogo](https://tiyogo.com)
