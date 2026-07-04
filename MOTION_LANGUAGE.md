# TOALESCO Motion Language — Physics v1.0

> **The laws of motion for a digital engineering universe.**
>
> Every pixel that moves does so because a physical law demands it. There is no "animation." There is only the system responding to forces.

---

## Part I: The Physics Model

### 1.1 The Universe

TOALESCO's digital space is not empty. It is filled with a **dense, frictionless medium** — like an engineering fluid that resists sudden movement but yields to sustained force.

Objects in this medium have three physical properties:

| Property | Symbol | Description |
|----------|--------|-------------|
| **Mass** | `m` | How much "material" the object contains. Directly proportional to its pixel area. |
| **Elasticity** | `k` | How much the object deforms under force. UI elements are rigid (`k=1`). System nodes are slightly elastic (`k=0.85`). Data particles are highly elastic (`k=0.3`). |
| **Conductivity** | `c` | How readily the object transmits force to connected objects. Nodes connected by lines have high conductivity. Disconnected objects have zero. |

### 1.2 The Three Forces

Only three forces can act on an object:

| Force | Origin | Behavior |
|-------|--------|----------|
| **Assembly Force** `Fa` | The system itself (page load, viewport entry, state initialization) | Applies a positive impulse that moves the object from dormancy to its schematic position |
| **User Force** `Fu` | Human interaction (cursor, touch, scroll) | Applies variable pressure proportional to input velocity and proximity |
| **Connection Force** `Fc` | Other nodes in the schematic (data flow, state propagation) | Transfers energy along connection lines at a fixed velocity |

### 1.3 The First Law — Inertia

> **An object at rest remains at rest unless acted upon by Assembly or User Force. An object in motion remains in motion until Connection Force or medium friction returns it to rest.**

This means:
- Nothing moves without a cause
- Nothing stops instantly unless it hits a boundary
- The medium's friction is not zero — every oscillation decays

### 1.4 The Second Law — Proportional Response

> **The acceleration of an object is proportional to the force applied and inversely proportional to its mass.**

`a = F / m`

In practice:
- A large module (high mass) moves slower than a small data particle under the same force
- A user's rapid cursor movement (high Fu) produces faster object response than slow movement
- The force required to move a section into view is constant — but the resulting velocity depends on the section's content density

### 1.5 The Third Law — Connection Transfer

> **For every action on a connected pair, an equal reaction transfers through the connection.**

When one node in a schematic receives Assembly Force (enters view), a portion of that force transfers to its connected nodes — proportional to the connection's conductivity. This is why connected nodes appear to "ripple" into view in sequence, even though each node's trigger is independent.

---

## Part II: The Easing System

### 2.1 Easing Is Not Style. Easing Is Material.

There is no "default ease." Every easing curve corresponds to a physical material property.

| Easing | Cubic Bezier | Material Analog | Used For |
|--------|-------------|-----------------|----------|
| **Rigid Assembly** | `(0.22, 1, 0.36, 1)` | Steel spring in engineering fluid | Nodes entering, sections appearing, layout shifts |
| **Elastic Deformation** | Spring(stiffness=200, damping=22) | Rubber membrane returning to shape | Buttons pressing, toggles switching |
| **Fluid Flow** | `linear` | Data through a pipe | Particles along paths, progress indication |
| **Magnetic Attraction** | `(0.34, 1.56, 0.64, 1)` | Ferrous object pulling toward magnet | Cursor magnetism, hover snap |
| **Overshoot** | Spring(stiffness=300, damping=15) | Spring released past equilibrium | Emphasis animations, attention calls |
| **Decay** | `(0, 0, 0.2, 1)` | Object settling in fluid after disturbance | Oscillation damping, error state fading |

### 2.2 The Easing Hierarchy

Easing curves nest. A child element's ease is derived from its parent's ease, shifted by one level:

```
Section enters (Rigid Assembly, 0.5s)
  └─ Modules within section (Rigid Assembly, 0.4s, delayed)
       └─ Data within module (Rigid Assembly, 0.3s, delayed)
            └─ Value change (Fluid Flow, 0.2s)
```

The parent establishes the material context. Children inherit the material but execute faster because they have less distance to travel.

---

## Part III: Timing

### 3.1 The Tempo

The system operates on a **480ms beat** (the average human reaction time to visual change).

All durations are fractions or multiples of this beat:

| Duration | Musical Equivalent | Use |
|----------|-------------------|-----|
| 60ms | 1/8 beat | Cursor magnetism, micro-feedback |
| 120ms | 1/4 beat | Hover state transition, attended indication |
| 240ms | 1/2 beat | Focus ring, press state, error blink |
| **480ms** | **1 beat** | State transition, layout shift, data update |
| 720ms | 1.5 beats | Module entrance with delay group |
| 960ms | 2 beats | Section entrance, system diagram assembly |
| 1920ms | 4 beats | Data particle path traversal |
| 3840ms | 8 beats | Ambient pulse cycle (status indicators) |

### 3.2 The Delay Spacing

When multiple objects must enter sequentially (a group of nodes, a list of modules), the delay between each object is exactly **80ms**.

80ms is the minimum time for the human visual system to register one event as separate from the previous. Below 80ms, objects appear to enter simultaneously. Above 80ms, the entrance feels staggered rather than wave-like.

The total group entrance time must not exceed 960ms (2 beats). Therefore, maximum objects in a staggered group: `960 / 80 = 12`.

### 3.3 The Variance Rule

No two identical components in the same viewport may have identical animation delay, duration, or path unless they are designed to appear as a single unit.

This prevents the "robotic synchronization" effect where identical elements move in perfect lockstep. A variance of ±10ms on duration and ±5ms on delay is automatically added to each component in a group.

---

## Part IV: Assembly Physics

### 4.1 How Objects Appear

Objects enter the schematic through **Assembly**.

Assembly is a three-phase process:

```
Phase 1 — Materialization (0ms – 180ms)
  The object's bounding box establishes itself in the layout.
  No visible content. No background. The space is reserved.
  
Phase 2 — Surface Formation (180ms – 480ms)
  The background fills (opacity 0→1, scale 0.7→1).
  The border draws (pathLength 0→1, or instant opacity for rects).
  The object's mass becomes present in the layout.
  
Phase 3 — Content Resolution (480ms – 720ms)
  Internal content fades in (opacity 0→1, y: 4→0).
  Data values populate.
  The object is fully assembled and interactive.
```

#### Assembly Variants

| Variant | Scale In | Opacity | Duration | Use |
|---------|----------|---------|----------|-----|
| **Node** | 0.7 → 1 | 0 → 1 | 480ms | System diagram modules |
| **Section** | 1.0 (no scale) | 0 → 1 | 480ms | Full viewport scenes |
| **Data** | 0.9 → 1 | 0 → 1 | 240ms | Individual data values |
| **Particle** | 0 → 1 | 0 → 0.8 → 0 | 1920ms | Data flow indicators |

#### Prohibited Assembly

- **No slide-in from edges.** Objects do not enter from outside the viewport. They assemble in place. Sliding implies the object existed elsewhere, violating the schematic's self-contained nature.
- **No fade-only appearance.** Opacity alone is too ambiguous — the user cannot tell if the object is assembling or if the system is glitching. Scale must always accompany opacity during assembly.
- **No blur-in.** Blur during assembly implies the object is coming into focus, not coming into existence. Blur is reserved for depth cues (Part VIII).

### 4.2 How Objects Disappear

Objects disassemble through **Collapse** — the exact reverse of Assembly, but compressed in time.

```
Collapse duration: 240ms (half of Assembly)
Scale: 1 → 0.7
Opacity: 1 → 0
```

Collapse is faster than Assembly because the system should remove visual information quickly once it is no longer needed.

Objects that are leaving the viewport (scrolling away) do not collapse. They simply scroll out with the page. Collapse is only for state-driven removal (modal closing, item deleting, tab switching).

### 4.3 How Objects Connect

When two nodes become connected in the schematic, the connection draws using **pathLength** animation.

```
Connection Draw:
  Duration: 600ms
  Easing: (0.22, 1, 0.36, 1)
  pathLength: 0 → 1
  Delay: 200ms after both nodes are fully assembled
```

The connection does not appear instantly because the user must first register the two nodes as separate objects before understanding their relationship.

When data begins to flow through an established connection, a **Flow Particle** activates:

```
Flow Particle:
  Duration: 1800ms per traversal
  Easing: linear
  Repeat: infinite (only while data is flowing)
  Opacity: 0 → 0.6 → 0
  Size: 2px diameter
  Path: follows the connection curve exactly
```

### 4.4 How Objects Separate

When a connection is removed (nodes become unrelated), the connection line fades out over 240ms (1/2 beat). The line does not retract — it simply dissolves. Retracting would imply the connection was physically withdrawn, which contradicts the schematic metaphor (the connection was always a representation of relationship, not a physical cable).

---

## Part V: Scroll Physics

### 5.1 Scroll Is Navigation Through Depth

Scrolling does not move content up. Scrolling moves the user **down through layers of the schematic**.

The feeling should be: the user is descending through a vertical factory, each floor of which contains a different part of the system.

### 5.2 Scene Scroll (snap)

In scene-based layouts:

| Property | Value |
|----------|-------|
| Snap type | `y mandatory` |
| Snap alignment | `start` |
| Transition between scenes | 480ms ease (0.22, 1, 0.36, 1) |
| Overscroll behavior | `contain` (no bounce at boundaries) |

The scroll itself is not animated — the browser's native scroll handles the snap. The **content within each scene** animates based on intersection with the viewport.

### 5.3 Continuous Scroll (page)

In page-based layouts:

| Property | Value |
|----------|-------|
| Scroll behavior | `smooth` |
| Scroll duration | Proportional to distance, min 240ms, max 960ms |
| Smooth scroll easing | (0.22, 1, 0.36, 1) |
| Momentum | Browser native (no custom momentum) |

Anchor link scrolling uses the same duration formula: `distance × 0.5ms` (a 2000px scroll takes 1000ms).

### 5.4 Progress Indication

When the user is scrolling, the **Layer Indicator** (right-side dots in scene mode) updates with:

- Active dot: 6px diameter, `--active`, subtle pulse (2s cycle)
- Previous dots: 4px diameter, `--measure-secondary` at 50% opacity
- Next dots: 4px diameter, `--measure-secondary` at 25% opacity
- Vertical connecting line: height stretches to connect all dots

The indicator updates at 60fps during scroll and stabilizes within 80ms after scroll ends.

---

## Part VI: Interaction Physics

### 6.1 Mouse Interaction

#### 6.1.1 The Probe

The cursor is a 4px diameter circle, `--active` at 25% opacity, filled. It trails the mouse position by 80ms (lag). This is not a performance issue — it is intentional. The lag communicates that the cursor has mass and the medium has friction.

**Trail formula:** `position += (target - position) × 0.12` (12% of the distance per frame).

#### 6.1.2 Magnetic Attraction

Interactive elements (buttons, inputs, links) have a **magnetic field** that extends 40px beyond their bounding box in all directions.

When the cursor enters a magnetic field:

| Distance from element edge | Effect |
|---------------------------|--------|
| 40px – 20px | No visible effect. System is preparing. |
| 20px – 8px | Element's border shifts from `--boundary` to `--signal-dim`. This is the "attended" state. |
| 8px – 0px | Cursor's position is nudged toward the element's center by `1 + (1 - distance/8) × 2` pixels. The user feels a subtle pull. |
| 0px (hover) | Element enters hover state. Cursor returns to normal position. |

The magnetic nudge is applied to the cursor's visual position only — the actual DOM element detecting hover is unchanged. This prevents accessibility issues.

**Magnetic nudge formula:** `nudge = 1 + (1 - distance/8) × 2` pixels toward element center. Applied only when distance < 8px.

#### 6.1.3 Click Response

| Phase | Duration | Effect |
|-------|----------|--------|
| Mousedown | 0ms | scale: 1 → 0.97 (spring 300, 15) |
| Between | ~100ms (typical click) | Hold at 0.97 |
| Mouseup | 120ms | scale: 0.97 → 1 (spring 300, 15) |

The press scale (0.97) is not arbitrary. It corresponds to the object compressing by exactly 3% — the elastic deformation of a rigid object under human force.

### 6.2 Touch Interaction

#### 6.2.1 Touch Is Force

On touch devices, the cursor is absent. The Probe does not render.

Touch interaction follows the same magnetic model, but magnetism activates only when the finger is within 16px of an interactive element (half the desktop range, compensating for finger width).

#### 6.2.2 Touch Feedback

On touch start (`touchstart`):

| Phase | Duration | Effect |
|-------|----------|--------|
| Contact | 0ms | Element border shifts to `--signal` |
| Hold (>200ms) | 200ms+ | Background shifts to `--signal-dim` |
| Release | 120ms | Both return to idle |

### 6.3 Momentum and Inertia

#### 6.3.1 Scroll Momentum

Scroll momentum is handled by the browser natively. No custom momentum implementation.

However, when scroll triggers an intersection-based animation, the animation does not wait for scroll to finish. It activates as soon as the intersection threshold is crossed, even if the user is mid-scroll. This means animations can begin while the user is still moving — creating a fluid, anticipatory feel.

#### 6.3.2 Drag Momentum

Draggable elements (sliders, handles, sortable lists) follow this deceleration curve when released:

```
Velocity at release: V (px/ms)
Deceleration: V × 0.92 per frame (8% friction per frame)
Minimum velocity threshold: 0.5px/ms (below this, snap to nearest valid position)
Maximum drag distance: 400px
```

The deceleration (0.92 per frame) is calibrated to feel like dragging through the engineering fluid — enough friction to stop within 400ms from a typical flick, but not so much that it feels sticky.

---

## Part VII: Feedback Physics

### 7.1 Hover Is Not a State. Hover Is a Conversation.

Every hoverable element has three conversational tiers:

| Tier | Trigger | Response | Duration |
|------|---------|----------|----------|
| **Acknowledgement** | Cursor enters 20px zone | Border shifts to `--signal-dim`, 1px. The element says "I see you." | 120ms |
| **Readiness** | Cursor on element | Border fully shifts to `--signal-dim`. Icon shifts 1px up (if present). The element says "I'm ready." | 240ms |
| **Commitment** | Cursor presses | Scale 0.97, `--signal` border. The element says "Done." | 120ms |

Each tier feeds into the next. The user never experiences a sudden jump from "nothing" to "pressed."

### 7.2 Error Feedback

When an error occurs:

| Phase | Duration | Effect |
|-------|----------|--------|
| **Alert** | 0ms | Affected component's border shifts to `--error` instantly (not animated — errors are urgent) |
| **Pulse** | 500ms on, 2000ms off | Error dot pulses: scale 1→1.3→1 at 0.5s, then holds at 1 for 2s |
| **Dwell** | Until user interacts or 8000ms | Border remains `--error`. Error message visible. |
| **Resolution** | 480ms when resolved | Border fades from `--error` to `--boundary`. Error message fades out. |

The error pulse is asymmetric (fast on, slow off) because errors demand attention but should not create anxiety through rapid oscillation.

### 7.3 Success Feedback

Success is **quiet**.

| Phase | Duration | Effect |
|-------|----------|--------|
| **Completion** | 0ms | Data value shifts to `--active` (if it wasn't already) |
| **Acknowledgment** | 240ms | A single scale pulse on the affected data: scale 1→1.05→1 at 0.24s |
| **Settle** | 480ms | Data returns to `--measure` if it was a transient update, or stays `--active` if it's a persistent live value |

Success does not demand attention. A subtle pulse is sufficient.

---

## Part VIII: Depth and Space

### 8.1 Depth Is Defined by Motion, Not Shadows

TOALESCO has no shadows. Depth is communicated through **parallax velocity differential** — objects at different "depths" move at different speeds during scroll.

```
┌─────────────────────────────────┐
│   Layer -1 (substrate grid)     │  Scroll speed: 20% of scroll
│     Moves slowest — farthest    │
├─────────────────────────────────┤
│   Layer 0 (background nodes)    │  Scroll speed: 50% of scroll
│     Medium depth                │
├─────────────────────────────────┤
│   Layer 1 (content, modules)    │  Scroll speed: 100% of scroll
│     User's current focus        │
├─────────────────────────────────┤
│   Layer 2 (probe, indicators)   │  Scroll speed: 120% of scroll
│     Closest to user             │
└─────────────────────────────────┘
```

The differential is subtle — never more than 30% difference between adjacent layers. The user should feel depth without being consciously aware of parallax.

### 8.2 3D Transformations

3D transforms are allowed only for **system diagram perspective shifts** — never for decorative "tilting."

| Transform | When Used | Range | Duration |
|-----------|-----------|-------|----------|
| Perspective | System diagram in scene | `perspective(800px)` constant | Static (not animated) |
| rotateX | Diagram responding to scroll | 0° → 5° across scene | Scroll-linked |
| rotateY | Diagram responding to scroll | 0° → -3° across scene | Scroll-linked |
| translateZ | Scene entrance emphasis | 0px → 20px on assembly | 480ms |

**3D transform rules:**
- `perspective` must be set on the parent container, not the animated element
- Only `rotateX` and `rotateY` may animate (no `rotateZ` — that's a tilt, not a perspective shift)
- Maximum rotation: 8° on any axis (beyond that, legibility degrades)
- 3D is always applied to the system diagram as a whole, never to individual nodes

### 8.3 Blur

Blur has exactly one purpose: **defocusing inactive content**.

When a modal opens:
- The modal itself has 0 blur (crisp, active)
- Content behind the modal receives `blur(2px)` with `opacity(0.6)` transitioned over 240ms
- When the modal closes, blur and opacity return to 0 over 240ms

Blur is never used for:
- Entrance effects (no blur-in during assembly)
- Glass effects (blur + transparency implies glass, which is not a factory material)
- Background ambiance (decorative blur is noise)

### 8.4 Parallax

Parallax is limited to the depth layer system (section 8.1) and follows these rules:

1. **Maximum parallax offset: 40px** for the fastest layer relative to the slowest. Beyond 40px, the user sees content separate from its container, creating a "floating UI" effect (prohibited).
2. **Parallax only activates during scroll.** When the user stops scrolling, all layers lock to their final positions within 80ms.
3. **Parallax does not apply to interactive elements.** Buttons, inputs, and clickable modules must not parallax — they must remain fixed to their grid position.
4. **Parallax can be disabled** via `prefers-reduced-motion`. When disabled, all layers move at 100% speed (no differential).

---

## Part IX: Animation Hierarchy

### 9.1 Priority Levels

Every animation in the system has a priority level that determines whether it can be interrupted by a higher-priority animation.

| Priority | Level | Interruptible By | Examples |
|----------|-------|------------------|----------|
| P0 — Critical | System stability | Nothing | Error state, focus indicator |
| P1 — User-driven | Interaction response | P0 | Hover, press, magnetic nudge |
| P2 — State change | Data/state transition | P0, P1 | Value update, layout shift |
| P3 — Entrance | Assembly into viewport | P0, P1, P2 | Node appear, section entrance |
| P4 — Ambient | Continuous, non-critical | Any higher priority | Data particle flow, status pulse |

When a P1 animation (user hovers a button) starts while a P3 animation (node entering) is in progress on the same element:
- The P3 animation stops immediately
- The P1 animation starts from the element's current state
- The P3 never resumes — the element was interrupted during assembly

### 9.2 Queue Behavior

When multiple P3 animations are queued for the same viewport (e.g., all nodes in a diagram entering simultaneously), they execute in a single batch with staggered 80ms delays. If the user scrolls away during the batch:
- Elements that have not started their animation are cancelled (remain dormant)
- Elements mid-animation complete their current phase but do not proceed to the next phase
- Elements that have completed remain visible

### 9.3 Conflict Resolution

When two layout animations would move the same element to conflicting positions (change in data causes a layout shift while a modal is preparing to open):

1. The modal preparation pauses (P2, deferred)
2. The layout shift executes (P2, data-driven)
3. The modal preparation resumes (P2, deferred) after 480ms

The system always resolves data conflicts before UI conflicts. Data correctness takes priority over visual smoothness.

---

## Part X: Signature Motions

These are the four motion signatures unique to TOALESCO. Every implementation must include these.

### 10.1 The Schematic Draw

When a system diagram or connection network appears, it draws like an engineering blueprint being rendered.

```
Signature:
  - Lines draw from left to right (for horizontal) or top to bottom (for vertical)
  - Nodes materialize at their end points
  - Non-linear paths (curves) draw outward from the center
  - Total assembly time: 960ms max per diagram
  - No line draws in reverse direction (right→left or bottom→top)
```

This creates a visual flow that mirrors reading direction — the user's eye follows the assembly in the same order they would read documentation.

### 10.2 The Data Pulse

When a measurement updates, the value does not simply change. It **pulses**.

```
Signature:
  - Old value retains position and opacity for 60ms
  - Old value fades out (opacity 1→0) over 120ms
  - New value appears in its place (scale 0.9→1, opacity 0→1) over 240ms
  - The surrounding 8px radius glows at `--active` at 10% opacity for 120ms
  - Total update time: 420ms
```

The user sees the old value, then the new value replaces it. The brief overlap ensures the user registers the change even if they weren't watching the exact moment.

### 10.3 The Magnetic Snap

When a user's cursor approaches within 8px of an interactive element, the element emits a single, almost imperceptible "snap" — a 0.5px upward shift over 60ms.

```
Signature:
  - Shift: 0px → 0.5px upward
  - Duration: 60ms
  - Easing: (0.34, 1.56, 0.64, 1) — slight overshoot
  - Decay: returns to 0px over 120ms if cursor leaves
```

This is not visible to conscious attention. The user feels it. It is the sensation of the cursor "catching" on an interactive element.

### 10.4 The Layer Descend

When transitioning between scenes (sections), the following pattern plays:

```
Signature:
  - Previous scene's content scales to 0.97 and opacities to 0.6 over 240ms
  - Previous scene's grid accelerates downward by 20px at 50% speed (parallax)
  - Next scene's grid decelerates from 20px above to 0px at 120% speed (parallax)
  - Next scene's content scales from 0.97 to 1 and opacities from 0 to 1 over 480ms
  - Total transition: 720ms
  - The two scenes overlap visually for the middle 240ms
```

The overlap creates a sense of continuous space — the user is moving through a factory, not flipping pages.

---

## Part XI: Mobile Adaptation

### 11.1 Performance Scaling

On mobile devices, all animations are automatically scaled based on device capability:

| Device Tier | Spring Quality | Particle Count | Parallax | Blur |
|-------------|---------------|----------------|----------|------|
| High (iPhone 15+/Android flagship) | Full | Unlimited | Enabled | 2px max |
| Medium (3+ year old devices) | Reduced (linearized) | Max 3 particles | Reduced differential | Disabled |
| Low (budget/old devices) | All springs → linear 0.3s | 0 particles | Disabled | Disabled |

Tier detection: `navigator.hardwareConcurrency` > 6 = High. `navigator.hardwareConcurrency` > 4 = Medium. Else = Low. Combined with device memory API if available.

### 11.2 Touch Scroll Behavior

On mobile:
- Scene snap is enabled with a **hysteresis threshold of 60px**. The user must scroll 60px in one direction before the snap engages to the next scene. This prevents accidental scene changes during content scrolling.
- Parallax differential is reduced to 10% (from 30% on desktop).
- No magnetic snap (touch lacks the precision for sub-8px effects).

### 11.3 Reduced Motion

When `prefers-reduced-motion: reduce` is active:

| Feature | Replacement |
|---------|------------|
| All springs | Instant (0.01ms duration) |
| Data Pulse | Opacity cross-fade, 100ms |
| Magnetic Snap | Disabled |
| Layer Descend | Instant cross-fade, 80ms |
| Schematic Draw | Instant opacity reveal, 100ms per layer |
| Parallax | Disabled (all layers 100% speed) |
| Flow Particles | Disabled |
| Probe cursor | Hidden |
| Scroll-snap | Disabled (native scroll only) |

The system remains fully functional. No information is lost. Only the physics are removed.

---

## Part XII: Motion Design Review Checklist

Before approving any moving element, verify:

1. **Does this motion have a physical cause?** (Assembly, User, or Connection force)
2. **Does the motion communicate system state?** (If the object stopped mid-motion, would the user understand why?)
3. **Is the duration within the beat hierarchy?** (Multiple of 120ms or 480ms?)
4. **Does the easing match the material?** (Rigid, elastic, fluid, or magnetic?)
5. **Is the priority correct?** (Can this be interrupted by user interaction?)
6. **Does this motion exist on mobile?** (If so, is it performance-scaled?)
7. **Does reduced motion remove this completely?** (If not, the alternative must be defined.)
8. **Is this a signature motion?** (If not, should it be simplified to use an existing signature?)
9. **Does this motion create a parallax differential?** (If so, is it within the 30% limit?)
10. **Does this motion use blur?** (If so, is it for defocusing inactive content?)

If any answer violates these rules, the motion does not belong in the system.

---

**End of Motion Language v1.0**

*These laws define how TOALESCO feels. Every pixel in motion must obey them. There is no exception for "this one component needs to feel special." The system is the signature.*
