# Copilot Instructions - UTBR Site

## Project Overview

This is a **static HTML website** for the Brazilian Unreal Tournament community (UTBR). The site serves as a central hub for game downloads, server listings, and community information for classic Unreal Tournament games (UT99, UT2004, UT3).

## Architecture & File Structure

- **Single-page application**: Everything is contained in `index.html`
- **Static assets**: CSS frameworks (Bootstrap, animate.css), images, and JavaScript libraries
- **No backend**: Pure HTML/CSS/JS with external links for downloads and server stats
- **Responsive design**: Mobile-first approach with extensive media queries

### Key Files
- `index.html`: Main page with sections for downloads, servers, and community info
- `style.css`: Custom styles with responsive breakpoints and theme overrides
- `js/scrollFX.js`: Custom scroll animation effects (Blocs framework)
- `css/`: Bootstrap, FontAwesome, and animation libraries
- `img/`: Game assets, logos, and background images

## Development Patterns

### CSS Architecture
- **BEM-like naming**: `.bloc`, `.bloc-lg`, `.bloc-fill-screen` for layout blocks
- **Utility classes**: `.glow-t` (text glow), `.tc-white` (text color), `.bg-*` (backgrounds)
- **Theme system**: `.d-bloc` (dark theme), `.l-bloc` (light theme)
- **Responsive breakpoints**: 1024px, 991px, 767px, 575px

### HTML Structure
- **Section-based layout**: Each major content area is a `.bloc` with full-screen potential
- **Table layouts**: Used for complex multi-column content (downloads, servers)
- **Lazy loading**: Images use `data-src` with `lazyload` class
- **Animation classes**: `animated`, `bounce`, `lightSpeedIn` from animate.css

### JavaScript Integration
- **jQuery-dependent**: All custom scripts require jQuery
- **External widgets**: GameTracker server status banners embedded via iframes
- **Scroll effects**: Custom `scrollFX.js` handles parallax and fade animations

## Build & Deployment

### GitHub Actions Workflow (`.github/workflows/main.yml`)
1. **Triggers**: Push/PR to master, manual dispatch
2. **Environment**: PHP container (Ubuntu latest)
3. **Process**:
   - Checkout code
   - Install SSH keys and packages
   - Clean repository files (`.git`, `.github`, docs)
   - Deploy via rsync to remote server
   - Set file permissions
   - Clear Cloudflare cache for two domains

### Development Workflow
```bash
# No build process required - direct file editing
# Test locally by opening index.html in browser
# Changes are deployed automatically on push to master
```

## Content Management

### Server Information
- **GameTracker integration**: Server status banners auto-update from external API
- **Manual domains**: `madruga.utbr.cf`, `x1.utbr.cf`, `copa.utbr.cf`, `2k4.utbr.cf`
- **Protocol format**: `domain:port` for game server connections

### Download Links
- **External hosting**: Google Drive, MEGA, OneDrive links
- **Platform support**: Windows (32/64-bit), Linux (64-bit), Mac (varies by game)
- **Game versions**: UT99, UT2004, UT3 with separate download sections

### Community Links
- **Social platforms**: Facebook groups, WhatsApp, Discord
- **GitHub integration**: Fork ribbon for repository promotion

## Key Dependencies

### External CDNs
- **FontAwesome Kit**: `ec35284fbe.js` for icons
- **Google Fonts**: Berkshire Swash for decorative text
- **GitHub Fork Ribbon**: CSS-only implementation

### Local Libraries
- **Bootstrap 4**: Core responsive framework
- **jQuery 3.3.1**: DOM manipulation and effects
- **Animate.css**: Pre-built CSS animations
- **Blocs framework**: Custom scroll effects and utilities

## Maintenance Notes

- **No package management**: All dependencies are vendored or CDN-linked
- **Image optimization**: Use lazy loading for all hero images
- **Mobile responsiveness**: Test on sub-tablet devices due to gaming audience
- **External link monitoring**: Download links may break - check periodically
- **Server status**: GameTracker banners may fail if servers are offline
