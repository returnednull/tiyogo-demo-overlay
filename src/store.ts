import { useSyncExternalStore } from 'react';
import type { OverlayConfig } from './types';

interface State {
  config: OverlayConfig;
  notes: string[];
}

export const defaultConfig: OverlayConfig = {
  position: 'bottom-right',
  opacity: 0.65,
  heading: 'This demo brought you by:',
  learnMoreText: 'Click here to learn more',
  demoUrl: '',
  firstPublished: '',
  lastUpdated: '',
  description: '',
  websiteUrl: 'https://tiyogo.com',
  websiteButtonText: 'Visit Our Website',
  contactButtonText: 'Contact Us',
  contactUrl: 'https://tiyogo.com/contact',
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
