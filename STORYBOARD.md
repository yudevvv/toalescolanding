# TOALESCO — Cinematic Storyboard

**Film:** "Raw Ideas Become Digital Systems"
**Format:** 5 scenes, scroll-driven, 100dvh each
**Visual language:** Schematic realism — every element is a functional diagram component
**Tone:** Precision, inevitability, transformation without magic
**Runtime:** ~12–18 seconds (depending on scroll speed)

---

## Establishing Shot

**Before scene 1 — The Canvas**

The screen is completely dark. Pure black. #07111F.

A barely visible grid fades in over 800ms — engineering graph paper, thin lines at 12% opacity, no numbers, no labels. The grid exists everywhere, always. It is the substrate of reality.

**Emotional beat:** Silence. The visitor has just entered a space where things are built, not decorated.

---

## Scene 1: "Una idea."

**Duration in viewport:** ~2 seconds (or until scroll)
**Scroll snap:** Top of viewport
**Visual density:** Minimal. Almost nothing.

### Frame 1.0 — The Vast Room (0ms)

The camera looks down an infinite dark space. A grid recedes to a vanishing point, but the vanishing point is not at the center — it is slightly above center, creating a subtle upward pull.

**Lighting:** Ambient, cold. Like a factory floor at night with emergency lighting.

### Frame 1.1 — The Spark (400ms after entry)

At the exact center of the viewport, a single point of light appears. Not a fade — a threshold event. One frame it is not there. The next frame it is.

The point is:
- 3px diameter
- Color: `--measure` (white) at 100% opacity
- No glow. No bloom. Pure, cold light.

**Visual metaphor:** This is not a star. This is not magic. This is a signal on an oscilloscope. An idea has been registered by the system.

### Frame 1.2 — The Ring (800ms)

A single thin circle (1px stroke, `--measure` at 20% opacity) emanates from the point. Expands from 3px to 60px over 600ms. Fades out as it expands.

The ring does not repeat. It fires once.

**Reason:** The idea has been registered. One pulse. One acknowledgement. The system is now processing.

### Frame 1.3 — The Word (1000ms)

The text "Una idea." appears below the point:
- Font: Geist Sans, 400 weight
- Size: 3.5vw (approximately 48px on desktop)
- Color: `--measure` at 80% opacity
- Letter-spacing: 0.02em
- Position: 64px below the point

**The text does not animate in.** It simply is there. Like it was always written on the blueprint.

### Frame 1.4 — The Hold (1400ms onward)

Nothing changes. The point remains. The word remains. The grid is static.

**Emotional beat:** The visitor sits with the idea. There is no rush. The system is waiting for the next instruction — the user's scroll.

### Transition to Scene 2

As the user scrolls down, Scene 1 does not fade. It slides upward, out of view, at scroll speed. The point and text continue to exist in their own vertical space — they do not shrink, fade, or distort as they leave. Objects in the TOALESCO universe are real. They do not dissolve when you look away.

---

## Scene 2: "Se expande."

**Duration in viewport:** ~2.5 seconds
**Visual density:** Moderate. Connections forming.

### Frame 2.0 — The Empty Network (0ms after snap)

The viewport is again the dark grid. No carryover from Scene 1 (the point is now above the viewport).

A set of 7 anchor points are marked on the grid — small crosses (+), 12px, 1px stroke, `--measure` at 12% opacity. They exist across the viewport in an irregular constellation.

**Lighting:** Same as Scene 1. Ambient factory floor. But the anchor points are slightly brighter — like LEDs in standby.

### Frame 2.1 — The First Connection (300ms)

The leftmost anchor point activates: the cross shifts from 12% to 100% opacity over 120ms. A line begins to draw from this point to the next nearest point.

**Line characteristics:**
- Path: cubic bezier with gentle curve (not straight)
- Stroke: 1.5px
- Color: `--active` (electric blue #2E6BFF)
- Draw duration: 500ms per connection
- Easing: (0.22, 1, 0.36, 1) — rigid assembly

**Visual metaphor:** A wire being laid. A connection being established. The system is physically building its network.

### Frame 2.2 — Cascade (300ms–1500ms)

Connections cascade across the viewport:
- Connection 2 starts 200ms after Connection 1 finishes
- Connection 3 starts 200ms after Connection 2
- Each connection originates from the most recently activated point

The cascade forms a branching tree, not a web. The tree says: "growth follows a path, not random attachment."

**Timing breakdown:**
```
0ms:    Point 1 activates
500ms:  Connection 1 draws (point 1 → point 2)
700ms:  Point 2 activates
1200ms: Connection 2 draws (point 2 → point 3)
1400ms: Point 3 activates
1900ms: Connection 3 draws (point 3 → point 4)
...
```

### Frame 2.3 — The Word (700ms)

"Se expande." appears at the top-left of the viewport, 80px from top, 80px from left. Same typographic treatment as Scene 1.

The word is placed in the upper-left quadrant — the "beginning" of the reading space. It feels like a chapter title.

### Frame 2.4 — The Breathing (2000ms onward)

The active points (now 7 of them, all lit) exhibit a subtle micro-pulse:
- Scale: 1 → 1.05 → 1
- Duration: 2000ms cycle
- Easing: (0, 0, 0.2, 1) — decay ease
- Max opacity variation: ±5%

**Reason:** The network is alive but idle. The pulse says "ready" without saying "alert."

### Transition

The tree of connections scrolls upward. But the connections do not disappear cleanly — as the viewport moves, the farthest connections begin to **fragment** (opacity breaks into segments, like an old CRT losing signal). The fragments last 200ms before dissolving.

**Why fragmentation:** The previous scene's network is being deconstructed to make room for the next stage. Information is not lost — it is being reorganized into a higher-level structure.

---

## Scene 3: "Toma forma."

**Duration in viewport:** ~3 seconds
**Visual density:** High. The system diagram assembles.

### Frame 3.0 — The Empty Stage (0ms after snap)

The grid background. No anchor points. The viewport is clean.

A rectangular outline appears at the center of the viewport:
- Width: 800px
- Height: 440px
- Stroke: 1px, `--measure` at 10% opacity
- Fill: none

**Visual metaphor:** A drafting frame. The boundary within which the schematic will be drawn.

### Frame 3.1 — The Nodes Assemble (300ms–1200ms)

Five nodes appear within the drafting frame. They do not slide in — they **materialize**:

Each node:
1. A bounding box appears: 156px × 42px, no fill, 1px stroke, `--measure` at 20% opacity (100ms)
2. The fill fades in: `#07111F` at 80% over the bounding box (200ms)
3. The stroke shifts to `--active` at 100% (200ms)
4. The label resolves: Geist Sans, 11px, uppercase, letter-spacing 0.08em (100ms)
5. The entire node shifts up by 2px — a seating motion (200ms)

**Node positions (canonical layout):**

```
  ┌──────────────────┐     ┌──────────────────┐
  │  LANDING PAGES   │     │  AUTOMATIZACIÓN   │
  │  156 × 42        │     │  156 × 42         │
  │  x:180, y:60     │     │  x:460, y:60      │
  └──────────────────┘     └──────────────────┘

         ┌──────────────────────┐
         │   SOFTWARE A MEDIDA  │
         │   156 × 42           │
         │   x:320, y:140       │
         └──────────────────────┘

  ┌──────────────────┐     ┌──────────────────┐
  │   SAAS PRODUCTS  │     │  INTEGRACIONES   │
  │  156 × 42        │     │  156 × 42         │
  │  x:180, y:220    │     │  x:460, y:220    │
  └──────────────────┘     └──────────────────┘
```

**Lighting shift:** As the nodes appear, the ambient light warms slightly — from cold factory to a subtle 2% increase in warmth. The change is perceptible only if the user is paying attention.

### Frame 3.2 — The Connections Draw (1200ms–2000ms)

Cubic bezier curves draw between nodes:
- Horizontal connections (top row ↔ center, center ↔ bottom row)
- Vertical lines on the left and right edges
- One diagonal: bottom-left to top-right (represents cross-system communication)

**Connection order:**
1. Top horizontal (Landing Pages ↔ Center) — the primary relationship
2. Bottom horizontal (SaaS ↔ Center) — the technical foundation
3. Left vertical edge — boundary of the system
4. Right vertical edge — boundary of the system
5. Diagonal — cross-functional link

Each connection draws at 1.5px, `--active`, over 400ms. The entire connection phase lasts 800ms.

### Frame 3.3 — The Word (400ms)

"Toma forma." appears at the bottom-right of the drafting frame, 40px from the bottom-right corner.

This is the first word placed at the bottom — indicating that Scene 3 is a foundation. The story is building from the ground up.

### Frame 3.4 — The Calibration (2000ms onward)

The drafting frame outline fades to 5% opacity (it has served its purpose). The nodes remain crisp. The connections remain lit.

A single data particle begins traveling along the top horizontal connection:
- 2px diameter, `--active` at 60% opacity
- Duration: 1800ms per traversal
- Direction: left to right
- When it reaches the end, it disappears (no return path)

**Reason:** One particle. One direction. The system is demonstrating flow, not celebrating it.

### Emotional beat at end of Scene 3

Ricardo has now seen: "This is what we do. These are the categories. This is how they connect. It is a system, not a menu."

---

## Scene 4: "Cobra vida."

**Duration in viewport:** ~3.5 seconds
**Visual density:** Data overlay on the diagram.

### Frame 4.0 — The Living Schematic (0ms after snap)

Scene 3's diagram is still visible. But it has changed:
- The drafting frame outline is gone
- The connections are now animate — multiple particles flow along each path in both directions
- The node borders now have a subtle glow: 1px `--active`, 4px blur at 10% opacity

**Lighting:** Warmer. The cold factory has transitioned to operating temperature. The substrate grid is now at 8% opacity (was 12%). The shift is subtle but cumulative.

### Frame 4.1 — The Data Overlays (300ms)

Inside each node, a measurement appears to the right of the label:

```
LANDING PAGES     98%
AUTOMATIZACIÓN    92%
SOFTWARE A MEDIDA 94%
SAAS PRODUCTS     99.9%
INTEGRACIONES     340
```

**Typography:** Geist Mono, 10px, `--measure` at 80% opacity.

**The numbers are not formatted.** No percentage sign on the last one (340 is a count, not a rate). No decimal on integers. The data is raw — straight from the system.

### Frame 4.2 — The Flow Layer (600ms)

A new layer appears above the diagram: flowing data lines.

These are not the connection curves. These are **short parallel lines** (12px long, 1px, `--active` at 15% opacity) that travel along invisible horizontal lanes across the entire viewport:

- 5 lanes, evenly spaced vertically
- Each lane has 3–5 lines flowing at different speeds
- Speeds: 1.5s, 2s, 2.5s per traversal
- Direction: odd lanes left→right, even lanes right→left
- Opacity: max 15%, min 5% (fade in/out at lane boundaries)

**Visual metaphor:** Data is flowing through the system. The lanes are the infrastructure. The diagram (nodes + connections) is the architecture. The two layers coexist but are distinct — like a blueprint with annotations.

### Frame 4.3 — The Spark Points (1000ms)

Three random points within the diagram emit a single spark — identical to the point from Scene 1 (3px, white, no glow).

**When:** Staggered at 1000ms, 1600ms, 2200ms
**What it means:** The system is processing. These are micro-events — an order placed, a form submitted, a connection established. The user does not need to interpret them. They just see that the system is doing something.

### Frame 4.4 — The Word (400ms)

"Cobra vida." appears at the top-center, 60px from the top.

### Frame 4.5 — The Calibration (2500ms onward)

The data flows continue. The particles cycle. The measurements remain static but occasionally flicker — one number shifts by 0.1%, then settles. A single data particle changes color to `--signal` (amber #FFB547) for one cycle, then returns to `--active`.

**Emotional beat:** The system is working. It is not perfect (the amber flicker is a transient event that resolves itself). Ricardo sees that errors exist but are handled automatically.

---

## Scene 5: "Resultados."

**Duration in viewport:** ~4 seconds
**Visual density:** Mixed — diagram fades, content resolves.

### Frame 5.0 — The Opening Up (0ms after snap)

The system diagram begins to recede:
- Opacity: 100% → 30% over 800ms
- Scale: 1 → 0.85
- Y position: shifts upward by 60px
- Blur: 0 → 1px over 800ms

**Lighting:** The warm operating light remains on the diagram. But the foreground gets a new light source — from the top-left, at 45°, like morning light through a window.

This is the first time the lighting is directional. The entire site so far was ambient. This directional light says: "We are now in the real world."

### Frame 5.1 — The Results Emerge (400ms)

Two panels rise into the lower portion of the viewport. They rise from below — the only objects in the entire experience that enter from outside the frame:

```
┌──────────────────────────────────────┐
│  CARPINTERÍA HERNÁNDEZ              │
│  Sistema de pedidos y cotizaciones   │
│                                      │
│  "Terminamos perdiendo menos tiempo  │
│   en papeleo." — Carlos Hernández    │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  TALLER MECÁNICO PÉREZ              │
│  Gestión de citas e inventario       │
│                                      │
│  "Podemos ver las refacciones que    │
│   tenemos sin llamar al almacén."    │
│                     — Luisa Pérez    │
└──────────────────────────────────────┘
```

**Panel characteristics:**
- Width: 320px
- Height: 140px
- Background: `--substrate-light` (#FAF8F4 at 5% opacity on dark mode)
- Border: 1px, `--measure` at 12% opacity
- Rise duration: 600ms
- Rise easing: (0.22, 1, 0.36, 1)
- Spacing: 40px between panels

**Why they rise from below:** The results are the conclusion. They emerge from the "ground" of the system — built on top of everything that came before.

### Frame 5.2 — The System Remains Visible (800ms onward)

The diagram (now at 30% opacity, scaled to 0.85, at the top of the viewport) continues to show data flow. It is not gone. It is the foundation on which the results sit.

**Visual metaphor:** The results did not replace the system. The system is still running. The results are its output.

### Frame 5.3 — The CTA (1200ms)

A single line of text and a button appear below the panels:

"¿Listo para el siguiente paso?"

The button: "Contacto"
- Minimal outline style
- 1px border, `--measure` at 30%
- Text: Geist Sans, 13px, `--measure` at 70%
- Hover: border shifts to `--signal-dim`, text shifts to `--signal-dim`
- No icon

**Position:** Centered below the panels, 60px gap.

### Frame 5.4 — The Privacy Line (1400ms)

A thin line below the button, 12px font, `--measure` at 30% opacity:

"Tus datos están seguros. No compartimos información."

This is not a legal notice. It is a reassurance. The final thing Ricardo reads before deciding.

### Frame 5.5 — The Hold (2000ms onward)

The scene is stable. The panels are readable. The system hums quietly in the background. The CTA is visible but not aggressive.

**Emotional beat:** The experience is over. Ricardo has seen: idea → expansion → form → life → results. He now decides.

---

## End Credits (Technically Not Part of the Experience)

If Ricardo scrolls past Scene 5, the viewport shows a final, minimal state:

- The grid background
- No content
- A small text at the bottom-center: "TOALESCO — Ingeniería de Software"

This is the edge of the experience. There is nothing more to see. The only action is to go back or to contact.

---

## Visual Language Summary

| Element | Language | Meaning |
|---------|----------|---------|
| Grid | Engineering graph paper | The substrate. Reality under measurement. |
| Point (3px, white) | A signal | An idea. A registered event. |
| Ring (1px, expanding) | A pulse | Acknowledgement. Processing started. |
| Cross (+) markers | Anchor points | Positions where something can be built. |
| Nodes (156×42px) | Schematic modules | System components. Discrete capabilities. |
| Cubic bezier curves | Connection paths | Relationships between components. |
| Particles (2px, flowing) | Data in transit | Active information moving through the system. |
| Drafting frame (800×440) | Boundary | The scope of the system being designed. |
| Measurement labels | Instrumentation | Live system metrics. Proof of operation. |
| Result panels | Output | The real-world outcome of the system running. |
| Directional light (scene 5) | Morning light | Transition from abstract system to real world. |

---

## Camera Language

There is no camera movement during scroll. The camera is fixed. Content moves through the viewport vertically, like material on a factory conveyor.

**The conveyor metaphor:**
- Scene 1: Raw material (idea) enters
- Scene 2: Material is connected (expansion)
- Scene 3: Material takes shape (system design)
- Scene 4: Material is tested (live operation)
- Scene 5: Finished product exits

The user is not moving through the factory. The factory is moving past the user.

---

## The Sound of Silence

There is no music. No ambient drone. No sound effects.

The only acceptable sound is the silence of a machine shop during operation — low-frequency hum, the occasional click of a relay, the distant whir of a fan.

(On mobile, even this is absent. The site is silent. The silence is part of the design.)

---

## Color Temperature Arc

```
Scene 1: 6500K (cold, sterile)     — The drawing board
Scene 2: 6200K (cool)              — Components being connected
Scene 3: 5800K (neutral)           — System assembled
Scene 4: 5500K (slightly warm)     — System running at temperature
Scene 5: 5000K (warm morning)      — Results in the real world
```

The color temperature shifts by 300–500K per scene. The cumulative shift from Scene 1 to Scene 5 is 1500K — enough to feel different, not enough to notice consciously.

This is not implemented through CSS color temperature (which does not exist). It is implemented through:
- Subtle hue shift in the background (`#07111F` → hue rotated by +3°)
- Grid line opacity decreasing from 12% to 8%
- Node fill tint warming from pure `#07111F` to `#0F141F` (barely perceptible)

---

**End of Storyboard v1.0**

*This is not a design specification. This is a film. Every element exists because it advances the story from "raw idea" to "running system." If a frame does not move the narrative forward, it is cut.*
