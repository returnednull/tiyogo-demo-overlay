const STYLE_ID = 'tiyogo-overlay-styles';

const CSS = `
.tiyogo-root{position:fixed;z-index:2147483000;display:flex;flex-direction:column;gap:8px;pointer-events:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}
.tiyogo-root>*{pointer-events:auto;}
.tiyogo-root *{box-sizing:border-box;margin:0;padding:0;}

.tiyogo-pos-bottom-right{right:20px;bottom:20px;align-items:flex-end;}
.tiyogo-pos-bottom-left{left:20px;bottom:20px;align-items:flex-start;}
.tiyogo-pos-top-right{right:20px;top:20px;align-items:flex-end;flex-direction:column-reverse;}
.tiyogo-pos-top-left{left:20px;top:20px;align-items:flex-start;flex-direction:column-reverse;}

.tiyogo-notes{display:flex;flex-direction:column;gap:6px;}
.tiyogo-pos-top-left .tiyogo-notes,.tiyogo-pos-top-right .tiyogo-notes{flex-direction:column-reverse;}
.tiyogo-note{background:#111;color:#fff;font-size:11px;font-weight:500;line-height:1.4;padding:7px 11px;border-radius:12px;max-width:240px;box-shadow:0 4px 14px rgba(0,0,0,.22);animation:tiyogo-pop .3s cubic-bezier(.22,1,.36,1);}
.tiyogo-pos-bottom-left .tiyogo-note,.tiyogo-pos-top-left .tiyogo-note{border-bottom-left-radius:3px;}
.tiyogo-pos-bottom-right .tiyogo-note,.tiyogo-pos-top-right .tiyogo-note{border-bottom-right-radius:3px;}

.tiyogo-details{background:#fff;color:#111;width:268px;border-radius:16px;box-shadow:0 8px 30px rgba(0,0,0,.18),0 2px 6px rgba(0,0,0,.1);overflow:hidden;max-height:0;opacity:0;transform:translateY(8px);transition:max-height .38s cubic-bezier(.22,1,.36,1),opacity .26s ease,transform .3s cubic-bezier(.22,1,.36,1);will-change:max-height,opacity,transform;}
.tiyogo-pos-top-left .tiyogo-details,.tiyogo-pos-top-right .tiyogo-details{transform:translateY(-8px);}
.tiyogo-details.tiyogo-open{max-height:460px;opacity:1;transform:translateY(0);}
.tiyogo-details-inner{padding:16px;}
.tiyogo-row{display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:5px 0;border-bottom:1px solid #f0f0f2;}
.tiyogo-label{font-size:9.5px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#9ca3af;white-space:nowrap;}
.tiyogo-value{font-size:12px;font-weight:600;color:#111;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.tiyogo-desc{font-size:11.5px;line-height:1.5;color:#4b5563;margin:10px 0 14px;}
.tiyogo-btns{display:flex;flex-direction:column;gap:8px;}
.tiyogo-btn{display:flex;align-items:center;justify-content:center;gap:8px;height:38px;border-radius:10px;font-size:12.5px;font-weight:600;cursor:pointer;border:1px solid transparent;text-decoration:none;transition:transform .12s ease,filter .15s ease,background .15s ease;}
.tiyogo-btn:active{transform:scale(.975);}
.tiyogo-btn-primary{background:var(--tiyogo-accent);color:#fff;}
.tiyogo-btn-primary:hover{filter:brightness(1.08);}
.tiyogo-btn-secondary{background:#fff;color:#111;border-color:#111;}
.tiyogo-btn-secondary:hover{background:#111;color:#fff;}
.tiyogo-btn svg{width:15px;height:15px;flex:none;}

.tiyogo-card{position:relative;background:#fff;color:#000;width:54px;height:54px;max-height:54px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.18),0 1px 3px rgba(0,0,0,.12);transition:width .34s cubic-bezier(.22,1,.36,1),max-height .34s cubic-bezier(.22,1,.36,1),border-radius .3s ease,padding .3s ease,opacity .25s ease,box-shadow .25s ease;will-change:width,max-height;}
.tiyogo-card.tiyogo-open{width:230px;height:auto;max-height:200px;border-radius:18px;padding:16px;box-shadow:0 10px 34px rgba(0,0,0,.2),0 2px 6px rgba(0,0,0,.1);}
.tiyogo-card:hover{box-shadow:0 8px 24px rgba(0,0,0,.24),0 2px 5px rgba(0,0,0,.14);}

.tiyogo-mark{position:absolute;width:25px;height:25px;color:#000;opacity:1;transition:opacity .14s ease .08s;}
.tiyogo-card.tiyogo-open .tiyogo-mark{opacity:0;transition:opacity .1s ease;}

.tiyogo-heading{font-size:10px;font-weight:600;letter-spacing:.02em;color:#6b7280;white-space:nowrap;margin-bottom:9px;opacity:0;transition:opacity .16s ease;}
.tiyogo-fulllogo{height:24px;width:auto;color:#000;opacity:0;transition:opacity .16s ease;}
.tiyogo-learn{font-size:9.5px;font-weight:500;color:#9ca3af;white-space:nowrap;margin-top:9px;opacity:0;transition:opacity .16s ease;}
.tiyogo-card.tiyogo-open .tiyogo-heading,.tiyogo-card.tiyogo-open .tiyogo-fulllogo,.tiyogo-card.tiyogo-open .tiyogo-learn{opacity:1;transition:opacity .26s ease .12s;}

@keyframes tiyogo-pop{from{opacity:0;transform:translateY(6px) scale(.96);}to{opacity:1;transform:none;}}

@media (prefers-reduced-motion: reduce){
  .tiyogo-card,.tiyogo-details,.tiyogo-mark,.tiyogo-heading,.tiyogo-fulllogo,.tiyogo-learn,.tiyogo-btn{transition-duration:.01ms !important;}
  .tiyogo-note{animation-duration:.01ms !important;}
}
`;

let injected = false;

export function injectStyles() {
  if (injected || typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) {
    injected = true;
    return;
  }
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = CSS;
  document.head.appendChild(el);
  injected = true;
}
