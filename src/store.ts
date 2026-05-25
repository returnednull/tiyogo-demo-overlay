import { useSyncExternalStore } from 'react';
import type { OverlayConfig } from './types';

interface State {
  config: OverlayConfig;
  notes: string[];
}

export const defaultConfig: OverlayConfig = {
  position: 'bottom-left',
  opacity: 0.65,
  heading: 'This demo brought you by:',
  learnMoreText: 'Click here to learn more',
  demoUrl: '',
  firstPublished: '',
  lastUpdated: '',
  description:
    "This demo is prepared as a visual moodboard preview upon our initial discussions. Bugs and missing functionalities are expected, and won't be existed in post-deal production build.\n\nContent and idea here is timestamped, licensed, and copyrighted intellectual property.\n\nTiyogo Ltd © 2026",
  websiteUrl: 'https://tiyogo.com',
  websiteButtonText: 'Visit Our Website',
  contactButtonText: 'Contact Us',
  contactUrl: 'mailto:contact@tiyogo.com',
  accentColor: '#6a19e2',
};

let state: State = { config: defaultConfig, notes: [] };
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return state;
}

const serverSnapshot = state;

/** Patch any text/style config field. Callable from anywhere at any time. */
export function configure(partial: Partial<OverlayConfig>) {
  state = { ...state, config: { ...state.config, ...partial } };
  emit();
}

/** Replace all note bubbles. */
export function setNotes(notes: string[]) {
  state = { ...state, notes: [...notes] };
  emit();
}

/** Append a single note bubble. */
export function addNote(note: string) {
  state = { ...state, notes: [...state.notes, note] };
  emit();
}

/** Remove all note bubbles. */
export function clearNotes() {
  state = { ...state, notes: [] };
  emit();
}

export function useOverlayState(): State {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
}
