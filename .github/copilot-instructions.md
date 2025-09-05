# Copilot Instructions - UTBR Site

## Project Overview

This is a **modern responsive website** for the Brazilian Unreal Tournament community (UTBR). The site serves as a central hub for game downloads, server listings, and community information for classic Unreal Tournament games (UT99, UT2004, UT3).

**Architecture**: Modern vanilla JavaScript with CSS Grid/Flexbox, zero external dependencies for optimal performance.

## Architecture & File Structure

- **Main application**: `index.html` - Modern responsive version with health check marker
- **Modern assets**: `css/modern-style.css`, `js/modern-script.js`
- **Health check**: Comment marker `<!-- UTBR-SITE-HEALTH-CHECK: Application is functional -->`
- **Containerized deployment**: nginx:stable Docker container

### Key Files
- `index.html`: **Main responsive page** with health check marker and modern design
- `css/modern-style.css`: Modern CSS with custom properties, Grid, and Flexbox
- `js/modern-script.js`: ES6+ vanilla JavaScript with performance optimizations
- `Dockerfile`: nginx:stable setup for containerized deployment

## Development Patterns

### Modern CSS Architecture
- **CSS Custom Properties**: `:root` variables for theming and consistency
- **CSS Grid & Flexbox**: Modern layout without framework dependencies
- **Mobile-first**: Responsive breakpoints with `@media` queries
- **Performance optimized**: Minimal bundle size, zero external dependencies
- **Gaming theme**: Dark colors, glow effects, and UT-inspired design

### Modern JavaScript Features
- **ES6+ Classes**: Object-oriented architecture with `UTBRSite` main class
- **Web APIs**: Intersection Observer for lazy loading and scroll animations
- **Performance**: Throttled scroll events, debounced resize handlers
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Gaming features**: Konami Code easter egg, heartbeat animations

## CI/CD & Deployment

### Docker Strategy (`.github/workflows/docker-build.yml`)
1. **Triggers**: Weekly (Sunday 2AM UTC), push to master, manual dispatch
2. **Multi-platform testing**: Separate builds for amd64 and arm64 with health checks
3. **Testing process**:
   ```bash
   # Health check tests for each platform
   curl -f http://localhost:8080 > /tmp/response.html
   grep -q "UTBR-SITE-HEALTH-CHECK: Application is functional" /tmp/response.html
   grep -q "Unreal Tournament Brasil" /tmp/response.html
   ```
4. **Final deployment**: Multi-arch image push to `fbraz3/utbr-site:latest` only after tests pass

### Docker Hub Description (`.github/workflows/dockerhub-description.yml`)
- **Triggers**: Changes to `README-EN.md` or manual dispatch
- **Process**: Updates Docker Hub repository description using English README
- **Optimization**: Separated from build workflow to avoid unnecessary updates

### Cache Management (`.github/workflows/cloudflare-cache.yml`)
- **Trigger**: Manual dispatch only (`workflow_dispatch`)
- **Usage**: Called from server via GitHub API using provided script
- **Process**: Clears Cloudflare cache for both domains

### Legacy Workflow (`.github/workflows/main.yml`)
- **Status**: Manual triggers only (push/PR triggers commented out)
- **Process**: rsync deployment with Cloudflare cache clearing
- **Use case**: Backup deployment method

### Local Development
```bash
# Method 1: Direct browser (no server needed)
open index.html

# Method 2: Docker testing
docker build -t utbr-site . && docker run -p 8080:80 utbr-site

# Method 3: Docker Compose
docker-compose up  # Uses port 8080
```

## Content Management

### Server Information
- **GameTracker integration**: Real-time server banners via external API
- **Active domains**: `madruga.utbr.cf`, `x1.utbr.cf`, `copa.utbr.cf`, `2k4.utbr.cf`, `ut3.utbr.cf`
- **Banner format**: `https://cache.gametracker.com/server_info/IP:PORT/b_560_95_1.png`

### Download Links
- **External hosting**: Google Drive, MEGA, OneDrive (links may break periodically)
- **Platform matrix**: UT99 (Win/Linux/Mac), UT2004 (Win/Mac), UT3 (Win only)
- **Version notes**: Include bit architecture (32/64) in descriptions

### Community Integration
- **Social platforms**: Facebook, WhatsApp, Discord with direct chat links
- **GitHub integration**: Fork ribbon and corner widget for repository promotion

## Key Dependencies

### External CDNs
- **FontAwesome Kit**: `ec35284fbe.js` for icons (fallback: local fonts if CDN fails)
- **Google Fonts**: Inter and Orbitron fonts
- **GameTracker**: Server status banners and statistics

### Performance Optimizations
- **Zero framework dependencies**: Pure vanilla JavaScript and CSS
- **Preconnect hints**: Critical resources loaded faster
- **Lazy loading**: Images loaded on demand
- **Modern features**: ES6+, CSS Grid, Flexbox, Web APIs

## Testing & Quality Assurance

### Health Check System
- **Marker**: `<!-- UTBR-SITE-HEALTH-CHECK: Application is functional -->` in HTML
- **CI Tests**: HTTP response + content verification for essential sections
- **Local testing**: `docker run` + `curl` to verify nginx serving correctly

### Common Issues
- **GameTracker banners**: May fail if servers offline (not a deployment issue)
- **External links**: Download links from cloud providers may expire
- **Mobile layout**: Optimized for all device sizes with responsive breakpoints
- **Performance**: Modern vanilla JavaScript provides optimal performance

## License & Conventions

- **License**: Apache 2.0 (commercial-friendly, patent protection)
- **Commit style**: Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`)
- **Portuguese content**: All user-facing text in Brazilian Portuguese
- **Docker tags**: Always `latest` regardless of trigger source
- **Bilingual documentation**: 
  - `README.md`: Portuguese version (primary)
  - `README-EN.md`: English version for international audience and Docker Hub
  - **Important**: Any changes to documentation must be made in BOTH files to maintain consistency
