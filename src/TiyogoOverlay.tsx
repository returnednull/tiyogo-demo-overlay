import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FullLogo, IconMark, MailIcon } from './assets';
import { configure, setNotes, useOverlayState } from './store';
import { injectStyles } from './styles';
import type { OverlayProps } from './types';

type Mode = 'collapsed' | 'hover' | 'expanded';

/** Hover-intent grace period (ms) — debounces edge jitter so it never reaches the animation. */
const HOVER_DELAY = 200;

const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function TiyogoOverlay(props: OverlayProps) {
  const { config, notes } = useOverlayState();
  const [mode, setMode] = useState<Mode>('collapsed');
  const [host, setHost] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const seeded = useRef(false);
  const enterTimer = useRef<number | undefined>(undefined);
  const leaveTimer = useRef<number | undefined>(undefined);

  useIsoLayoutEffect(() => {
    injectStyles();
    if (!seeded.current) {
      const { notes: initialNotes, ...cfg } = props;
      const patch = Object.fromEntries(
        Object.entries(cfg).filter(([, v]) => v !== undefined),
      );
      if (Object.keys(patch).length) configure(patch);
      if (initialNotes) setNotes(initialNotes);
      seeded.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setHost(window.location.host);
    return () => {
      window.clearTimeout(enterTimer.current);
      window.clearTimeout(leaveTimer.current);
    };
  }, []);

  useEffect(() => {
    if (mode !== 'expanded') return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setMode('collapsed');
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMode('collapsed');
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [mode]);

  const open = mode === 'hover' || mode === 'expanded';
  const demoUrl = config.demoUrl || host;

  const onEnter = () => {
    window.clearTimeout(leaveTimer.current);
    if (mode === 'expanded') return;
    enterTimer.current = window.setTimeout(
      () => setMode((m) => (m === 'expanded' ? m : 'hover')),
      HOVER_DELAY,
    );
  };
  const onLeave = () => {
    window.clearTimeout(enterTimer.current);
    if (mode === 'expanded') return;
    leaveTimer.current = window.setTimeout(
      () => setMode((m) => (m === 'expanded' ? m : 'collapsed')),
      HOVER_DELAY,
    );
  };
  const onClick = () => {
    window.clearTimeout(enterTimer.current);
    window.clearTimeout(leaveTimer.current);
    setMode('expanded');
  };

  return (
    <div
      ref={rootRef}
      className={`tiyogo-root tiyogo-pos-${config.position}`}
      style={{ ['--tiyogo-accent' as string]: config.accentColor }}
      role="complementary"
      aria-label="Demo information by Tiyogo"
    >
      {notes.length > 0 && (
        <div className="tiyogo-notes">
          {notes.map((note, i) => (
            <div className="tiyogo-note" key={`${i}-${note}`}>
              {note}
            </div>
          ))}
        </div>
      )}

      <div
        className={`tiyogo-details${mode === 'expanded' ? ' tiyogo-open' : ''}`}
        aria-hidden={mode !== 'expanded'}
      >
        <div className="tiyogo-details-inner">
          <div className="tiyogo-row">
            <span className="tiyogo-label">Demo URL</span>
            <span className="tiyogo-value">{demoUrl}</span>
          </div>
          {config.firstPublished && (
            <div className="tiyogo-row">
              <span className="tiyogo-label">First published</span>
              <span className="tiyogo-value">{config.firstPublished}</span>
            </div>
          )}
          {config.lastUpdated && (
            <div className="tiyogo-row">
              <span className="tiyogo-label">Last updated</span>
              <span className="tiyogo-value">{config.lastUpdated}</span>
            </div>
          )}
          {config.description && <p className="tiyogo-desc">{config.description}</p>}
          <div className="tiyogo-btns">
            <a
              className="tiyogo-btn tiyogo-btn-primary"
              href={config.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconMark style={{ color: '#fff' }} />
              {config.websiteButtonText}
            </a>
            <a
              className="tiyogo-btn tiyogo-btn-secondary"
              href={config.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MailIcon />
              {config.contactButtonText}
            </a>
          </div>
        </div>
      </div>

      <div
        className="tiyogo-cardwrap"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        <div
          className={`tiyogo-card${open ? ' tiyogo-open' : ''}`}
          style={{ opacity: mode === 'collapsed' ? config.opacity : 1 }}
          role="button"
          tabIndex={0}
          aria-label="Brought to you by Tiyogo — click for demo details"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setMode((m) => (m === 'expanded' ? 'collapsed' : 'expanded'));
            }
          }}
        >
          <span className="tiyogo-heading">{config.heading}</span>
          <FullLogo className="tiyogo-fulllogo" />
          <span className="tiyogo-learn">{config.learnMoreText}</span>
          <IconMark className="tiyogo-mark" />
        </div>
      </div>
    </div>
  );
}
