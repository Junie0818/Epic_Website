# Design System: Epic SJSU

## Design Tokens & Palette

### Colors
- **Navy Primary**: `#0B1B3D` (Deep collegiate navy)
- **Navy Secondary**: `#162850` (Rich night sky blue)
- **Navy Surface**: `#1E3567` (Card border & elevated background)
- **Gold Primary**: `#D4AF37` (Classic warm gold)
- **Gold Hover**: `#E5A823` (Vibrant golden amber)
- **Gold Subtle**: `rgba(212, 175, 55, 0.12)` (Tinted badge backgrounds)
- **Silver Accent**: `#94A3B8` (Refined cool slate)
- **Silver Light**: `#E2E8F0` (Border dividers & card strokes)
- **Canvas Base**: `#FAF9F6` (Warm alabaster off-white)
- **Surface White**: `#FFFFFF` (Pristine card surface)
- **Text Primary**: `#0F172A` (Charcoal navy, high contrast)
- **Text Secondary**: `#475569` (Slate grey, balanced readability)
- **Text Muted**: `#64748B` (Subtle captions and timestamps)

### Typography
- **Headings**: `font-serif`: 'Playfair Display', Georgia, serif (Weight: 600, 700)
- **Body & Controls**: `font-sans`: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif (Weight: 400, 500, 600, 700)

### Spacing & Elevation
- **Border Radii**:
  - `sm`: 6px
  - `md`: 12px
  - `lg`: 20px
  - `full`: 9999px
- **Box Shadows**:
  - `shadow-sm`: 0 2px 8px rgba(11, 27, 61, 0.04)
  - `shadow-md`: 0 10px 25px -5px rgba(11, 27, 61, 0.08), 0 8px 10px -6px rgba(11, 27, 61, 0.04)
  - `shadow-lg`: 0 20px 35px -10px rgba(11, 27, 61, 0.12), 0 10px 15px -5px rgba(11, 27, 61, 0.06)
  - `shadow-gold`: 0 8px 24px -4px rgba(212, 175, 55, 0.35)

### Rules & Prohibitions
1. **NO EMOJIS**: Strictly forbidden in all headings, body text, buttons, alerts, and canvas exports. Vector SVGs must be used for all graphical indicators (calendars, clocks, pins, arrows, user badges, checkmarks).
2. **Whitespace & Negative Space**: Keep sections uncrowded. Maintain min 80px vertical section rhythm on desktop.
3. **Tactile Interactive States**: All buttons, links, and cards must feature subtle `translateY(-2px)` and shadow lift transitions on hover.
