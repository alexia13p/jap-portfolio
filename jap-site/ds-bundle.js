/* @ds-bundle: {"format":4,"namespace":"DesignSystem_c28375","components":[{"name":"CTAButton","sourcePath":"components/core/CTAButton.jsx"},{"name":"LogoAnimation","sourcePath":"components/core/LogoAnimation.jsx"},{"name":"ParallaxBackground","sourcePath":"components/core/ParallaxBackground.jsx"},{"name":"ProjectCard","sourcePath":"components/core/ProjectCard.jsx"},{"name":"SectionLabel","sourcePath":"components/core/SectionLabel.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"TimelineItem","sourcePath":"components/core/TimelineItem.jsx"},{"name":"TrustBar","sourcePath":"components/core/TrustBar.jsx"}],"sourceHashes":{"components/core/CTAButton.jsx":"3b272fa6d254","components/core/LogoAnimation.jsx":"350a1e5702cb","components/core/ParallaxBackground.jsx":"4f18d3b2784b","components/core/ProjectCard.jsx":"2f3e15d90991","components/core/SectionLabel.jsx":"7343a29a9d9c","components/core/Tag.jsx":"e097f1069311","components/core/TimelineItem.jsx":"be78e9c75440","components/core/TrustBar.jsx":"aa3cc9dff425","ui_kits/portfolio/Portfolio.jsx":"eac5e9c748d4"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_c28375 = window.DesignSystem_c28375 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/CTAButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * CTAButton — the brand call-to-action.
 *  - variant="outline" (default): border-only pill, purple tint on hover.
 *  - variant="primary": filled purple→magenta gradient pill with a soft glow
 *    that lifts on hover — the premium primary action.
 * Arrow shifts right on hover.
 */
function CTAButton({
  children,
  href,
  arrow = true,
  variant = 'outline',
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const primary = variant === 'primary';
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    borderRadius: 'var(--radius-pill)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--fw-body-semibold)',
    textDecoration: 'none',
    cursor: 'pointer'
  };
  const style = primary ? {
    ...base,
    padding: '16px 34px',
    fontSize: '16px',
    color: 'var(--text-primary)',
    border: `1px solid rgba(123, 47, 240, ${hover ? 0.55 : 0.3})`,
    background: `linear-gradient(120deg, rgba(123, 47, 240, ${hover ? 0.24 : 0.15}) 0%, rgba(255, 45, 138, ${hover ? 0.20 : 0.12}) 100%)`,
    backdropFilter: 'blur(14px) saturate(1.3)',
    WebkitBackdropFilter: 'blur(14px) saturate(1.3)',
    boxShadow: hover ? '0 12px 34px rgba(123,47,240,0.24), inset 0 1px 0 rgba(255,255,255,0.16)' : '0 6px 22px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.10)',
    transform: hover ? 'translateY(-2px)' : 'translateY(0)',
    transition: 'transform .3s ease, box-shadow .3s ease, background .3s ease, border-color .3s ease'
  } : {
    ...base,
    padding: '13px 26px',
    fontSize: '15px',
    fontWeight: 'var(--fw-body-medium)',
    border: `1px solid ${hover ? 'var(--accent-purple)' : 'var(--border)'}`,
    background: hover ? 'var(--tint-purple)' : 'transparent',
    transition: 'border-color .3s ease, background .3s ease'
  };
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: style
  }, rest), arrow && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      transform: hover ? 'translateX(4px)' : 'translateX(0)',
      transition: 'transform .3s ease'
    }
  }, "\u2192"), children);
}
Object.assign(__ds_scope, { CTAButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CTAButton.jsx", error: String((e && e.message) || e) }); }

// components/core/LogoAnimation.jsx
try { (() => {
const {
  useRef,
  useEffect
} = React;
/**
 * LogoAnimation — the signature "JAP" mark.
 * A glowing cursor traces each letter's stroke path like a pen writing.
 * Loop: draw forward → hold → erase in reverse → pause → redraw → stop.
 * Colors: J purple, A yellow, P magenta.
 */
const PURPLE = '#7B2FF0';
const YELLOW = '#FFD600';
const MAGENTA = '#FF2D8A';

// Ordered stroke segments. Each { d, color }. A is two strokes (chevron + bar).
const SEGMENTS = [{
  d: 'M150 28 L150 122 Q150 175 100 175 Q54 175 54 133',
  color: PURPLE
},
// J
{
  d: 'M205 175 L263 28 L321 175',
  color: YELLOW
},
// A chevron
{
  d: 'M232 122 L294 122',
  color: YELLOW
},
// A crossbar
{
  d: 'M420 175 L420 28 Q492 28 492 72 Q492 116 420 116',
  color: MAGENTA
} // P
];
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
const easeInCubic = t => t * t * t;
function LogoAnimation({
  size = 'min(72vw, 420px)',
  autoPlay = true,
  loop = true
}) {
  const pathRefs = useRef([]);
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const rafRef = useRef(null);
  const timerRef = useRef(null);
  useEffect(() => {
    const paths = pathRefs.current.filter(Boolean);
    if (!paths.length) return;
    const lengths = paths.map(p => p.getTotalLength());
    const total = lengths.reduce((a, b) => a + b, 0);
    paths.forEach((p, i) => {
      p.style.strokeDasharray = lengths[i];
      p.style.strokeDashoffset = lengths[i];
    });
    const cursor = cursorRef.current;
    const trail = trailRef.current;

    // Render the mark at a given drawn length; place + colour the cursor.
    const render = (drawnLen, showCursor) => {
      let acc = 0;
      let frontier = null;
      for (let i = 0; i < paths.length; i++) {
        const L = lengths[i];
        const start = acc;
        const end = acc + L;
        let visible;
        if (drawnLen >= end) visible = L;else if (drawnLen <= start) visible = 0;else visible = drawnLen - start;
        paths[i].style.strokeDashoffset = L - visible;
        if (frontier === null && visible > 0 && visible < L + 0.5 && drawnLen < total) {
          frontier = {
            path: paths[i],
            at: visible,
            color: SEGMENTS[i].color
          };
        }
        acc = end;
      }
      if (showCursor && frontier && drawnLen > 0 && drawnLen < total) {
        const pt = frontier.path.getPointAtLength(frontier.at);
        cursor.setAttribute('cx', pt.x);
        cursor.setAttribute('cy', pt.y);
        cursor.setAttribute('fill', frontier.color);
        cursor.style.color = frontier.color; // drives the drop-shadow glow
        cursor.style.opacity = 1;
        // trailing comet tail — a little behind
        const back = frontier.path.getPointAtLength(Math.max(0, frontier.at - 14));
        trail.setAttribute('cx', back.x);
        trail.setAttribute('cy', back.y);
        trail.setAttribute('fill', frontier.color);
        trail.style.opacity = 0.35;
      } else {
        cursor.style.opacity = 0;
        trail.style.opacity = 0;
      }
    };
    const tween = (fromLen, toLen, duration, easing) => new Promise(resolve => {
      const startT = performance.now();
      const step = now => {
        const t = Math.min(1, (now - startT) / duration);
        const e = easing(t);
        const len = fromLen + (toLen - fromLen) * e;
        render(len, true);
        if (t < 1) rafRef.current = requestAnimationFrame(step);else resolve();
      };
      rafRef.current = requestAnimationFrame(step);
    });
    const wait = ms => new Promise(r => {
      timerRef.current = setTimeout(r, ms);
    });
    let cancelled = false;
    const run = async () => {
      render(0, false);
      // draw forward
      await tween(0, total, 2550, easeOutCubic);
      if (cancelled) return;
      render(total, false);
      await wait(2000); // hold
      if (cancelled) return;
      // erase in reverse (cursor comes back)
      await tween(total, 0, 2350, easeInCubic);
      if (cancelled) return;
      await wait(1200); // pause on empty canvas
      if (cancelled) return;
      // redraw one final time, then stop
      await tween(0, total, 2550, easeOutCubic);
      if (cancelled) return;
      render(total, false);
      if (loop) {
        await wait(2600);
        if (!cancelled) run();
      }
    };
    if (autoPlay) {
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        render(total, false);
      } else run();
    } else {
      render(total, false);
    }
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
    };
  }, [autoPlay, loop]);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 546 203",
    width: size,
    style: {
      display: 'block',
      overflow: 'visible',
      maxWidth: '100%'
    },
    role: "img",
    "aria-label": "JAP"
  }, SEGMENTS.map((s, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    ref: el => pathRefs.current[i] = el,
    d: s.d,
    fill: "none",
    stroke: s.color,
    strokeWidth: "38",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), /*#__PURE__*/React.createElement("circle", {
    ref: trailRef,
    r: "15",
    style: {
      opacity: 0,
      filter: 'blur(6px)'
    }
  }), /*#__PURE__*/React.createElement("circle", {
    ref: cursorRef,
    r: "14",
    style: {
      opacity: 0,
      filter: 'drop-shadow(0 0 14px currentColor)'
    }
  }));
}
Object.assign(__ds_scope, { LogoAnimation });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/LogoAnimation.jsx", error: String((e && e.message) || e) }); }

// components/core/ParallaxBackground.jsx
try { (() => {
const {
  useEffect,
  useRef
} = React;
/**
 * ParallaxBackground — a fixed, full-viewport backdrop of faint brand motifs
 * (soft accent glows + thin geometric outlines) that drift at different rates
 * as the page scrolls. Deliberately low-contrast so it never competes with
 * content; sits behind everything (zIndex -1), pointer-events none.
 *
 * Mount once as a sibling before the page content. It reads window.scrollY
 * directly (rAF-throttled) so it stays aligned to the whole page.
 */
const LAYERS = [
// { depth (px moved per px scrolled), node }
{
  depth: 0.22,
  glow: 'var(--accent-purple)',
  x: '12%',
  y: '14%',
  size: 420
}, {
  depth: 0.12,
  glow: 'var(--accent-magenta)',
  x: '82%',
  y: '58%',
  size: 480
}, {
  depth: 0.30,
  glow: 'var(--accent-yellow)',
  x: '68%',
  y: '8%',
  size: 300
}];
function ParallaxBackground() {
  const glowRefs = useRef([]);
  const shapeRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY || window.pageYOffset || 0;
        LAYERS.forEach((l, i) => {
          const el = glowRefs.current[i];
          if (el) el.style.transform = `translate3d(0, ${(-y * l.depth).toFixed(1)}px, 0)`;
        });
        if (shapeRef.current) shapeRef.current.style.transform = `translate3d(0, ${(-y * 0.18).toFixed(1)}px, 0) rotate(${(y * 0.02).toFixed(2)}deg)`;
        if (ringRef.current) ringRef.current.style.transform = `translate3d(0, ${(-y * 0.08).toFixed(1)}px, 0)`;
      });
    };
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      window.addEventListener('scroll', onScroll, {
        passive: true
      });
      onScroll();
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: -1
    }
  }, LAYERS.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    ref: el => glowRefs.current[i] = el,
    style: {
      position: 'absolute',
      left: l.x,
      top: l.y,
      width: l.size,
      height: l.size,
      marginLeft: -l.size / 2,
      marginTop: -l.size / 2,
      borderRadius: '50%',
      background: l.glow,
      opacity: 0.1,
      filter: 'blur(90px)',
      willChange: 'transform'
    }
  })), /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%'
    },
    preserveAspectRatio: "xMidYMid slice",
    viewBox: "0 0 1200 900"
  }, /*#__PURE__*/React.createElement("circle", {
    ref: ringRef,
    cx: "150",
    cy: "240",
    r: "120",
    fill: "none",
    stroke: "rgba(255,255,255,0.05)",
    strokeWidth: "2",
    style: {
      willChange: 'transform'
    }
  }), /*#__PURE__*/React.createElement("rect", {
    ref: shapeRef,
    x: "940",
    y: "600",
    width: "180",
    height: "180",
    fill: "none",
    stroke: "rgba(255,255,255,0.05)",
    strokeWidth: "2",
    style: {
      transformBox: 'fill-box',
      transformOrigin: 'center',
      willChange: 'transform'
    }
  })));
}
Object.assign(__ds_scope, { ParallaxBackground });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ParallaxBackground.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionLabel.jsx
try { (() => {
/**
 * SectionLabel — the small uppercase Fredoka label that opens each section
 * ("Work", "Experience", "Training").
 */
function SectionLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-display-semibold)',
      fontSize: 'var(--fs-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)',
      marginBottom: 'var(--space-6)'
    }
  }, children);
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
/**
 * Tag — a small technology pill used in a row under a project card.
 * Neutral by default; pass an accent to tint it to a card's color.
 */
function Tag({
  children,
  accent
}) {
  const map = {
    purple: {
      bg: 'var(--tint-purple)',
      fg: 'var(--accent-purple)'
    },
    yellow: {
      bg: 'var(--tint-yellow)',
      fg: 'var(--accent-yellow)'
    },
    magenta: {
      bg: 'var(--tint-magenta)',
      fg: 'var(--accent-magenta)'
    }
  };
  const c = map[accent];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '5px 12px',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--border)',
      background: c ? c.bg : 'transparent',
      color: c ? c.fg : 'var(--text-secondary)',
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      fontWeight: 'var(--fw-body-medium)',
      lineHeight: 1,
      whiteSpace: 'nowrap'
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/ProjectCard.jsx
try { (() => {
/**
 * ProjectCard — a stacked work card rendered as tinted glass: a translucent
 * accent gradient over a backdrop blur, with an accent-tinted border and a
 * soft top highlight. Colored icon box, title, company + duration, a
 * narrative paragraph (never bullets), and a row of tag pills.
 * On hover the glass brightens, the border intensifies, and the card lifts 3px.
 */
const ACCENTS = {
  purple: {
    color: 'var(--accent-purple)',
    tint: 'var(--tint-purple)',
    rgb: '123, 47, 240'
  },
  yellow: {
    color: 'var(--accent-yellow)',
    tint: 'var(--tint-yellow)',
    rgb: '255, 214, 0'
  },
  magenta: {
    color: 'var(--accent-magenta)',
    tint: 'var(--tint-magenta)',
    rgb: '255, 45, 138'
  }
};
function ProjectCard({
  icon,
  title,
  company,
  description,
  tags = [],
  accent = 'purple'
}) {
  const [hover, setHover] = React.useState(false);
  const a = ACCENTS[accent] || ACCENTS.purple;
  return /*#__PURE__*/React.createElement("article", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      background: `linear-gradient(150deg, rgba(${a.rgb}, ${hover ? 0.20 : 0.13}) 0%, rgba(${a.rgb}, ${hover ? 0.07 : 0.04}) 46%, rgba(26, 26, 26, 0.55) 100%)`,
      backdropFilter: 'blur(14px) saturate(1.3)',
      WebkitBackdropFilter: 'blur(14px) saturate(1.3)',
      border: `1px solid rgba(${a.rgb}, ${hover ? 0.55 : 0.28})`,
      borderRadius: 'var(--radius-card)',
      padding: 'var(--space-card)',
      boxShadow: hover ? `0 14px 40px rgba(${a.rgb}, 0.22), inset 0 1px 0 rgba(255,255,255,0.14)` : `0 6px 22px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.08)`,
      transform: hover ? 'translateY(-3px)' : 'translateY(0)',
      transition: 'background .3s ease, border-color .3s ease, transform .3s ease, box-shadow .3s ease',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '40px',
      height: '40px',
      borderRadius: 'var(--radius-icon)',
      background: `rgba(${a.rgb}, 0.16)`,
      border: `1px solid rgba(${a.rgb}, 0.3)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      marginBottom: '16px'
    }
  }, icon), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-display-semibold)',
      fontSize: 'var(--fs-card-title)',
      color: 'var(--text-primary)',
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      color: 'var(--text-secondary)',
      marginTop: '4px'
    }
  }, company), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '16px',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-secondary)',
      margin: '14px 0 0'
    }
  }, description), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '18px'
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t
  }, t))));
}
Object.assign(__ds_scope, { ProjectCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProjectCard.jsx", error: String((e && e.message) || e) }); }

// components/core/TimelineItem.jsx
try { (() => {
/**
 * TimelineItem — a compact row for the Experience / Training lists.
 * Year range on the left, company + role on the right, hairline divider below.
 * Stacks vertically on narrow viewports.
 */
function TimelineItem({
  year,
  company,
  role
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4px 20px',
      padding: '18px 0',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: '100px',
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      fontWeight: 'var(--fw-body-medium)',
      color: 'var(--text-secondary)'
    }
  }, year), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '16px',
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-body-semibold)'
    }
  }, company), role ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, " \xB7 ", role) : null));
}
Object.assign(__ds_scope, { TimelineItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TimelineItem.jsx", error: String((e && e.message) || e) }); }

// components/core/TrustBar.jsx
try { (() => {
/**
 * TrustBar — a strip of credibility signals shown just below the hero.
 * Big Fredoka value + small uppercase label per item, cycling accent colors,
 * hairline top/bottom borders.
 *
 * Two modes:
 *  - static (default): items spread across the row, wrapping on narrow screens.
 *  - scrolling: items loop horizontally in a seamless marquee (pauses on hover).
 */
const ACCENTS = ['var(--accent-purple)', 'var(--accent-yellow)', 'var(--accent-magenta)'];
function Item({
  it,
  i
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '6px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-display-bold)',
      fontSize: 'clamp(24px, 3.2vw, 30px)',
      lineHeight: 1,
      color: it.accent === false ? 'var(--text-primary)' : ACCENTS[i % ACCENTS.length]
    }
  }, it.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap'
    }
  }, it.label));
}
function TrustBar({
  items = [],
  scrolling = false,
  speed = 32
}) {
  if (scrolling) {
    // Duplicate the list so the -50% translate loops seamlessly.
    const loop = [...items, ...items];
    return /*#__PURE__*/React.createElement("div", {
      className: "trustbar-marquee",
      style: {
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        padding: '30px 0',
        // fade the edges so items appear/vanish softly
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)'
      }
    }, /*#__PURE__*/React.createElement("style", null, `
          @keyframes trustbar-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .trustbar-track { display: flex; width: max-content; animation: trustbar-scroll ${speed}s linear infinite; }
          .trustbar-marquee:hover .trustbar-track { animation-play-state: paused; }
          @media (prefers-reduced-motion: reduce) { .trustbar-track { animation: none; } }
        `), /*#__PURE__*/React.createElement("div", {
      className: "trustbar-track"
    }, loop.map((it, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        padding: '0 44px',
        display: 'flex',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Item, {
      it: it,
      i: i % items.length
    })))));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '30px 24px',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: '24px 20px'
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.label,
    style: {
      flex: '1 1 120px'
    }
  }, /*#__PURE__*/React.createElement(Item, {
    it: it,
    i: i
  }))));
}
Object.assign(__ds_scope, { TrustBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TrustBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Portfolio.jsx
try { (() => {
const {
  useState,
  useRef,
  useEffect
} = React;
const TRUST = [{
  value: '7+',
  label: 'years in IT support'
}, {
  value: '4',
  label: 'enterprises supported'
}, {
  value: 'CCNA',
  label: 'Cisco certified'
}, {
  value: '100s',
  label: 'daily users supported'
}];

// Fade-in-up on scroll, IntersectionObserver @ 15%.
function Reveal({
  children,
  delay = 0
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      });
    }, {
      threshold: 0.15
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      opacity: shown ? 1 : 0,
      transform: shown ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`
    }
  }, children);
}
const WORK = [{
  accent: 'purple',
  icon: '⚡',
  title: 'Manufacturing IT Infrastructure',
  company: 'IONICS – EMS Inc. · 5 years',
  description: 'Maintained and troubleshot Cisco-based network infrastructure across a full manufacturing environment. Supported IBM System 21 for production operations, managed hardware lifecycles, and kept enterprise systems reliable for hundreds of users daily.',
  tags: ['Cisco', 'IBM System 21', 'Hardware', 'Enterprise IT']
}, {
  accent: 'yellow',
  icon: '☀️',
  title: 'Corporate IT & End-User Support',
  company: 'SunPower Corporation',
  description: 'Provided frontline IT support for a global solar energy company. Troubleshot desktops, laptops, and peripherals across teams, supported Microsoft 365 environments, and ensured issues were documented and resolved within SLA.',
  tags: ['Microsoft 365', 'Helpdesk', 'SLA Management']
}, {
  accent: 'magenta',
  icon: '🌐',
  title: 'ISP Technical Support',
  company: 'Younity · Current',
  description: 'Handling internet connectivity issues for residential customers. Documenting homeowner cases, escalating to network engineers when needed, and managing billing-related support — all while keeping resolution times tight.',
  tags: ['Networking', 'Customer Support', 'Documentation']
}, {
  accent: 'purple',
  icon: '📞',
  title: 'High-Volume Escalation Support',
  company: 'TELUS International Philippines',
  description: 'Handled advanced technical support cases and escalations in a fast-paced BPO environment. Diagnosed software, connectivity, and system issues while maintaining quality and speed across high call volumes.',
  tags: ['Tier 2 Support', 'Escalations', 'Diagnostics']
}];
const EXPERIENCE = [{
  year: '2024 – now',
  company: 'Younity',
  role: 'Internet Technical Support'
}, {
  year: '2024',
  company: 'SunPower Corporation',
  role: 'IT / Technical Support'
}, {
  year: '2019 – 2024',
  company: 'IONICS – EMS Inc.',
  role: 'IT Support / Systems'
}, {
  year: '2016 – 2018',
  company: 'TELUS International Philippines',
  role: 'Technical Support II'
}];
const TRAINING = [{
  year: '2023',
  company: 'Cisco Certified Network Associate',
  role: 'Internal Training'
}, {
  year: '2020',
  company: 'Check Point Infinity Circle',
  role: 'Security in the New Normal'
}, {
  year: '2011 – 2016',
  company: 'BS Information Technology',
  role: 'Colegio de San Juan de Letran'
}];
const SOCIALS = [{
  label: 'Email',
  href: 'mailto:jap.tolentino11@gmail.com'
}, {
  label: 'LinkedIn',
  href: '#'
}, {
  label: 'Facebook',
  href: '#'
}, {
  label: 'X',
  href: '#'
}];
function Section({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: 'var(--space-section) 24px',
      ...style
    }
  }, children);
}
function Portfolio() {
  const {
    LogoAnimation,
    CTAButton,
    Tag,
    SectionLabel,
    TimelineItem,
    ProjectCard,
    TrustBar,
    ParallaxBackground
  } = window.DesignSystem_c28375;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(ParallaxBackground, null), /*#__PURE__*/React.createElement("section", {
    style: {
      height: '100vh',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    src: "../nexus-hero/index.html",
    title: "Nexus Core hero",
    style: {
      display: 'block',
      width: '100%',
      height: '100%',
      border: 'none'
    }
  })), /*#__PURE__*/React.createElement("header", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 24px',
      gap: '32px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '32px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-display-bold)',
      fontSize: 'var(--fs-hero)',
      lineHeight: 'var(--lh-tight)',
      color: 'var(--text-primary)',
      margin: 0,
      textAlign: 'left'
    }
  }, "hi,", /*#__PURE__*/React.createElement("br", null), "i'm", /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement(LogoAnimation, {
    size: "min(72vw, 420px)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-display-bold)',
      fontSize: 'var(--fs-hero)',
      lineHeight: 'var(--lh-tight)',
      color: 'var(--text-primary)',
      textAlign: 'center'
    }
  }, "your IT Specialist"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--fs-tagline)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-secondary)',
      maxWidth: 'var(--tagline-max)',
      margin: 0,
      textAlign: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '28px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "jap-resume.pdf",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "resume-link",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      fontWeight: 'var(--fw-body-medium)',
      color: 'var(--text-secondary)',
      textDecoration: 'none',
      opacity: 0.85,
      transition: 'color .25s ease, opacity .25s ease'
    }
  }), /*#__PURE__*/React.createElement("a", {
    href: "jap-resume.pdf",
    download: "Jan-Patrick-Tolentino-Resume.pdf",
    className: "resume-link",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      fontWeight: 'var(--fw-body-medium)',
      color: 'var(--text-secondary)',
      textDecoration: 'none',
      opacity: 0.85,
      transition: 'color .25s ease, opacity .25s ease'
    }
  }))))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(TrustBar, {
    items: TRUST,
    scrolling: true
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionLabel, null, "Work"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }
  }, WORK.map((w, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: w.title,
    delay: i * 60
  }, /*#__PURE__*/React.createElement(ProjectCard, w))))), /*#__PURE__*/React.createElement(Section, {
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Experience"), /*#__PURE__*/React.createElement("div", null, EXPERIENCE.map((e, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: e.company + e.year,
    delay: i * 50
  }, /*#__PURE__*/React.createElement(TimelineItem, e))))), /*#__PURE__*/React.createElement(Section, {
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Training"), /*#__PURE__*/React.createElement("div", null, TRAINING.map((t, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: t.company,
    delay: i * 50
  }, /*#__PURE__*/React.createElement(TimelineItem, t))))), /*#__PURE__*/React.createElement(Section, {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-display-bold)',
      fontSize: 'var(--fs-statement)',
      color: 'var(--text-primary)',
      margin: 0
    }
  }, "made with focus."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-secondary)',
      maxWidth: 'var(--statement-max)',
      margin: '18px auto 0'
    }
  }, "I believe good IT work is reliable, documented, and continuously improving. Technology should support people, not confuse them."))), /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '40px 24px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '24px',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, SOCIALS.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.label,
    href: s.href,
    className: "footer-link",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      color: 'var(--text-secondary)',
      textDecoration: 'none',
      transition: 'color .2s ease'
    }
  }, s.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      color: 'var(--text-faint)',
      marginTop: '20px'
    }
  }, "\xA9 2026 Jan Patrick Tolentino \xB7 Calamba, Laguna"))));
}
function mountPortfolio() {
  const ns = window.DesignSystem_c28375;
  const ready = ns && ns.LogoAnimation && ns.CTAButton && ns.ProjectCard && ns.Tag && ns.TimelineItem && ns.SectionLabel && ns.TrustBar && ns.ParallaxBackground;
  if (!ready) {
    setTimeout(mountPortfolio, 30);
    return;
  }
  const el = document.getElementById('root');
  window.__portfolioRoot = window.__portfolioRoot || ReactDOM.createRoot(el);
  window.__portfolioRoot.render(/*#__PURE__*/React.createElement(Portfolio, null));
}
mountPortfolio();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Portfolio.jsx", error: String((e && e.message) || e) }); }

__ds_ns.CTAButton = __ds_scope.CTAButton;

__ds_ns.LogoAnimation = __ds_scope.LogoAnimation;

__ds_ns.ParallaxBackground = __ds_scope.ParallaxBackground;

__ds_ns.ProjectCard = __ds_scope.ProjectCard;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.TimelineItem = __ds_scope.TimelineItem;

__ds_ns.TrustBar = __ds_scope.TrustBar;

})();
