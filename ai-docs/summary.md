## Goal
Single-page landing + portfolio for TOALESCO (soluciones digitales PYME, Valdivia, Chile) with hackerman aesthetic, scroll-snap sections, Framer Motion animations, and separate project sub-pages.

## Constraints & Preferences
- **Design:** hackerman (terminal windows, monospace, light/dark modes, dot pattern bg, blue/orange palette based on brand mockup)
- **Color palette:** blue-600 light / blue-400 dark as primary; orange-500 light / orange-400 dark as accent (from toalesco.jpg); slate grays for chrome
- **Logo:** lucide Terminal icon is the TOALESCO brand mark; no image-based logo
- **Scroll snap:** `snap-y snap-mandatory` on `<main>`, disabled via `motion-reduce:`
- **Navbar:** same component across all pages; landing shows nav links, proyectos pages show breadcrumb `TOALESCO / proyectos / slug` + back link
- **Animations:** Framer Motion (spring physics, stagger, scroll-triggered via whileInView, TiltCard 3D, parallax dot patterns, magnetic buttons, AnimatedCounter)
- **Backgrounds:** Each section has its own parallax dot pattern (blue/orange/white variants) + subtle gradient overlay + global noise grain texture for CRT feel
- **Responsive:** all sections adapt (sm/md/lg breakpoints, xs custom breakpoint)
- **Static site:** Next.js static export, Formspree contact POST (mailto: fallback), GA4 (opt-in by setting gaId)
- **Accessibility:** `prefers-reduced-motion` disables animations + scroll-snap; focus trap in mobile menu; `aria-current` on nav; keyboard carousel nav
- **Messaging:** problem-first "¿Tu negocio o club aún se maneja con Excel, WhatsApp y papeles?"

## Progress
### Done
- Framer Motion installed + `src/lib/animations.ts` with spring-based variants (fadeInUp, staggerContainer, scaleIn, slideInRight, cardHover, buttonTap)
- Landing page (`/`) refactored: server component (`page.tsx` with metadata) → client component (`HomeContent.tsx`) for motion animations
- HomeContent.tsx: scroll-triggered section reveals (whileInView), staggered grid entries for valores/servicios/pasos, spring entrance for hero, hover effects on buttons/cards
- New UI components: `TiltCard` (3D perspective on hover), `AnimatedCounter` (scroll-triggered count-up), `ParallaxDotPattern` (scroll-driven background parallax, supports color variants), `MagneticWrapper` (spring scale on hover)
- Proyectos listing page (`/proyectos`): server component + client `ProyectosContent.tsx` with card stagger entrance
- Project detail page (`/proyectos/[slug]`): server component (generateMetadata, generateStaticParams) + client `ProyectoDetalleContent.tsx` with feature list slide-in and terminal hero entrance
- Color palette changed: cyan-600/400 → amber-600/400 → **blue-600/400 primary + orange-500/400 accent** (derived from `toalesco.jpg` brand mockup)
- globals.css: CSS variables, text-gradient, text-glow, glow-card, dot patterns (`bg-dot-pattern`, `bg-dot-pattern-intense`, `bg-dot-pattern-orange`, `bg-dot-pattern-white`), shimmer, border-cyber, hero-glow, breathe-border all updated to blue/orange
- **Backgrounds improved:** All sections have parallax dot patterns with section-appropriate colors (blue for about/contact, orange for services/saas, white for how-we-work); subtle gradient overlays for depth; global CSS noise grain texture for CRT/hackerman feel
- Dark mode background set to `#000000` (pure black) with card surface `#0a0a0f`
- Terminal icon restored as brand logo (not image-based logo)
- `servicios.ts` gradient backgrounds updated (`blue-50`/`blue-950`)
- `Navbar.tsx`: removed image logo import, restored lucide Terminal icon + blue bg badge
- Build passes with all 8 static routes

### In Progress
- (none)

### Blocked
- (none)

## Key Decisions
- Logo IS the Terminal icon from lucide-react, not an image file (user clarified after image-based attempt)
- Colors derived from `toalesco.jpg` brand mockup: warm blue primary (#3B82F6/#60A5FA) + complementary orange accent (#F97316/#FB923C) on pure black dark bg
- Framer Motion instead of pure CSS for scroll-triggered animations (better spring physics, stagger control, hover effects)
- Client/server split: page.tsx server for metadata, separate "use client" component for JSX with motion
- 3D tilt on cards and parallax dot patterns add depth without breaking scroll-snap or hackerman aesthetic
- Background sections vary dot color by theme (blue for info, orange for CTAs/services, white for process)

## Next Steps
- Add WhatsApp float button (high-impact for Chilean market)
- Add testimonials / social proof section
- Add privacy policy page (Chile Ley 19.628 compliance)

## Critical Context
- Build: `npm run build` → Turbopack → static HTML
- Type check: `npm run typecheck` (`tsc --noEmit`)
- Dev: `npm run dev`
- SSG for `/proyectos/[slug]` via `generateStaticParams()`
- Client components: HomeContent, ProyectosContent, ProyectoDetalleContent, Navbar, ContactForm, ProjectCarousel, Analytics, TiltCard, AnimatedCounter, ParallaxDotPattern
- Animation variants shared from `src/lib/animations.ts`
- Formspree endpoint in `src/data/contact.ts`; set to null for mailto: fallback
- GA4 ID in `src/data/analytics.ts`; null = disabled

## Relevant Files
- `/home/iuval/Proyectos/landing/src/app/page.tsx`: Server component, renders `<HomeContent />`
- `/home/iuval/Proyectos/landing/src/components/landing/HomeContent.tsx`: Client component — landing with 7 snap sections, Framer Motion animations, parallax dots (blue/orange/white variants), magnetic buttons, TiltCard, counter, noise grain
- `/home/iuval/Proyectos/landing/src/app/proyectos/page.tsx`: Server component (metadata) + `<ProyectosContent />`
- `/home/iuval/Proyectos/landing/src/components/landing/ProyectosContent.tsx`: Client — project grid with stagger entrance, noise grain bg
- `/home/iuval/Proyectos/landing/src/app/proyectos/[slug]/page.tsx`: Server (generateMetadata, generateStaticParams) + `<ProyectoDetalleContent />`
- `/home/iuval/Proyectos/landing/src/components/landing/ProyectoDetalleContent.tsx`: Client — terminal hero, screenshot, features slide-in, noise grain bg
- `/home/iuval/Proyectos/landing/src/app/globals.css`: Tailwind v4 + shadcn + utility classes (glow, dot-pattern variants, scan-line, breathe-border, bg-noise grain) + prefers-reduced-motion — all blue/orange palette
- `/home/iuval/Proyectos/landing/src/components/landing/Navbar.tsx`: Unified navbar with Terminal icon logo, breadcrumbs, IntersectionObserver, focus trap
- `/home/iuval/Proyectos/landing/src/lib/animations.ts`: Shared Framer Motion variants (fadeInUp, staggerContainer, scaleIn, slideInRight, cardHover, buttonTap)
- `/home/iuval/Proyectos/landing/src/components/ui/TiltCard.tsx`: 3D perspective hover card
- `/home/iuval/Proyectos/landing/src/components/ui/AnimatedCounter.tsx`: Scroll-triggered number count-up
- `/home/iuval/Proyectos/landing/src/components/ui/ParallaxDotPattern.tsx`: Scroll-driven parallax dot bg with color variants
- `/home/iuval/Proyectos/landing/src/app/demo/page.tsx`: Standalone demo login page (no Navbar), noise grain bg
- `/home/iuval/Proyectos/landing/src/data/servicios.ts`: Service definitions with gradient bg strings
- `/home/iuval/Proyectos/landing/src/data/proyectos.ts`: 3 projects with image field
- `/home/iuval/Proyectos/landing/src/data/contact.ts`: Formspree endpoint + contact email
- `/home/iuval/Proyectos/landing/src/data/analytics.ts`: GA4 tracking ID config
- `/home/iuval/Proyectos/landing/public/images/gestion-clubes.svg`, `jugaviewscl.svg`, `barber.png`: Project screenshots
