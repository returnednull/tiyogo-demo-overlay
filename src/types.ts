export type OverlayPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface OverlayConfig {
  /** Corner the overlay is anchored to. Default: 'bottom-right'. */
  position: OverlayPosition;
  /** Opacity of the collapsed badge when idle (0–1). Hover restores full opacity. Default: 0.65. */
  opacity: number;
  /** Small line above the logo. Default: 'This demo brought you by:'. */
  heading: string;
  /** Tiny line below the logo. Default: 'Click here to learn more'. */
  learnMoreText: string;
  /** Demo URL shown when expanded. Empty string auto-detects `window.location.host`. */
  demoUrl: string;
  /** First published date label. */
  firstPublished: string;
  /** Last updated date label. */
  lastUpdated: string;
  /** Free-text description of the demo. */
  description: string;
  /** Target of the primary button. Default: 'https://tiyogo.com'. */
  websiteUrl: string;
  /** Primary button label. Default: 'Visit Our Website'. */
  websiteButtonText: string;
  /** Secondary button label. Default: 'Contact Us'. */
  contactButtonText: string;
  /** Target of the secondary button (URL or `tel:`/`mailto:`). Default: 'https://tiyogo.com/contact'. */
  contactUrl: string;
  /** Brand accent color used for the primary button. Default: '#6a19e2'. */
  accentColor: string;
}

export type OverlayProps = Partial<OverlayConfig> & {
  /** Initial note bubbles shown above the badge. Mutate live with setNotes/addNote/clearNotes. */
  notes?: string[];
};
