# CLAUDE.md — @tiyogo/demo-overlay

Single-package React library. Publishes a body-level "brought to you by Tiyogo" overlay badge for demo previews. Zero runtime deps; React 18+ peer.

## Layout

```
src/
  index.ts          public exports
  TiyogoOverlay.tsx main component (collapsed → hover → expanded state machine)
  store.ts          zero-dep vanilla store (useSyncExternalStore) — configure/setNotes/addNote/clearNotes
  styles.ts         self-injected scoped CSS (tiyogo- prefix), injected once on mount
  assets.tsx        IconMark, FullLogo (real Tiyogo SVGs, currentColor), PhoneIcon
  types.ts          OverlayConfig / OverlayProps / OverlayPosition
dev/                Vite preview (not published) — index.html, main.tsx
tsup.config.ts      build: ESM + CJS + d.ts, react external
vite.config.ts      root: 'dev'
```

## Key decisions

- **State lives in `store.ts`, not React context.** Lets any page mutate config/notes imperatively (`setNotes`, `configure`) with no provider. Component reads via `useSyncExternalStore`.
- **Props seed the store once on mount**; runtime changes go through `configure()`. Don't expect prop changes after mount to re-sync (documented).
- **Styles inject once** via `injectStyles()` in a layout effect. All classes are `tiyogo-`-prefixed to avoid host-app collisions. No CSS file for consumers to import.
- **`demoUrl` is hydration-safe**: default `''` server-side, resolved to `window.location.host` in an effect to avoid Next.js hydration mismatch.
- **Expansion direction** follows the anchored corner (bottom corners grow up, top corners grow down) so the logo never moves.

## Conventions

- Logo/icon SVGs use `currentColor` — recolor via CSS `color`, never hardcode fills.
- Keep it dependency-free. Anything new needs a strong reason.
- `accentColor` flows through the `--tiyogo-accent` CSS var set inline on the root.

## Commands

```bash
npm run dev        # visual preview
npm run typecheck  # tsc --noEmit
npm run build      # tsup
```

## Publishing

Public scoped package (`publishConfig.access: public`). `prepublishOnly` builds. Bump version, then `npm publish`.
