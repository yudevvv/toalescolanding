# TOALESCO Component Library — Specification v1.0

## ~40 premium components across 6 layers.

Every component is a tool, not a decoration.

---

## Layer 0: Substrate

---

### 0.1 BlueprintGrid

**Purpose:** The universal background. Engineering graph paper. Establishes the space as one of measurement and precision.

**Interaction:** None. Purely visual. Does not respond to cursor or scroll.

**Motion:** Grid fades in on page load over 800ms. On mount, a single "grid shift" offsets lines by 0.5px (a settling motion). No other animation.

**Accessibility:** `prefers-reduced-motion` sets opacity immediately (no fade). Grid removed entirely when `prefers-contrast: more`.

**Responsive:** Grid density varies: 40px cells (≥1440px), 32px (1024–1439), 24px (768–1023), 16px (<768). Always present.

**Performance:** CSS only. `background-image` with `repeating-linear-gradient`. No JS, no SVG rasterization.

**Dark mode:** `#07111F` bg, lines at `#FAF8F4` 10% opacity.
**Light mode:** `#FAF8F4` bg, lines at `#07111F` 8% opacity.

**Variants:**
- `BlueprintGrid–subtle`: 6% opacity. For dense content areas.
- `BlueprintGrid–dense`: Half cell size. For technical/spec pages.

**States:** None.

---

### 0.2 SchematicFrame

**Purpose:** Rectangular boundary defining the "drafting area" for a system diagram. Used in Scene 3 to contain the 5-node layout.

**Interaction:** None. Visual boundary only.

**Motion:** Fades in on viewport entry. Stroke draws 1px, opacity 0→10% over 400ms. After 1500ms, fades to 5% opacity.

**Accessibility:** `aria-hidden="true"`.

**Responsive:** Scales with viewport. Max 800px, min 280px. Aspect ratio 800:440 maintained. On mobile: 70% of viewport width.

**Performance:** Single SVG rect. No compositing required.

**Dark mode:** Stroke `--measure` at 10% opacity.
**Light mode:** Stroke `--measure` at 8% opacity.

**Variants:**
- `SchematicFrame–dashed`: 4px dash for temporary/editing states.
- `SchematicFrame–full`: 100% opacity for focused/selected diagrams.

**States:** `idle` (10%), `active` (in viewport), `settled` (5% after delay).

---

### 0.3 Surface

**Purpose:** 4-tier surface hierarchy. Visual depth through background opacity and border only — no shadows.

**Interaction:** Only Tier 4 (Interactive) responds to cursor. Tiers 1–3 are passive.

**Motion:** None on static surfaces. Interactive surface border shifts on hover (120ms).

**Accessibility:** Sufficient contrast between tiers (min 1.05:1 ratio). Touch targets 44px minimum on Interactive.

**Performance:** `background-color` and `border` only. No filters, no pseudo-elements.

**Dark mode:**
| Tier | Name | Background | Border |
|------|------|------------|--------|
| 1 | Floor | `--substrate` | None |
| 2 | Panel | `--substrate-dim` (8%) | 1px `--boundary` |
| 3 | Active Panel | `--substrate-dim` (12%) | 1px `--active` 30% |
| 4 | Interactive | `--substrate-dim` (6%) | 1px `--boundary` |

**Light mode:**
| Tier | Name | Background | Border |
|------|------|------------|--------|
| 1 | Floor | `--substrate-light` | None |
| 2 | Panel | `--measure` 3% | 1px `--measure` 12% |
| 3 | Active Panel | `--measure` 5% | 1px `--active` 25% |
| 4 | Interactive | `--measure` 2% | 1px `--measure` 12% |

**Variants:** None (use tiers by name).

**States:** `idle`, `hover` (Tier 4 only), `focus`.

---

### 0.4 Container

**Purpose:** Content width limiter. Centers content with consistent padding.

**Interaction:** None.

**Motion:** None.

**Accessibility:** Does not trap focus. No ARIA needed.

**Responsive:**
- ≥1440px: max-width 1280px
- 1024–1439px: max-width 1024px
- 768–1023px: max-width 720px
- <768px: 100% width, 16px padding each side

**Performance:** `max-width` + `margin: 0 auto`. Zero overhead.

**Dark/Light mode:** No change.

**Variants:**
- `Container–wide`: Max 1440px
- `Container–narrow`: Max 640px
- `Container–flush`: No padding (edge-to-edge diagrams)

**States:** None.

---

## Layer 1: Scene System

---

### 1.1 Scene

**Purpose:** A 100dvh viewport container. One chapter of the scroll narrative. Exactly 5 in the landing experience.

**Interaction:** Scroll-snap target. Scroll moves between scenes. Content activates via IntersectionObserver, not scroll listener.

**Motion:**
- Mount: opacity 0→1 over 480ms on viewport entry
- Content staggered at 80ms intervals
- No animation on exit (scrolls out naturally)

**Accessibility:**
- `role="region"` with `aria-label` matching scene title
- `prefers-reduced-motion`: content appears immediately
- Scene skipping via SceneNavbar keyboard navigation

**Responsive:** Always 100dvh. Mobile snap `y mandatory` with 60px hysteresis. Tablet 40px hysteresis.

**Performance:** `scroll-snap-align: start`. IntersectionObserver only (passive). No scroll event listeners.

**Dark/Light mode:** Background inherits from parent (usually Grid).

**Variants:**
- `Scene–hero`: First scene, primary entrance animations.
- `Scene–diagram`: Contains system diagram, triggers assembly on entry.
- `Scene–content`: Text/panels, standard content layout.

**States:** `enter`, `active` (fully in viewport), `exit`.

---

### 1.2 SceneNavbar

**Purpose:** IDE toolbar-style navigation. Persistent reference point. Jump between scenes.

**Interaction:** Click scrolls to target scene. Hides on scroll down, shows on scroll up (chrome-style).

**Motion:**
- Hide/show: translateY, 240ms, (0.22, 1, 0.36, 1)
- Active indicator: 2px underline, width animates between items, 240ms
- Item hover: color shift, 120ms

**Accessibility:**
- `role="navigation"`, `aria-label="Scene navigation"`
- Each item: `role="button"`, `aria-current="true"` when active
- Tab between items, Enter/Space to navigate
- Visible 2px focus ring, offset 2px

**Responsive:**
- Desktop: horizontal, full labels ("Una idea")
- Mobile: abbreviated ("1", "2", "3", "4", "5"), no text

**Performance:** Fixed positioning. IntersectionObserver for active tracking. No scroll listeners. Falls back to no tracking if IntersectionObserver unavailable.

**Dark mode:** Background `--substrate`, border `--boundary`.
**Light mode:** Background `--substrate-light`, border `--measure` 12%.

**Variants:**
- `SceneNavbar–transparent`: No background, border only. Hero overlays.
- `SceneNavbar–sidebar`: Vertical, left-aligned. Documentation pages.

**States:** `visible`, `hidden` (scrolled down), `active` (per item).

---

### 1.3 LayerIndicator

**Purpose:** Right-side vertical dot indicator. Current scene position and total count. The "you are here" marker.

**Interaction:** Click dot → scroll to that scene. Not draggable.

**Motion:**
- Active dot: 6px diameter, `--active`, pulse scale 1↔1.15, 2s cycle
- Previous dots: 4px, `--measure` at 50%
- Next dots: 4px, `--measure` at 25%
- Connecting line: height interpolates continuously during scroll

**Accessibility:**
- `role="navigation"`, `aria-label="Section navigation"`
- Each dot: `aria-label="Go to scene {title}"`, `tabindex="0"`

**Responsive:**
- ≥1024px: visible, right-aligned, 40px from edge
- <1024px: hidden (SceneNavbar suffices)

**Performance:** 6 DOM nodes max (1 line + 5 dots). IntersectionObserver only. No RAF.

**Dark mode:** Connecting line `--measure` 15%.
**Light mode:** Connecting line `--measure` 20%.

**Variants:** None.

**States:** `active`, `previous`, `next`, `hidden` (mobile).

---

### 1.4 ScrollIndicator

**Purpose:** Small cue at bottom of first scene suggesting scroll. Appears once at initial load, disappears on first scroll.

**Interaction:** None. Cannot be re-triggered.

**Motion:**
- Fade in: 1000ms after page load
- Arrow: translateY 0→4px, 1s cycle, repeating
- Fade out: 400ms on first scroll

**Accessibility:** `aria-hidden="true"`. `prefers-reduced-motion`: static icon, no bounce.

**Responsive:** Hidden on touch devices (touch users know to scroll).

**Performance:** Single CSS animation. Removed from DOM after fade-out via `onAnimationEnd`.

**Dark mode:** `--measure` at 30%.
**Light mode:** `--measure` at 35%.

**Variants:**
- `ScrollIndicator–text`: Shows "Scroll" label.
- `ScrollIndicator–minimal`: Arrow only.

**States:** `entering`, `active` (bouncing), `exiting`, `hidden` (removed).

---

### 1.5 ParallaxLayer

**Purpose:** Depth layer system via transform speed differential during scroll.

**Interaction:** None. Passive. Interactive elements inside MUST be on Layer 1 (no parallax on interactive elements).

**Motion:**
- Layer -1 (substrate): translateY speed 0.2× scroll
- Layer 0 (background nodes): translateY speed 0.5× scroll
- Layer 1 (content): translateY speed 1.0× scroll (no transform)
- Layer 2 (probe, indicators): translateY speed 1.2× scroll

**Accessibility:** `prefers-reduced-motion`: all layers forced to 1.0× speed. Component disabled entirely.

**Responsive:** Differential reduced to 10% (from 30%) on mobile. Disabled below 768px.

**Performance:** `transform: translateY()` only (GPU-composited). RAF only during active scroll. Cleans up on unmount.

**Dark/Light mode:** No change.

**Variants:**
- `ParallaxLayer–slow`: Layer -1 behavior
- `ParallaxLayer–medium`: Layer 0 behavior
- `ParallaxLayer–fast`: Layer 2 behavior

**States:** `scrolling`, `settled` (80ms after scroll ends, layers lock).

---

### 1.6 SceneTransition

**Purpose:** Overlap and visual handoff between scenes during scroll. Implements the Layer Descend signature motion.

**Interaction:** None. Activated by scroll position crossing scene boundary.

**Motion:**
- Outgoing: scale 1→0.97, opacity 1→0.6 over 240ms
- Outgoing grid: translateY +20px at 0.5× speed
- Incoming grid: translateY from -20px at 1.2× speed
- Incoming: scale 0.97→1, opacity 0.6→1 over 480ms
- Total: 720ms. 240ms visual overlap.

**Accessibility:** `prefers-reduced-motion`: cross-fade only, 80ms, no transform, no overlap.

**Responsive:** Mobile overlap reduced to 120ms (performance).

**Performance:** Transforms on scene containers. `will-change: transform, opacity`. No `filter: blur()` during transition.

**Dark/Light mode:** No change.

**Variants:** None (applied automatically by Scene container).

**States:** `idle`, `transitioning`, `complete`.

---

## Layer 2: Schematic System

---

### 2.1 SystemDiagram

**Purpose:** Shared SVG system diagram (viewBox 0 0 800 440). 5 nodes + connections. Centerpiece of scenes 3 and 4.

**Interaction:** None. Single visual entity. Individual nodes NOT clickable.

**Motion:**
- Assembly: nodes appear in sequence (top → center → bottom), each 480ms, 200ms stagger
- Connections draw after all nodes assembled, 400ms each, cubic bezier
- Particles flow after all connections drawn, 1800ms per traversal
- Total assembly: ~2400ms

**Accessibility:**
- `role="img"`, `aria-label="System diagram: five connected services: landing pages, automation, custom software, SaaS products, integrations"`
- `aria-hidden="true"` when off-screen

**Responsive:** SVG scales to container width. Max 800px, min 280px. Mobile: abbreviated labels.

**Performance:** Single SVG. SVG-specific properties (stroke-dashoffset, opacity). No CSS animations on SVG elements (Safari repaint issue). `transform-origin` for scale.

**Dark mode:** Nodes `#07111F` fill, `--measure` 20% border.
**Light mode:** Nodes `#FAF8F4` fill, `--measure` 15% border.

**Variants:**
- `SystemDiagram–static`: No animation. Pre-rendered SVG for print/export.
- `SystemDiagram–compact`: viewBox 0 0 400 220, simplified connections.

**States:** `empty`, `assembling`, `assembled`, `flowing` (particles active), `receding` (Scene 5, 30% opacity).

---

### 2.2 SchematicNode

**Purpose:** One of 5 labeled modules in SystemDiagram. Represents a service category.

**Interaction:** None within diagram.

**Motion:**
- Appearance: scale 0.7→1, opacity 0→1, 480ms, spring(200, 22)
- Border draw: stroke-dashoffset 0→1, 400ms
- Idle: 2px micro-float (0→0.5px, 4s cycle, barely perceptible)
- Connection event: 0.5px border brightening

**Accessibility:** Part of SystemDiagram's single `img` role. No individual focus.

**Responsive:** Text truncates at 30 characters. Mobile: abbreviation preferred.

**Performance:** SVG element. Minimal cost.

**Dark mode:** Fill `#07111F`, border `--measure` 20%, label `--measure` 80%.
**Light mode:** Fill `#FAF8F4`, border `--measure` 15%, label `--measure` 70%.

**Variants:**
- `SchematicNode–active`: Border `--active` 100%. Scene 4.
- `SchematicNode–dimmed`: Opacity 40%. Scene 5.
- `SchematicNode–measurement`: Shows data value (see MeasurementBadge).

**States:** `dormant`, `assembling`, `assembled`, `measuring`, `receding`.

---

### 2.3 ConnectionLine

**Purpose:** Cubic bezier curve connecting two SchematicNodes. Represents relationship/data flow.

**Interaction:** None.

**Motion:**
- Draw: stroke-dashoffset, 400ms, (0.22, 1, 0.36, 1)
- Particle passage: stroke brightens 15% momentarily
- No continuous glow

**Accessibility:** `aria-hidden="true"`.

**Responsive:** Control points adjust with node positions. Tighter curves on smaller viewBox.

**Performance:** Single SVG path. Use `pathLength` for draw (more performant than stroke-dasharray).

**Dark mode:** `--active` at 60%.
**Light mode:** `--active` at 50%.

**Variants:**
- `ConnectionLine–horizontal`: Top row ↔ center.
- `ConnectionLine–vertical`: Edge connections.
- `ConnectionLine–diagonal`: Cross-system (bottom-left → top-right).

**States:** `hidden`, `drawing`, `drawn`, `flowing`.

---

### 2.4 DataParticle

**Purpose:** 2px dot traveling along a ConnectionLine. Data in transit.

**Interaction:** None.

**Motion:**
- Traversal: 1800ms, linear, along connection curve
- Opacity: 0 → 0.6 → 0 over traversal
- Size: constant 2px
- Frequency: 1/connection (Scene 3), 3–5/connection (Scene 4)

**Accessibility:** `aria-hidden="true"`. `prefers-reduced-motion`: no particles.

**Responsive:** Mobile: max 1 particle/connection. Disabled below 480px.

**Performance:** SVG `<circle>`. Position via `getPointAtLength`. Batch RAF. Max 15 particles (mobile: 5).

**Dark/Light mode:** `--active` at 60% peak. Signal variant: `--signal` at 80%.

**Variants:**
- `DataParticle–active`: Default blue.
- `DataParticle–signal`: Amber. Transient events.
- `DataParticle–error`: Red. Error demonstration only.

**States:** `spawning` (0→0.6), `traveling`, `despawning` (0.6→0 at path end).

---

### 2.5 MeasurementBadge

**Purpose:** Live metric next to a SchematicNode. 98%, 94%, 99.9%, 340, 12.

**Interaction:** None. Read-only instrument.

**Motion:**
- Appearance: scale 0.9→1, opacity 0→1, 240ms
- Value change: old fades 0→1 over 120ms, new scale 0.9→1 over 240ms (Data Pulse signature)
- Flicker: 60ms opacity pulse (1→0.7→1) on 0.1% shift

**Accessibility:** `aria-live="polite"` for changing values. Static values do not announce.

**Responsive:** 10px desktop, 9px mobile. Values may be hidden on very small viewports.

**Performance:** Text node replacement. `font-variant-numeric: tabular-nums` prevents layout shift.

**Dark mode:** `--active` at 80%.
**Light mode:** `--active` at 70%.

**Variants:**
- `MeasurementBadge–percentage`: Appends %. Geist Mono.
- `MeasurementBadge–count`: No symbol. 14px font.
- `MeasurementBadge–unit`: Custom unit (ms, req/s).

**States:** `hidden`, `appearing`, `static`, `updating`, `pulsing`.

---

### 2.6 AnchorPoint

**Purpose:** Cross marker (+) on the grid. Position where a schematic component can be placed. Scene 2.

**Interaction:** None.

**Motion:**
- Idle: 12% opacity (standby)
- Activation: 12% → 100% over 120ms (when connection reaches it)
- Lifetime: visible as long as connected node exists

**Accessibility:** `aria-hidden="true"`.

**Responsive:** Follows grid density. Hidden below 480px.

**Performance:** Single SVG path (two perpendicular lines). Minimal.

**Dark mode:** `--measure` at 12–100%.
**Light mode:** `--measure` at 10–100%.

**Variants:**
- `AnchorPoint–small`: 8px cross. Tight diagrams.
- `AnchorPoint–large`: 16px cross. Scene 2 emphasis.

**States:** `standby` (12%), `activating` (120ms), `active` (100%), `consumed` (absorbed, disappears).

---

### 2.7 DraftingBoundary

**Purpose:** 800×440px boundary box in Scene 3. Defines system scope.

**Interaction:** None.

**Motion:**
- Draw: stroke-dashoffset, 600ms, (0.22, 1, 0.36, 1)
- Hold: 1500ms full visibility
- Recede: fade to 5% over 600ms

**Accessibility:** `aria-hidden="true"`.

**Responsive:** Aspect ratio maintained. 90% viewport width on mobile.

**Performance:** SVG rect. `stroke-dasharray` + `stroke-dashoffset`.

**Dark/Light mode:** `--measure` at 10%.

**Variants:** None.

**States:** `drawing`, `visible`, `receding`, `hidden`.

---

### 2.8 FlowLane

**Purpose:** Horizontal data flow lanes in Scene 4. Short parallel lines flowing at different speeds.

**Interaction:** None.

**Motion:**
- Speeds: 1.5s, 2.0s, 2.5s per traversal
- Odd lanes: left→right, even: right→left
- Opacity: 5–15%, fade at lane boundaries
- 3–5 lines per lane

**Accessibility:** `prefers-reduced-motion`: static lines at 5%, no flow.

**Responsive:** 5 lanes (≥1024px), 3 lanes (768–1023), 0 lanes (<768, hidden).

**Performance:** CSS animation on pseudo-elements. `transform: translateX` (GPU).

**Dark mode:** `--active` at 15%.
**Light mode:** `--active` at 12%.

**Variants:**
- `FlowLane–dense`: 8 lines/lane. High activity.
- `FlowLane–sparse`: 1–2 lines/lane. Idle.

**States:** `idle`, `flowing`, `paused` (Scene 5, 30% speed).

---

### 2.9 SystemSpark

**Purpose:** 3px white point appearing randomly in Scene 4 diagram. Micro-event.

**Interaction:** None.

**Motion:**
- Appears instantly (threshold event)
- Holds 60ms
- Expands to 6px over 200ms while fading to 0%
- Min 600ms between sparks. Max 3 concurrent.

**Accessibility:** `prefers-reduced-motion`: no sparks.

**Responsive:** ≥768px only.

**Performance:** 3 max concurrent. SVG circle. Removed from DOM after animation.

**Dark/Light mode:** `--measure` at 100%.

**Variants:** None.

**States:** `firing`, `expanding`, `spent` (removed).

---

### 2.10 NodeLabel

**Purpose:** Text label within a SchematicNode. Geist Sans, uppercase, 11px, letter-spacing 0.08em.

**Interaction:** None.

**Motion:** Resolves at end of node assembly: opacity 0→1 over 100ms.

**Accessibility:** Part of SystemDiagram's `img` role. Text content in `aria-label`.

**Responsive:** Scale font: 11px (≥768px), 9px (480–767), hidden (<480).

**Performance:** SVG `<text>`. Zero overhead.

**Dark/Light mode:** `--measure` at 80% (dark) / 70% (light).

**Variants:**
- `NodeLabel–uppercase`: Standard.
- `NodeLabel–sentence`: For result panels (Scene 5).

**States:** `hidden`, `resolving`, `visible`.

---

### 2.11 SubstrateNode

**Purpose:** Background decorative nodes visible during Scene 2 network formation. Small circles (8px) at grid intersections.

**Interaction:** None.

**Motion:** Opacity pulses 5%→12%→5% on a 4s cycle. Staggered phases per node.

**Accessibility:** `aria-hidden="true"`.

**Responsive:** Shown ≥768px only.

**Performance:** CSS animation on opacity. Minimal.

**Dark/Light mode:** `--measure` at 5–12%.

**Variants:** None.

**States:** `idle`, `pulsing`.

---

## Layer 3: Interaction

---

### 3.1 CursorProbe

**Purpose:** 4px diameter circle, `--measure` at 25% opacity, filled. Follows mouse with 80ms lag. The "cursor" of the TOALESCO system.

**Interaction:** Trails mouse position. Enters magnetic fields of interactive elements. Hidden on touch devices.

**Motion:**
- Position: `pos += (target - pos) × 0.12` per frame (12% of remaining distance)
- In magnetic field (8px from element): nudged 1–3px toward element center
- On element hover: returns to normal position (magnetism stops)

**Accessibility:** `prefers-reduced-motion`: hidden entirely. Touch devices: hidden via `pointer: coarse`.

**Responsive:** Desktop only. Never shown on touch-capable devices.

**Performance:** RAF loop. No DOM writes on frames where position hasn't changed. Minimum position change threshold: 0.5px.

**Dark/Light mode:** `--measure` at 25% (dark) / 20% (light).

**Variants:** None.

**States:** `idle` (following mouse), `attracted` (in magnetic field), `hidden` (touch or reduced motion).

---

### 3.2 CursorTrail

**Purpose:** Secondary, fainter trail behind the CursorProbe. 2px diameter, `--measure` at 10% opacity, follows with 160ms lag (double the probe's lag).

**Interaction:** None. Passive visual effect.

**Motion:**
- Position: `pos += (target - pos) × 0.06` per frame (6% per frame)
- Always trails behind the probe
- Never on touch devices

**Accessibility:** Same as CursorProbe. Hidden with `prefers-reduced-motion`.

**Responsive:** Desktop only.

**Performance:** RAF. Updates only every other frame (30fps effective). Minimal.

**Dark/Light mode:** `--measure` at 10% (both modes).

**Variants:** None.

**States:** `following`, `hidden`.

---

### 3.3 MagneticField

**Purpose:** Invisible interactive zone around clickable elements. Extends 40px beyond bounding box. Triggers magnetic response.

**Interaction:** Not a visual component — a behavior controller. Attached to:
- MagneticButton
- MagneticInput
- SceneNavbar items
- ResultPanel (in Scene 5)

**Motion:** No visual output. Controls CursorProbe nudge and element's attended state (border shift).

**Accessibility:** Does not affect actual element hit area. Only visual cursor position is nudged. Actual `hover` and `click` events use the real DOM bounds.

**Responsive:** 40px on desktop. 16px on touch (finger width compensation).

**Performance:** Zero cost. Mathematical calculation only. No DOM interaction.

**Dark/Light mode:** No change.

**Variants:** None.

**States:** `inactive` (cursor > 40px), `attending` (20–40px), `approaching` (8–20px), `engaged` (< 8px).

---

### 3.4 MagneticButton

**Purpose:** Primary interactive button. Used for "Contacto" CTA, form submission, nav actions.

**Interaction:**
- Hover: border `--boundary` → `--signal-dim`. Text `--measure` → `--signal-dim`. 120ms.
- Press: scale 1→0.97. Border `--signal`. 120ms release.
- Magnetic field: 40px. Dot nudge at 8px.
- Click: scale return 0.97→1 over 120ms. Border returns to idle.

**Motion:** `spring(300, 15)` for press/release. Scale only, no Y translation on press.

**Accessibility:**
- `role="button"`, `tabindex="0"`
- Focus: 2px ring, `--signal`, offset 2px
- Keyboard: Enter/Space to activate

**Responsive:** Min 44×44px touch target. Padding adjusts to maintain size across breakpoints.

**Performance:** `transform: scale()` only (GPU). No layout triggers.

**Dark mode:** Border `--boundary` (idle), `--signal-dim` (hover), `--signal` (press). Text `--measure` 70%.
**Light mode:** Border `--measure` 30% (idle). Text `--measure` 60%.

**Variants:**
- `MagneticButton–primary`: Full background `--substrate-dim`.
- `MagneticButton–ghost`: No background, border only.
- `MagneticButton–icon`: Icon only, 44×44px.

**States:** `idle`, `hover` (attended), `active` (pressed), `focus`, `disabled` (opacity 30%), `loading`.

---

### 3.5 MagneticInput

**Purpose:** Text input styled as a schematic measurement field. Used in ContactForm.

**Interaction:**
- Idle: 1px border `--boundary`, no fill
- Focus: border `--active` at 60%. Single 2px bottom accent line.
- Hover: border `--signal-dim`
- Magnetic field: 40px, no cursor nudge (inputs need precise cursor positioning)

**Motion:**
- Focus accent draw: width 0→100% over 240ms, (0.22, 1, 0.36, 1)
- Border color: 120ms transitions

**Accessibility:**
- `role="textbox"`, proper `<label>` association
- Focus ring: 2px, `--active`, offset 2px
- Error: `aria-invalid="true"`, `aria-describedby` for error message

**Responsive:** Min touch area 44px height. Full width on mobile.

**Performance:** `border-color` transition. Zero compositing cost.

**Dark mode:** Text `--measure` 80%, placeholder `--measure` 30%. Border `--boundary`.
**Light mode:** Text `--measure` 70%, placeholder `--measure` 25%. Border `--measure` 12%.

**Variants:**
- `MagneticInput–textarea`: Same treatment, min-height 120px.
- `MagneticInput–search`: Rounded treatment (3px radius).

**States:** `idle`, `hover`, `focus`, `filled`, `error` (border `--error`, no shake), `disabled` (30% opacity).

---

### 3.6 Pressable

**Purpose:** Base interaction primitive. Provides press behavior without visual styling. Used by SchematicNode (if interactive) and ResultPanel.

**Interaction:**
- Press: scale 1→0.97, 120ms
- Release: 0.97→1, 120ms
- No hover treatment (handled by parent MagneticField)

**Motion:** `spring(300, 15)`.

**Accessibility:** Keyboard + screen reader support via `role="button"`.

**Responsive:** Touch highlight on mobile via `-webkit-tap-highlight-color`.

**Performance:** `transform: scale()`. Zero layout cost.

**Dark/Light mode:** No change.

**Variants:** None (abstract).

**States:** `idle`, `pressed`.

---

### 3.7 FocusRing

**Purpose:** Reusable focus indicator. 2px solid ring, offset 2px from element edge.

**Interaction:** Only visible during keyboard navigation (not mouse click).

**Motion:** Opacity 0→1 over 120ms on focus, 1→0 over 240ms on blur.

**Accessibility:** Required for all interactive elements. Never removed or modified.

**Responsive:** Ring scales with element size. Offset fixed at 2px.

**Performance:** `outline` property (no layout shift). If `outline` conflicts with border-radius, use `box-shadow` with 0 spread.

**Dark mode:** `--signal` at 80%.
**Light mode:** `--active` at 70%.

**Variants:**
- `FocusRing–error`: `--error` color. For error state focus.
- `FocusRing–inset`: Inside element bounds. For inputs.

**States:** `hidden`, `visible`.

---

## Layer 4: Feedback

---

### 4.1 ErrorPulse

**Purpose:** Error state visual feedback. Alert + pulse + dwell.

**Interaction:** None.

**Motion:**
- Alert (0ms): border shifts to `--error` instantly
- Pulse (500ms on, 2000ms off): scale 1→1.3→1 at 0.5s, holds 1 for 2s
- Dwell: until user interacts or 8000ms passes
- Resolution: border fades `--error` → `--boundary` over 480ms

**Accessibility:** `role="alert"`. `aria-live="assertive"`. Never solely color-dependent — include icon or text.

**Responsive:** Identical across breakpoints.

**Performance:** CSS animation. Single element transform/opacity.

**Dark mode:** Border `--error` at 100%.
**Light mode:** Border `--error` at 80%.

**Variants:**
- `ErrorPulse–field`: Single pulse, resolves on input change.
- `ErrorPulse–system`: Continuous until acknowledged.

**States:** `idle`, `alerting`, `pulsing`, `dwelling`, `resolving`.

---

### 4.2 SuccessAck

**Purpose:** Success acknowledgment. Quiet single pulse.

**Interaction:** None.

**Motion:**
- Completion (0ms): data value shifts to `--active`
- Pulse (240ms): scale 1→1.05→1, single cycle
- Settle (480ms): value persists or returns to `--measure`

**Accessibility:** `aria-live="polite"`. Success is announced if in context of a form submission.

**Responsive:** Identical.

**Performance:** Single transform. Zero cost.

**Dark mode:** `--active` at 100% during pulse.
**Light mode:** `--active` at 80% during pulse.

**Variants:** None.

**States:** `idle`, `acknowledging`, `settled`.

---

### 4.3 LoadingIndicator

**Purpose:** Schematic-style loading indicator. Not a spinner — a data flow indication.

**Interaction:** None.

**Motion:**
- 3 parallel lines at 8px length, 1px stroke, `--active`
- Lane 1: flows left→right, 1s traversal
- Lane 2: flows right→left, 1.5s traversal
- Lane 3: flows left→right, 2s traversal
- Lines fade in/out at lane edges

**Accessibility:** `role="status"`, `aria-label="Loading"`. `prefers-reduced-motion`: static `--active` dot.

**Responsive:** 60×20px size. Scales down to 40×14px on mobile.

**Performance:** CSS animation on pseudo-elements. GPU-composited.

**Dark/Light mode:** `--active` at 60%.

**Variants:**
- `LoadingIndicator–inline`: 40×14px. For buttons.
- `LoadingIndicator–block`: 80×30px. For content areas.

**States:** `loading`, `complete` (fades out over 200ms).

---

### 4.4 StatusDot

**Purpose:** Small indicator showing system/business/component status.

**Interaction:** None.

**Motion:**
- Online: `--active`, steady
- Active: `--active`, pulse 2s cycle
- Warning: `--signal`, pulse 1s cycle
- Error: `--error`, pulse 0.5s cycle
- Offline: `--measure` at 20%, steady

**Accessibility:** `aria-live="polite"`. Text label required alongside dot.

**Responsive:** 8px diameter desktop, 6px mobile.

**Performance:** CSS animation.

**Dark/Light mode:** Colors unchanged.

**Variants:**
- `StatusDot–online`: Steady blue.
- `StatusDot–active`: Pulsing blue.
- `StatusDot–warning`: Pulsing amber.
- `StatusDot–error`: Pulsing red.
- `StatusDot–offline`: Dim gray.

**States:** Per variant name.

---

### 4.5 Toast

**Purpose:** Brief system notification. Appears at top-right, auto-dismisses.

**Interaction:** None. Auto-dismiss. Not manually closable.

**Motion:**
- Enter: translateY -20→0, opacity 0→1, 240ms, (0.22, 1, 0.36, 1)
- Hold: 3000ms
- Exit: translateY 0→-10, opacity 1→0, 240ms, ease-in

**Accessibility:** `role="status"`, `aria-live="polite"`. Auto-dismiss waits for screen reader to finish announcement (5000ms if content long).

**Responsive:** Top-right on ≥768px. Top-center, full width on <768px.

**Performance:** Transform + opacity. `will-change: transform, opacity` during animation.

**Dark mode:** Background `--substrate-dim`, border `--boundary`.
**Light mode:** Background white, border `--measure` 12%.

**Variants:**
- `Toast–success`: `--active` left accent bar.
- `Toast–error`: `--error` left accent bar.
- `Toast–info`: `--measure` left accent bar.

**States:** `entering`, `visible`, `exiting`, `hidden`.

---

## Layer 5: Content

---

### 5.1 ResultPanel

**Purpose:** Project result card in Scene 5. Shows business name, description, testimonial.

**Interaction:**
- Hover: border `--boundary` → `--signal-dim`. Panel rises 2px. 240ms.
- Click: navigates to project detail (future).
- Magnetic field: 40px, dot nudge at 8px.

**Motion:**
- Mount: rises from below viewport, 600ms, (0.22, 1, 0.36, 1)
- Hover: translateY -2px, border brighten, 240ms

**Accessibility:**
- `role="article"`, `aria-label="{business name}"`
- Keyboard focusable
- Focus ring: 2px `--active`

**Responsive:**
- ≥768px: 320px width, 40px gap, side-by-side
- <768px: full width, stacked, 24px gap

**Performance:** `transform: translateY` for hover. No layout thrashing.

**Dark mode:** Border `--measure` at 12%.
**Light mode:** Border `--measure` at 10%.

**Variants:** None (use content slots).

**States:** `idle`, `hover`, `focus`, `hidden` (off-screen).

---

### 5.2 TestimonialQuote

**Purpose:** Single-line testimonial within a ResultPanel.

**Interaction:** None.

**Motion:** Appears with parent panel (600ms).

**Accessibility:** Part of parent `article`. Not focused individually.

**Responsive:** Font size 13px (desktop), 12px (mobile). Ellipsis after 60 characters.

**Performance:** Text node. Zero cost.

**Dark mode:** `--measure` at 60%, italic.
**Light mode:** `--measure` at 55%, italic.

**Variants:** None.

**States:** `hidden`, `visible`.

---

### 5.3 SectionTitle

**Purpose:** Scene title text ("Una idea.", "Se expande.", "Toma forma.", "Cobra vida.", "Resultados.").

**Interaction:** None.

**Motion:**
- Appears: opacity 0→1 over 400ms, no transform
- Position varies per scene: bottom-center (Scene 1), top-left (Scene 2), bottom-right (Scene 3), top-center (Scene 4), hidden (Scene 5)

**Accessibility:** `role="heading"`, `aria-level="1"`. Visible text is sufficient.

**Responsive:** Fluid sizing: 3.5vw desktop, 5vw mobile.

**Performance:** Opacity transition. Zero cost.

**Dark/Light mode:** `--measure` at 80% (dark) / 70% (light).

**Variants:** None (unique per scene).

**States:** `hidden`, `visible`.

---

### 5.4 StatBlock

**Purpose:** Group of statistics. Used in interior pages (proyectos).

**Interaction:** None.

**Motion:** Staggered entry: each stat appears 80ms after the previous, 240ms each.

**Accessibility:** Each stat has `aria-label` describing the metric.

**Responsive:** 4-column grid (≥1024px), 2-column (768–1023), 1-column (<768).

**Performance:** Opacity + transform per stat. Minimal.

**Dark mode:** Value `--measure` 100%, label `--measure` 50%.
**Light mode:** Value `--measure` 90%, label `--measure` 45%.

**Variants:** None.

**States:** `hidden`, `visible`.

---

### 5.5 Divider

**Purpose:** Schematic-style horizontal divider. Thin line with measurement marks at endpoints.

**Interaction:** None.

**Motion:** Draws from center outward: width 0→100% over 400ms.

**Accessibility:** `role="separator"`, `aria-hidden="true"`.

**Responsive:** Full width on all breakpoints.

**Performance:** `transform: scaleX(0→1)`. Zero cost.

**Dark mode:** `--measure` at 15%.
**Light mode:** `--measure` at 12%.

**Variants:**
- `Divider–with-label`: Center label between two line segments.
- `Divider–thin`: 0.5px stroke. For secondary sections.

**States:** `hidden`, `drawing`, `visible`.

---

## Layer 6: Form System

---

### 6.1 ContactForm

**Purpose:** 3-field contact form. Minimal — name, business name, message.

**Interaction:**
- Fields: use MagneticInput behavior
- Submit: button compresses (0.97), text → checkmark, 480ms
- No loading bar. No spinner. No "Sending..."
- Success: inline message, no redirect

**Motion:**
- Field focus: accent line draws left→right, 240ms
- Submit transition: button scale 0.97, text swap 120ms, checkmark draw 360ms
- Success message: opacity 0→1, 240ms

**Accessibility:**
- All fields have `<label>`
- Error messages: `aria-describedby`
- Submit: `type="submit"`, native form validation

**Responsive:** Single column on all breakpoints. Full width inputs.

**Performance:** No external form library. Vanilla submit handler.

**Dark/Light mode:** Per MagneticInput spec.

**Variants:** None.

**States:** `idle`, `filling`, `submitting`, `success`, `error`.

---

### 6.2 FormGroup

**Purpose:** Groups a label, input, and error message into a single vertical unit.

**Interaction:** None (wrapper).

**Motion:** Error message slides down (max-height 0→40px, 240ms).

**Accessibility:** `aria-describedby` connects error to input.

**Responsive:** Full width.

**Performance:** `max-height` transition for error. Or `grid-template-rows` transition.

**Dark/Light mode:** Labels `--measure` at 60%.

**Variants:** None.

**States:** `idle`, `error` (expanded error message), `success`.

---

### 6.3 FormError

**Purpose:** Inline error message below an input.

**Interaction:** None.

**Motion:**
- Appear: max-height 0→40px, opacity 0→1, 240ms
- Disappear: reverse, 240ms

**Accessibility:** `role="alert"`. Connected to input via `aria-describedby`.

**Responsive:** Full width.

**Performance:** `max-height` or `grid-template-rows` transition.

**Dark mode:** Text `--error`, 12px.
**Light mode:** Text `--error`, 12px.

**Variants:** None.

**States:** `hidden`, `visible`.

---

### 6.4 PrivacyNotice

**Purpose:** "Tus datos están seguros." reassurance line, not a legal document.

**Interaction:** Optional link to privacy page.

**Motion:** None.

**Accessibility:** Part of form's accessible description.

**Responsive:** 12px, centered below submit.

**Performance:** Text node.

**Dark/Light mode:** `--measure` at 30%.

**Variants:** None.

**States:** None.

---

## Layer 7: Data Display

---

### 7.1 DataTable

**Purpose:** Minimal measurement-style table. No borders between rows. Alternating substrate tint.

**Interaction:** Row hover: background shift, 120ms. Not clickable.

**Motion:** Rows enter staggered at 80ms intervals, 240ms each.

**Accessibility:** `<table>` with `<thead>`, `<th>`, proper `scope`. `aria-sort` on sortable columns.

**Responsive:** Horizontal scroll on <768px. First column sticky.

**Performance:** Background-color transitions. Zero compositing.

**Dark mode:** Row hover: `--substrate-dim` 8%.
**Light mode:** Row hover: `--measure` 3%.

**Variants:** None.

**States:** Row: `idle`, `hover`.

---

### 7.2 MetricCard

**Purpose:** Single KPI display. Large value, small label, optional trend.

**Interaction:** None.

**Motion:** Value assembles with Data Pulse signature on mount.

**Accessibility:** `aria-label="{value} {label}"`.

**Responsive:** Value: 2.5vw fluid (min 24px, max 48px). Label: 11px.

**Performance:** Geist Mono for value prevents layout shift.

**Dark mode:** Value `--measure` 100%, label `--measure` 50%.
**Light mode:** Value `--measure` 90%, label `--measure` 45%.

**Variants:**
- `MetricCard–trend-up`: `--active` arrow.
- `MetricCard–trend-down`: `--error` arrow.

**States:** `hidden`, `visible`, `updating`.

---

### 7.3 ProgressBar

**Purpose:** Schematic progress bar. Thin (4px), no rounding, measurement marks at 25% intervals.

**Interaction:** None.

**Motion:** Fill animates width 0→target over 600ms, (0.22, 1, 0.36, 1).

**Accessibility:** `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.

**Responsive:** Full width.

**Performance:** `transform: scaleX()` for fill. GPU-composited.

**Dark mode:** Background `--boundary`, fill `--active`.
**Light mode:** Background `--measure` 12%, fill `--active`.

**Variants:**
- `ProgressBar–indeterminate`: Stripe animation (no value).

**States:** `idle`, `filling`, `complete`, `indeterminate`.

---

### 7.4 Timeline

**Purpose:** Vertical timeline for project process/history. Line + dots + content.

**Interaction:** None.

**Motion:** Line draws top→bottom on viewport entry, 600ms. Dots appear as line passes them.

**Accessibility:** `role="list"`. Each item `role="listitem"`.

**Responsive:** Single column. Dot on left, content on right.

**Performance:** SVG line or pseudo-element. Minimal.

**Dark mode:** Line `--measure` 15%, dots `--active`.
**Light mode:** Line `--measure` 12%, dots `--active`.

**Variants:** None.

**States:** Item: `pending`, `active`, `completed`.

---

## Layer 8: Navigation (Supplemental)

---

### 8.1 Breadcrumb

**Purpose:** Page hierarchy indicator. Used on subpages (proyectos, privacidad, demo).

**Interaction:** Clickable segments. Last segment visible but not clickable (current page).

**Motion:** Segment separator (/) draws on mount, 200ms each.

**Accessibility:** `role="navigation"`, `aria-label="Breadcrumb"`. `aria-current="page"` on current.

**Responsive:** Hidden at <768px. Use SceneNavbar instead.

**Performance:** Text + inline elements. Zero cost.

**Dark mode:** Text `--measure` 50%, current `--measure` 80%.
**Light mode:** Text `--measure` 45%, current `--measure` 70%.

**Variants:** None.

**States:** Segment: `link`, `current`.

---

### 8.2 Pagination

**Purpose:** Page-to-page navigation for content lists (proyectos listing).

**Interaction:** Click to navigate. Previous/next arrows + page numbers.

**Motion:** Page transition: content cross-fade 240ms.

**Accessibility:** `role="navigation"`, `aria-label="Pagination"`. `aria-current="page"`.

**Responsive:** Full list on ≥768px. Previous/next only on <768px.

**Performance:** No view transition API (Safari). Use opacity + transform.

**Dark/Light mode:** Numbers `--measure` 50%, active `--active`.

**Variants:** None.

**States:** Page: `idle`, `hover`, `active`, `disabled` (prev on first page).

---

## Summary

**41 components** across 9 layers:

| Layer | Count | Components |
|-------|-------|------------|
| 0 — Substrate | 4 | BlueprintGrid, SchematicFrame, Surface, Container |
| 1 — Scene System | 6 | Scene, SceneNavbar, LayerIndicator, ScrollIndicator, ParallaxLayer, SceneTransition |
| 2 — Schematic System | 11 | SystemDiagram, SchematicNode, ConnectionLine, DataParticle, MeasurementBadge, AnchorPoint, DraftingBoundary, FlowLane, SystemSpark, NodeLabel, SubstrateNode |
| 3 — Interaction | 7 | CursorProbe, CursorTrail, MagneticField, MagneticButton, MagneticInput, Pressable, FocusRing |
| 4 — Feedback | 5 | ErrorPulse, SuccessAck, LoadingIndicator, StatusDot, Toast |
| 5 — Content | 5 | ResultPanel, TestimonialQuote, SectionTitle, StatBlock, Divider |
| 6 — Form | 4 | ContactForm, FormGroup, FormError, PrivacyNotice |
| 7 — Data | 4 | DataTable, MetricCard, ProgressBar, Timeline |
| 8 — Navigation | 2 | Breadcrumb, Pagination |

**Total: 41 components.**
