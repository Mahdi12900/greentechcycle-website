# GreenTechCycle — Premium Chatbot Widget Report

## Summary

Replaced the generic chat icon button with a premium, human-centric sales assistant widget featuring "Sophie Martin" — a professional advisor persona with a real photo, interactive chat panel, typing animations, and quick action buttons.

## Changes Made

### 1. Photo Avatar (`public/images/sophie-martin.jpg`)
- Downloaded a professional corporate woman photo from Unsplash (400x400, face-cropped)
- Used as the floating button avatar (60px circle) and in chat header/messages

### 2. Widget Redesign (`src/components/SalesAssistantWidget.tsx`)

**Floating Button (bottom-right):**
- Circular photo avatar replacing the old gradient icon button
- Green "En ligne" badge with ping animation
- Smooth spring entrance animation (framer-motion)
- Hover scale effect, dark overlay with X icon when open

**Auto-bubble (after 4 seconds):**
- "Besoin d'aide ? Échangeons !" tooltip appears after 4s
- Fade-in + slide-up animation
- Dismissible with mini close button
- Disappears when chat panel opens

**Chat Panel:**
- Header: Sophie's photo + name "Sophie Martin — Conseillère GreenTechCycle" + green online indicator
- Welcome message with typing animation (1.5s delay, bouncing dots)
- Message bubbles: Sophie's messages (left, slate bg) and user messages (right, green gradient)
- 4 Quick Actions in 2x2 grid: Demander une démo, Obtenir un devis, En savoir plus, Parler à un expert
- Text input field with Enter-to-send and send button
- Footer with phone + email contacts
- Elegant close button (top-right X)
- Smooth slide-up/fade-in panel animation

**User Interaction:**
- User can type messages; Sophie responds with a polite auto-reply after 2s typing indicator
- Quick actions link to /demo, /contact, /services pages
- Full i18n support (FR/EN) via `useLocale()`

### 3. CSS Additions (`src/app/globals.css`)
- Typing dots keyframe animation (`typing-bounce`)
- Animation delay utility classes
- Custom scrollbar styles for chat message area

### 4. Integration
- Already integrated in `src/app/[locale]/layout.tsx` — visible on ALL pages
- No layout changes needed (component was already imported)

## Design Specs
- **Palette:** Primary #0D503C, Accent #10B981 (emerald), Secondary #1E3A5F
- **Animations:** Framer Motion (spring, fade-in, scale, slide-up)
- **Responsive:** Full mobile support with `w-[calc(100vw-2rem)]` and max-width constraints
- **Shadows:** Soft `shadow-2xl shadow-black/15`, emerald glow on buttons
- **Typography:** Inter font, 11-15px range, proper hierarchy

## Build & Deploy
- `next build`: SUCCESS (no errors)
- Server running on port 5000 (`next start -H 0.0.0.0 -p 5000`)
- Verified: HTTP 200 on `/fr`

## Preview URL
`https://5000-${PREVIEW_SUBDOMAIN_SUFFIX}.${PREVIEW_DOMAIN}/`

## Files Modified
| File | Action |
|------|--------|
| `src/components/SalesAssistantWidget.tsx` | Complete rewrite |
| `src/app/globals.css` | Added typing animation + scrollbar styles |
| `public/images/sophie-martin.jpg` | New file (Unsplash photo) |
