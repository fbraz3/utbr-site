# Copilot Instructions - UTBR Site

## Project Overview

This is a **modern responsive gaming website** for the Brazilian Unreal Tournament community (UTBR). The site serves as a central hub for game downloads, real-time server status, and community engagement for classic UT games (UT99, UT2004, UT3).

**Architecture**: Migrated from jQuery/Bootstrap to modern vanilla JavaScript with CSS Grid/Flexbox. Zero external dependencies for optimal performance and gaming-optimized UX.

## Key Files & Structure

```
index.html              # Main SPA with health check marker
css/modern-style.css    # CSS Grid/Flexbox with custom properties
js/modern-script.js     # ES6+ UTBRSite class with Web APIs
Dockerfile              # nginx:stable container
.github/workflows/      # Multi-platform CI/CD with health checks
```

## Development Patterns

### CSS Architecture
- **Custom Properties**: All spacing, colors, and breakpoints in `:root` variables
- **Gaming Theme**: Dark background (`--bg-primary: #0a0a0a`), orange accent (`--primary-color: #ff6b35`), glow effects
- **Responsive Strategy**: Mobile-first with `minmax()` grids that adapt from single column to multi-column
- **Performance**: `will-change: transform` on animated elements, optimized image rendering

### JavaScript Patterns
- **Main Class**: `UTBRSite` handles all functionality through modular methods
- **Event Management**: Throttled scroll (16ms), debounced resize (250ms) for performance
- **Mobile Navigation**: GitHub corner hidden on mobile, sponsor/GitHub links integrated into hamburger menu
- **Accessibility**: ARIA labels, keyboard navigation, focus indicators with `:focus-visible`

### Mobile-First Responsive Design
```css
/* Desktop */
.servers-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }

/* Mobile */
@media (max-width: 768px) {
  .servers-grid { grid-template-columns: 1fr; }
  .github-corner { display: none; } /* Prevents menu conflicts */
}
```

## Critical Workflows

### Local Development
```bash
# Direct browser (no server needed)
open index.html

# Docker testing with health check
docker build -t utbr-site . && docker run -p 8080:80 utbr-site
curl -f http://localhost:8080 | grep "UTBR-SITE-HEALTH-CHECK"
```

### CI/CD Pattern
- **Health Check**: Must include `<!-- UTBR-SITE-HEALTH-CHECK: Application is functional -->` in HTML
- **Multi-platform**: Separate AMD64/ARM64 builds with individual health verification
- **Professional Branding**: All contact links use `braz.cloud` domain (not email addresses)

## GameTracker Integration

**Critical Pattern**: Real-time server banners with fallback handling
```html
<img src="https://cache.gametracker.com/server_info/madruga.utbr.cf:7777/b_560_95_1.png"
     onerror="this.src='img/pageload-spinner.gif'; this.alt='Servidor temporariamente indisponível';">
```

**Domains**: `madruga.utbr.cf`, `x1.utbr.cf`, `copa.utbr.cf`, `2k4.utbr.cf`, `ut3.utbr.cf`

## Project-Specific Conventions

### Gaming UX Features
- **Konami Code**: ↑↑↓↓←→←→BA triggers "GODLIKE!" message
- **Sponsor Button**: Pink gradient with heartbeat animation (`animation: heartbeat 2s ease-in-out infinite`)
- **Server Cards**: Clickable banners with hover scale effects and loading shimmer

### Content Guidelines
- **Portuguese Content**: All user-facing text in Brazilian Portuguese
- **Bilingual Docs**: Changes to `README.md` must be mirrored in `README-EN.md`
- **Conventional Commits**: `feat:`, `fix:`, `docs:`, `chore:` format required

### Performance Optimizations
- **Preconnect**: GameTracker, Google Fonts, FontAwesome domains
- **Image Loading**: `loading="lazy"` with shimmer effects during load
- **CSS Grid**: Responsive without media queries using `minmax()` and `auto-fit`

When editing this codebase, maintain the gaming aesthetic, ensure mobile-first responsive design, and preserve the health check marker for CI/CD functionality.
