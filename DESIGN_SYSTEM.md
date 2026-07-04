# TOALESCO Design System — Blueprint v1.0

> **Schematic Assembly Language for Digital Products**
>
> Not a UI kit. A material specification for building software interfaces from engineering principles.

---

## 1. The Spacing & Grid System

### 1.1 Base Unit

The base unit is **8px**.

Every measurement—margin, padding, gap, width, height—must be a multiple of 8px (or 4px for micro- adjustments when the 8px constraint produces visual misalignment).

This is not a convenience. It is the **tolerance** of the system. In engineering, a tolerance is the permissible limit of variation. 8px is TOALESCO's tolerance. Below 8px, variation is imperceptible. Above 8px, every measurement is intentional.

### 1.2 Spacing Scale

| Token | Value | Use |
|-------|-------|-----|
| `space-1` | 4px | Micro-adjustments, inner padding of small nodes |
| `space-2` | 8px | Tight component spacing, button padding |
| `space-3` | 12px | Label-to-data distance within a node |
| `space-4` | 16px | Component internal padding (standard) |
| `space-5` | 24px | Component-to-component vertical/horizontal |
| `space-6` | 32px | Section internal spacing |
| `space-7` | 40px | Module-to-module gap in system diagrams |
| `space-8` | 48px | Section boundary → content (desktop grid unit) |
| `space-9` | 64px | Major section separation |
| `space-10` | 80px | Full-viewport padding max |

### 1.3 Grid — Desktop

| Property | Value |
|----------|-------|
| Base unit | 48px |
| Columns | 12 |
| Gutter | 24px (space-5) |
| Margin | 48px (space-8) on each side |
| Max content width | 1200px (25 grid units) |
| Nested grid | Allowed at 48px offset from parent |

### 1.4 Grid — Tablet

| Property | Value |
|----------|-------|
| Base unit | 32px |
| Columns | 8 |
| Gutter | 16px (space-4) |
| Margin | 32px (space-7) on each side |

### 1.5 Grid — Mobile

| Property | Value |
|----------|-------|
| Base unit | 24px |
| Columns | 4 |
| Gutter | 12px (space-3) |
| Margin | 16px (space-4) on each side |

### 1.6 Grid Behavior

The grid is **not a layout tool**. It is the **substrate** upon which schematics are drawn. Content does not "fill columns." Nodes occupy positions at grid intersections. When a node expands, it snaps to the next grid intersection.

---

## 2. Typography System

### 2.1 Typefaces

| Role | Font | Weight Available | Fallback |
|------|------|-----------------|----------|
| UI / Labels / Navigation | Geist Sans | 400, 500, 600, 700 | system-ui, sans-serif |
| Data / Code / Measurements | Geist Mono | 400, 500 | ui-monospace, monospace |
| Headlines | Geist Sans | 700 | system-ui, sans-serif |

No font carries personality. Fonts are measurement tools.

### 2.2 Scale

| Token | Size | Weight | Line Height | Letter Spacing | Font | Use |
|-------|------|--------|-------------|----------------|------|-----|
| `type-micro` | 9px/0.5625rem | 500 | 1.2 | 0.08em | Geist Sans | Uppercase labels, badges |
| `type-caption` | 10px/0.625rem | 400 | 1.3 | 0 | Geist Mono | Data, measurements |
| `type-caption-bold` | 10px/0.625rem | 500 | 1.3 | 0 | Geist Mono | Data emphasis |
| `type-small` | 11px/0.6875rem | 400 | 1.4 | 0 | Geist Sans | Secondary text |
| `type-body` | 12px/0.75rem | 400 | 1.5 | 0 | Geist Sans | Body copy |
| `type-body-bold` | 12px/0.75rem | 600 | 1.5 | 0 | Geist Sans | Body emphasis |
| `type-label` | 11px/0.6875rem | 500 | 1.3 | 0.06em | Geist Sans | Button, input, nav labels |
| `type-h4` | 14px/0.875rem | 600 | 1.3 | 0 | Geist Sans | Module titles |
| `type-h3` | 16px/1rem | 600 | 1.25 | 0 | Geist Sans | Small section headings |
| `type-h2` | clamp(1.25rem, 3vw, 1.75rem) | 700 | 1.1 | -0.01em | Geist Sans | Section headings |
| `type-h1` | clamp(1.75rem, 6vw, 3rem) | 700 | 0.95 | -0.02em | Geist Sans | Hero, major headings |
| `type-hero` | clamp(2.5rem, 9vw, 5rem) | 700 | 0.9 | -0.03em | Geist Sans | Primary statement |

### 2.3 Typography Rules

1. **Size decreases with density.** The more information on screen, the smaller the type (down to type-micro). Sparse screens use larger type.
2. **Weight carries hierarchy.** Size signals distance from the reader. Weight signals importance within a distance layer.
3. **Uppercase with tracking only applies to functional labels** — section markers, module headers, measurement units. Never body text.
4. **Data is always monospace.** Any number the user might need to read, compare, or act upon must be Geist Mono.
5. **Line length max: 70 characters.** Beyond that, the reader cannot track the line. This is a measurement, not a preference.

---

## 3. Color System

### 3.1 Token Architecture

All colors are defined as CSS custom properties with semantic names. The name encodes the color's **function**, not its hue.

### 3.2 Core Tokens

| Token | Dark Value | Light Value | Function |
|-------|-----------|-------------|----------|
| `--substrate` | #07111F | #FAF8F4 | Factory floor / engineering paper |
| `--substrate-elevated` | #0A1628 | #F5F3EF | Component surface |
| `--measure` | #D6DAE2 | #1A1D23 | All readable content (cold) |
| `--measure-secondary` | #7A8294 | #6B6F7A | Supporting content |
| `--measure-inverse` | #1A1D23 | #D6DAE2 | Content on active surfaces |
| `--active` | #2E6BFF | #2E6BFF | Running system, live data, active modules |
| `--active-dim` | #2E6BFF / 30% | #2E6BFF / 30% | Dormant connections, background activity |
| `--signal` | #FFB547 | #FFB547 | User interaction response (amber) |
| `--signal-dim` | #FFB547 / 40% | #FFB547 / 40% | Hover preparation, attended state |
| `--boundary` | rgba(214,218,226,0.12) | rgba(26,29,35,0.12) | All borders, strokes, grid lines |
| `--boundary-active` | rgba(46,107,255,0.25) | rgba(46,107,255,0.25) | Active node border |
| `--error` | #E54D4D | #D32F2F | System error state |
| `--error-bg` | rgba(229,77,77,0.08) | rgba(211,47,47,0.06) | Error surface backdrop |

### 3.3 Functional Color Applications

| Element | Token Applied | Rationale |
|---------|--------------|-----------|
| Page background | `--substrate` | The factory floor is always the base |
| Card / module surface | `--substrate-elevated` | Slightly raised from floor |
| Body text | `--measure` | Cold, neutral reading |
| Heading text | `--measure` | Same cold neutrality, just bigger |
| Inactive connection line | `--boundary` | Structure without status |
| Active module border | `--boundary-active` | System is running here |
| Live data value | `--active` | This number is currently meaningful |
| Hover state | `--signal-dim` | User is about to interact |
| Active/focused element | `--signal` | User is interacting now |
| Error message | `--error` | System state alert |

### 3.4 Color Behavior Rules

1. **Blue is never decorative.** Every blue pixel must correspond to an active system function. If the system is idle, there is no blue.
2. **Amber is never permanent.** Amber fades when interaction ends. It exists only as a trace of human action.
3. **Warmth is always earned.** The only warm color in the system is amber, and it only appears during interaction. A static page has zero warm tones.
4. **Opacity encodes hierarchy, not mood.** Lower opacity = further from user's current attention. Higher opacity = directly relevant.
5. **Inverse is rare and local.** Inverse text only appears on active modules where blue fills the background (e.g., primary buttons).

---

## 4. Radius System

### 4.1 The Rule

Radius is not aesthetic. Radius encodes **component scale**.

Smaller components have smaller radii. Larger components have larger radii. The radius tells the user how big a thing is without reading its size.

| Token | Value | Applied To |
|-------|-------|------------|
| `radius-sm` | 3px | Data particles, badges, inline indicators |
| `radius-md` | 5px | Inputs, buttons, small nodes (≤48px height) |
| `radius-lg` | 6px | Module containers, cards, large nodes |
| `radius-section` | 8px | Section containers on elevated surfaces |

### 4.2 Radius Prohibitions

- **No fully rounded (pill) shapes.** A pill shape has no orientation. Every TOALESCO component must have a readable top/bottom/left/right. Pill shapes erase orientation.
- **No 0-radius corners** on interactive components. Sharp corners imply sharp boundaries (page edges, dividers). Interactive components should be distinguishable from page structure.
- **No variable radius per corner.** All four corners of a component must share the same radius. Asymmetrical radius implies asymmetrical function, which is never true for containers.

---

## 5. Elevation System

### 5.1 Elevation is Depth Layer, Not Shadow

TOALESCO does not use shadows.

Shadows imply floating. Nothing floats in a factory. Everything is mounted to the floor or suspended from a rail.

Instead, depth is communicated through:

1. **Layer offset** — The higher layer shifts by 1px up and left (creates mechanical depth, not atmospheric depth)
2. **Border intensity** — Higher layers have more visible borders (closer to the user's attention)
3. **Background contrast** — Higher layers use `--substrate-elevated` (visibly distinct from the floor)

### 5.2 Layer Hierarchy

| Layer | z-index | Visual Treatment | Use |
|-------|---------|-----------------|-----|
| Substrate | 0 | Grid only, full bleed | The floor |
| Schematic | 1 | Elevated background, normal border | Modules, connections, data |
| Interactive | 2 | Elevated background, stronger border | Buttons, inputs, active toggles |
| Overlay | 100 | Full solid background | Modals, drawers, menus |
| Probe | 9999 | 1px dot | Custom cursor |

### 5.3 Layer Transition

When a component moves from one layer to another (e.g., from schematic to interactive on focus), the visual change must be:
- Border opacity increases from 12% to 25%
- Background shifts to `--substrate-elevated`
- Transition: 0.2s, ease [0.22, 1, 0.36, 1]
- No scale change. No translateZ. No shadow.

---

## 6. Surface Hierarchy

### 6.1 Surface Types

| Surface | Background | Border | Content Treatment | Use Case |
|---------|------------|--------|-------------------|----------|
| Floor | `--substrate` | None | In-grid content | Page backgrounds, section containers |
| Panel | `--substrate-elevated` | `--boundary` | Normal content | Module containers, cards, sidebars |
| Active Panel | `--substrate-elevated` | `--boundary-active` | Content + blue accent | Currently focused module |
| Interactive | `--substrate-elevated` | `--signal-dim` (on attend) / `--signal` (on active) | Content + amber accent | Buttons, inputs during interaction |
| Dialog | `--substrate-elevated` | `--boundary` | Normal content | Modal overlays, drawers |

### 6.2 Surface Composition Rules

1. **Never nest active panels.** Only one module can be active at a time.
2. **Panels must be separated by at least one grid unit (8px/space-2).** Touching panels imply they are a single component.
3. **Active panels must have exactly one data value in blue.** Not all data. The single most relevant measurement.

---

## 7. Motion System

### 7.1 The Three Motion Classes

Every animation in the system belongs to exactly one of three classes:

| Class | Purpose | Duration | Easing | Property |
|-------|---------|----------|--------|----------|
| Assembly | Component enters the schematic | 0.4–0.6s | spring(200, 22) | opacity, scale, pathLength |
| Flow | Data moves between components | 1.5–2.5s, repeat | linear | translateX/Y, stroke-dashoffset |
| State | Component changes mode | 0.2–0.35s | ease [0.22,1,0.36,1] | background, border, color |

### 7.2 Animation by Component

| Component | Motion Class | Trigger | Notes |
|-----------|-------------|---------|-------|
| Node (appears) | Assembly | Viewport entry | Opacity 0→1, scale 0.7→1, spring |
| Node (moves) | State | Layout change | layout animation, 0.5s, smooth ease |
| Connection (draws) | Assembly | Both nodes visible | pathLength 0→1, 0.6s, smooth ease |
| Data particle | Flow | System active | Path following, 2s, linear, repeat |
| Button (hover) | State | Cursor enters | Background + border, 0.2s |
| Button (press) | State | Cursor down | scale 0.97, spring(300,15) |
| Section enters | Assembly | Viewport entry | y: 12→0, opacity 0→1, 0.5s |
| Status changes | State | Data updates | border color, 0.3s, smooth ease |
| Error state | State | Error triggers | border to error color, 0.3s, hold 1s, fade |

### 7.3 Motion Constraints

1. **No infinite animations** except genuine data flow indicators. A pulsing element that isn't data is decoration.
2. **No parallel animations of different classes** on the same component. A component cannot assemble and change state simultaneously.
3. **No staggered delays longer than 1.5s total** across a group. Users should not wait more than 1.5s for a full group to enter.
4. **Reduced motion** replaces all animations with instant opacity toggles (0.01s). No cross-fades. No movement.

---

## 8. Component System

### 8.1 Buttons

#### Anatomy

```
┌─────────────────────────────┐
│  [icon]  Label  [indicator]  │
└─────────────────────────────┘
```

Height: 32px (space-6). Padding: horizontal 12px (space-3). Radius: 5px.

#### Types

| Type | Background | Border | Text | Hover | Active |
|------|-----------|--------|------|-------|--------|
| Primary | `--active` | None | `--measure-inverse` | Opacity 90% | scale 0.97 |
| Secondary | `--substrate-elevated` | `--boundary` | `--measure` | `--signal-dim` border | `--signal` border |
| Tertiary | Transparent | None | `--measure-secondary` | `--signal-dim` text | `--signal` text |

#### States

| State | Visual |
|-------|--------|
| Idle | As defined per type |
| Attended (cursor near) | Primary: subtle pulse on icon (opacity 0.8→1). Secondary: border shifts to `--signal-dim`. Tertiary: text shifts to `--measure`. |
| Hover | Primary: opacity 90%. Secondary: `--signal-dim` border. Tertiary: `--measure` text. |
| Active (pressed) | Scale 0.97. Maintain hover colors. |
| Focus | 1px `--signal` ring offset by 2px from component (not inset). |
| Disabled | Opacity 35%. No hover/active states. Static border. |
| Loading | Icon replaced by 2px ring, 1/3 arc in `--active`, rotates at 1.5s linear (only during loading). |

#### Button Group

Button groups must be separated by 8px (space-2). Primary/Secondary pairs should be Primary on the right or top (confirms action), Secondary on the left or bottom (cancels/alternate).

### 8.2 Inputs & Forms

#### Anatomy

```
Label (type-label)
┌─────────────────────────────────┐
│  [icon]  Value / Placeholder     │
│  ──────────────────────────────  │
│  (underline, 1px, --boundary)   │
└─────────────────────────────────┘
Helper text (type-caption, --measure-secondary)
```

Height: 32px (space-6). Padding: horizontal 8px (space-2). Internal gap: 8px.

#### States

| State | Border | Label | Helper |
|-------|--------|-------|--------|
| Idle | `--boundary`, 1px | `--measure-secondary` | `--measure-secondary` |
| Focus | `--signal`, 1px | `--signal` | `--measure-secondary` |
| Filled | `--boundary` | `--measure` | — |
| Error | `--error`, 1px | `--error` | `--error` |
| Disabled | `--boundary`, 35% | `--measure-secondary`, 35% | — |

#### Validation

Validation appears only after the user leaves the field (blur) or explicitly submits. Never while typing. Error helper replaces the default helper text.

#### Form Layout

- Label above input: 8px gap
- Input to helper: 4px (space-1)
- Vertical field spacing: 20px (2.5 grid units)
- Submit button: left-aligned with fields, 24px (space-5) from last field

### 8.3 Navigation

#### Primary Navigation

```
[Logo] [Node 1] [Node 2] [Node 3] [Node 4]            [Theme] [Contact]
```

Height: 40px (space-7). Background: transparent (substrate shows through) until user scrolls, then `--substrate-elevated` with `--boundary` bottom border.

Items are 11px Geist Sans, 500 weight, `--measure-secondary`. Active item is `--active` with a 1.5px underline (no pill background). The underline is actually a **connection line** — it connects the logo to the active section.

The logo is the Terminal character (`>_`) at 14px, `--active`. No company name in the navigation on spaces where the company name appears in the hero. On interior pages, the company name appears at `type-body-bold`.

#### Section Navigation (Landing / Scenes)

In scene-based layouts (not pages), navigation becomes a **layer indicator** on the right edge:

```
    01
    ╷
    ●
    ○
    ○
    ○
    ○
    ╵
    05
```

Each dot corresponds to a scene. Active dot fills. Dots are 6px, separated by 12px. The vertical line connects all dots (represents the schematic depth). Dot click is not allowed — the user scrolls through scenes. The indicator is read-only.

### 8.4 Sections

#### Section Types

| Type | Padding Top/Bottom | Internal Gap | Background |
|------|-------------------|--------------|------------|
| Hero / Scene | 80px (scene) / 48px from top | Variable, scene-dependent | Substrate |
| Content Section | 64px | 32px | Substrate |
| Alternate Section | 64px | 32px | Substrate with grid-only background |
| Divider Section | 40px | — | Substrate, 1px boundary line |

#### Section Headers

Every section must have:
- **Marker** (`type-micro`, uppercase, `--measure-secondary`): 1–2 words identifying the section's function
- **Heading** (`type-h2` or `type-h1`): The statement
- **Optional description** (`type-body`, `--measure-secondary`): Context

```
────────────────────────────────
SERVICIOS       ← type-micro

Tu ecosistema
digital.       ← type-h2/type-h1

Piezas que encajan.      ← type-body (optional)
────────────────────────────────
```

### 8.5 System Modules (Replaces "Cards")

TOALESCO does not have cards. It has **System Modules**.

A System Module is a functional unit that displays the state of one component in the system.

#### Anatomy

```
┌──────────────────────────────────┐
│ [icon]  Module Name   ● Active   │
│ ─────────────────────────────── │
│ Label ....... Value              │
│ Label ....... Value              │
│ Label ....... Value              │
└──────────────────────────────────┘
```

Width: Flexible (grid-based). Min: 200px. Max: 400px. Internal padding: 16px (space-4). Border: `--boundary`, 1px. Radius: 6px.

#### Module States

| State | Border | Background | Data Color |
|-------|--------|-----------|------------|
| Idle | `--boundary` | `--substrate-elevated` | `--measure` |
| Active | `--boundary-active` | `--substrate-elevated` | `--active` (one value) |
| Error | `--error` | `--substrate-elevated` | `--error` |

A **Primary Module** is the most important module in a section. It has a slightly larger icon (18px vs 14px) and sits at the top-left of the module grid.

A **Dormant Module** is a module that exists in the schematic but has no active data yet. Its values show `—` in `--measure-secondary` at 40% opacity. This is not a loading state. It is a structural placeholder.

### 8.6 Tables

#### Anatomy

```
┌──────────┬──────────┬──────────┬──────────┐
│ Header   │ Header   │ Header   │ Header   │
├──────────┼──────────┼──────────┼──────────┤
│ Data     │ Data     │ Data     │ Data     │
│ Data     │ → active │ Data     │ Data     │
│ Data     │ Data     │ Data     │ Data     │
└──────────┴──────────┴──────────┴──────────┘
```

Header height: 32px. Row height: 32px. Cell padding: horizontal 12px, vertical 4px. Border: `--boundary`, 0.5px.

Headers: `type-micro`, uppercase, `--measure-secondary`. Cells: `type-caption`, `--measure`.

Active row: `--boundary-active` left border (2px). No row background change.

Tables have no horizontal scroll on desktop. On mobile, tables become a list of module-like rows:

```
┌──────────────────────────┐
│ Header                    │
│ Data  Data  Data  Data    │
├──────────────────────────┤
│ Header                    │
│ Data  Data  Data  Data    │
└──────────────────────────┘
```

### 8.7 Dashboard Components

Dashboard components are System Modules arranged in a grid where each module displays a live measurement.

#### Measurement Types

| Type | Display | Example |
|------|---------|---------|
| Single value | Large number + label | 98% (uptime) |
| Paired value | Two numbers side by side | 340 users · 12 new |
| Trend | Value + mini line (SVG polyline, 3 peaks max) | 94% ↑ |
| Status | Label + colored indicator | ● Online |

#### Mini Chart Rules

Charts within dashboard components are SVG polylines. Max 20 data points. Max 3 lines (comparison). No axes, no grid, no labels except the current value. The chart is 100% width of the module, 48px height, `--active` stroke at 1.5px, `--boundary` fill at 5% opacity. No dots on data points. No gradient fill under line.

### 8.8 Status Indicators

| Indicator | Component | Color | Animation |
|-----------|-----------|-------|-----------|
| Online / Running | Small dot (6px) | `--active` | Subtle pulse (2s) |
| Processing | Dashed border | `--active` | Stroke-dashoffset animation |
| Idle / Paused | Small dot | `--measure-secondary` | None |
| Error | Small dot | `--error` | Pulse (0.5s on, 2s off) |

### 8.9 Empty States

An empty state is a **Dormant Node**.

- A single 6px dot at `--boundary` opacity
- `type-body` text: "No [data type] yet"
- `type-caption` helper: "Data will appear here when the system begins recording."
- No illustration. No icon. No CTA (unless the user can create the first item).

### 8.10 Error States

An error state is a **System Alert**.

- The affected component's border shifts to `--error` over 0.3s
- A `type-caption` label appears: "[Component] unavailable"
- A `type-micro` description: "Last successful read: [timestamp]"
- A "Retry" button (Tertiary, 24px height) appears below the description

No full-page errors. Errors are local to the failing component.

### 8.11 Loading States

Loading is never indicated by a spinner.

#### Loading Types

| Context | Indicator | Behavior |
|---------|-----------|----------|
| Initial page load | Full-screen fade from substrate to content | 0.8s cross-fade, no content flash |
| Component loading | 1.5px dashed border on the component, `--active` | Dashes animate at 1s cycle |
| Data refresh | Previous data dims to 30% opacity, new data fades in | 0.4s cross-fade per data point |
| Form submission | Button icon replaced by 2px arc, rotates | 1.5s rotation, no text change |
| File upload | Module appears with "Uploading" label, 1px active border | Label changes to "Uploaded" on complete |

---

## 9. Responsive Behavior

### 9.1 Adaptation Principle

Responsive behavior is **recomposition**, not stacking.

When the viewport shrinks, content does not simply narrow and stack vertically. The schematic should recompose to a different layout that preserves the original spatial relationships as much as possible.

### 9.2 Breakpoints

| Name | Min Width | Columns | Base Unit | Layout Behavior |
|------|-----------|---------|-----------|-----------------|
| Mobile | 0px | 4 | 24px | Single-column schematic, vertical flow |
| Tablet | 768px | 8 | 32px | Two-column schematic, some side-by-side |
| Desktop | 1024px | 12 | 48px | Full multi-column schematic |
| Wide | 1440px | 12 | 48px, max content 1200px | Same as desktop, centered |

### 9.3 Component Adaptation

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| System diagram | 3 nodes max visible, stacked | 5 nodes, compact curves | Full diagram |
| Module grid | Single column | 2 columns | 3–4 columns |
| Tables | List view (module-like rows) | Table with horizontal scroll | Full table |
| Navigation | Logo + hamburger (drawer overlay) | All items, compact | All items, standard |
| Buttons | Full width in forms | Inline with other buttons | Inline |
| Section padding | 32px top/bottom | 48px top/bottom | 64px top/bottom |
| Inputs | Full width | 75% width | 50% width (max 400px) |

### 9.4 Touch Targets

Minimum touch target: 44px × 44px (including padding). This overrides component heights on mobile. A 32px button on mobile must have 6px padding above and below to reach 44px.

---

## 10. Accessibility

### 10.1 Contrast

| Combination | Minimum Ratio | Preferred Ratio |
|-------------|---------------|-----------------|
| `--measure` on `--substrate` | 7:1 | 9:1 |
| `--measure-secondary` on `--substrate` | 4.5:1 | 5.5:1 |
| `--measure-inverse` on `--active` | 4.5:1 | 5.5:1 |
| `--signal` on `--substrate` | 3:1 (non-text) | 4.5:1 |

### 10.2 Focus

Focus is never outline: 0.

Focus indicator: 1px `--signal` ring, offset 2px from the component boundary. This is not an outline (it does not affect layout). It appears on Tab navigation and disappears on mouse interaction (but reappears if the user switches to keyboard while a component is focused).

### 10.3 Reduced Motion

When `prefers-reduced-motion: reduce` is active:

- All springs become linear, 0.01s
- All pathLength animations become instant opacity toggles (0.01s)
- No infinite animations
- No cross-fades longer than 0.1s
- The cursor dot is hidden
- Scroll-snap is disabled

### 10.4 Screen Readers

- All SVG elements (diagrams, connections, nodes) must have `role="img"` with `aria-label` describing the system state
- Connection lines must be grouped in a `<g>` with `aria-hidden="true"` (they are decorative structure)
- Data particles must be `aria-hidden="true"`
- The navigation must have `aria-label="Schematic layers"` in scene mode or `aria-label="Primary navigation"` in page mode

---

## 11. Icons Language

### 11.1 Icon Rules

1. **Icons are component-type markers, not symbols.** They label the function of a module, not the module's content.
2. **Icons must fit within a 14px × 14px bounding box.** Larger icons (18px) only for Primary Modules.
3. **1.5px stroke weight.** Filled icons are prohibited — fill implies completion; the system is never complete.
4. **No rounded caps or joins.** Square caps and joins match the schematic's precision.
5. **Icons must never animate independently.** The module animates as a whole; the icon is part of the module.

### 11.2 Available Icons

Only the following icon concepts are approved:

| Concept | Visual | Use |
|---------|--------|-----|
| Terminal | `>_` | Company mark, any system action |
| Node | Small square with connection points | Module indicator |
| Connection | Two nodes with a line | Relationship between modules |
| Data | Three lines of decreasing length | Data display |
| Flow | Arrow with curved path | Active process |
| Grid | 2×2 dots | Empty state, dormant |
| Measure | Ruler-like parallel lines | Settings, configuration |
| Signal | Central dot with arcs | Status, activity |
| Output | Arrow pointing outward | Export, external link |
| Input | Arrow pointing inward | Import, form |
| Stack | Three horizontal lines | Multiple items, list |

No people icons. No chat icons. No shopping icons. No social media icons.

---

## 12. Diagram Language

### 12.1 The Core Format

Every system diagram follows the same structure:

```
  ┌──────────┐     ┌──────────┐
  │  Module  │────→│  Module  │
  └──────────┘     └──────────┘
       │                │
       ▼                ▼
  ┌──────────┐     ┌──────────┐
  │  Module  │────→│  Module  │
  └──────────┘     └──────────┘
       │                │
       └──────┬─────────┘
              ▼
        ┌──────────┐
        │  Module  │
        └──────────┘
```

### 12.2 Diagram Rules

1. **Modules are always 156px × 42px** (scales proportionally on mobile via viewBox).
2. **Horizontal connections** use cubic bezier with 0.4 control point offset.
3. **Vertical connections** use cubic bezier with 0.3 control point offset.
4. **Maximum 7 modules per diagram.** Beyond that, the schematic must be split into layers.
5. **Connection labels (optional, type-caption) sit at the midpoint of the curve**, aligned to the curve's normal.
6. **Diagrams must use `viewBox`** (not absolute sizing) for responsive scaling.

### 12.3 Diagram States

| State | Module Treatment | Connection Treatment |
|-------|-----------------|---------------------|
| Dormant | Dashed border, no label | No visible connection |
| Building | Scale-in animation, border appears | Path draws at 0.6s |
| Active | Solid border, blue data | Solid line, optional particle flow |
| Complete | Dimmed blue, all data visible | Static line, no particles |

---

## 13. Component Size Reference

| Component | Height | Min Width | Padding X | Padding Y | Radius |
|-----------|--------|-----------|-----------|-----------|--------|
| Primary Button | 32px | 80px | 12px | 0 | 5px |
| Secondary Button | 32px | 80px | 12px | 0 | 5px |
| Tertiary Button | 24px | auto | 8px | 0 | 5px |
| Input | 32px | 160px | 8px | 0 | 5px |
| Select | 32px | 160px | 8px | 0 | 5px |
| Badge | 18px | auto | 6px | 0 | 3px |
| System Module | auto (min 48px) | 200px | 16px | 12px | 6px |
| Table Header | 32px | auto | 12px | 4px | 0 |
| Table Row | 32px | auto | 12px | 4px | 0 |
| Nav Item | 40px navbar | auto | 8px | 0 | 5px |
| Section Marker | auto | auto | 0 | 0 | 0 |
| Scene Dot | 6px | 6px | 0 | 0 | 3px |

---

## 14. Implementation Examples

### 14.1 System Module in HTML/CSS

```html
<div class="module" role="region" aria-label="Landing Pages module">
  <div class="module__header">
    <svg class="module__icon" viewBox="0 0 14 14" aria-hidden="true">
      <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
      <line x1="1" y1="5" x2="13" y2="5" stroke="currentColor" stroke-width="1"/>
    </svg>
    <span class="module__name">Landing Pages</span>
    <span class="module__status module__status--active">●</span>
  </div>
  <div class="module__data">
    <span class="module__label">tiempo entrega</span>
    <span class="module__value">7 días</span>
  </div>
  <div class="module__data">
    <span class="module__label">rendimiento</span>
    <span class="module__value module__value--live">98%</span>
  </div>
</div>
```

### 14.2 Connection Line in SVG

```svg
<path d="M 180 81 C 292 81, 348 81, 460 81"
      stroke="var(--boundary)"
      stroke-width="0.6"
      fill="none"
      stroke-linecap="round" />
```

### 14.3 Scene Structure

```html
<section class="scene" aria-label="Scene 3: System takes shape">
  <div class="scene__content">
    <svg class="scene__diagram" viewBox="0 0 800 440">
      <!-- nodes and connections -->
    </svg>
    <h2 class="scene__heading">Toma forma.</h2>
    <p class="scene__description">Los nodos se organizan en un sistema coherente.</p>
  </div>
</section>
```

---

## 15. Final Rules

1. **If it cannot be drawn as a schematic, it does not belong in TOALESCO.**
2. **If it needs a shadow to feel elevated, it is not elevated — it is floating.**
3. **If it uses color without measurement, it is decoration.**
4. **If it animates without communicating state change, it is noise.**
5. **If it cannot be described in one sentence, it is too complex.**
6. **If it looks like another company's product, rebuild it.**
7. **If it has rounded corners without structural reason, flatten them.**
8. **If it has an icon that does not identify component type, remove the icon.**
9. **If a module does not display data, it is not a module — it is an image.**
10. **If the user must guess what is interactive, the design has failed.**
