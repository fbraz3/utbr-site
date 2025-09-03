# Copilot Instructions - UTBR Site

## Project Overview

This is a **static HTML website** for the Brazilian Unreal Tournament community (UTBR). The site serves as a central hub for game downloads, server listings, and community information for classic Unreal Tournament games (UT99, UT2004, UT3).

**Key Change**: Recently migrated from rsync deployment to Docker-based containerization strategy.

## Architecture & File Structure

- **Single-page application**: Everything is contained in `index.html` with health check comment `<!-- UTBR-SITE-HEALTH-CHECK: Application is functional -->`
- **Static assets**: CSS frameworks (Bootstrap, animate.css), images, and JavaScript libraries
- **No backend**: Pure HTML/CSS/JS with external links for downloads and server stats
- **Containerized deployment**: nginx:alpine Docker container serving static files

### Key Files
- `index.html`: Main page with health check marker for CI/CD testing
- `Dockerfile`: Simple nginx:alpine setup copying files to `/usr/share/nginx/html/`
- `docker-compose.yml`: Local development with port 8080:80 mapping
- `.dockerignore`: Excludes docs, git files, and IDE configs from container
- `js/scrollFX.js`: Custom Blocs framework scroll effects (jQuery-dependent)

## Development Patterns

### CSS Architecture
- **BEM-like naming**: `.bloc`, `.bloc-lg`, `.bloc-fill-screen` for layout blocks
- **Utility classes**: `.glow-t` (text glow), `.tc-white` (text color), `.bg-*` (backgrounds)
- **Theme system**: `.d-bloc` (dark theme), `.l-bloc` (light theme)
- **Responsive breakpoints**: 1024px, 991px, 767px, 575px

### HTML Structure
- **Health check integration**: Comment marker for automated testing
- **Section-based layout**: Each major content area is a `.bloc` with full-screen potential
- **Table layouts**: Used for complex multi-column content (downloads, servers)
- **Lazy loading**: Images use `data-src` with `lazyload` class

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
- **Google Fonts**: Berkshire Swash decorative font
- **GitHub Fork Ribbon**: CSS-only implementation

### Local Libraries (Vendored)
- **Bootstrap 4**: Core responsive framework
- **jQuery 3.3.1**: Required for all custom scripts
- **Animate.css**: Pre-built CSS animations (`animated`, `bounce`, `lightSpeedIn`)
- **Blocs framework**: Custom scroll effects via `scrollFX.js`

## Testing & Quality Assurance

### Health Check System
- **Marker**: `<!-- UTBR-SITE-HEALTH-CHECK: Application is functional -->` in HTML
- **CI Tests**: HTTP response + content verification for essential sections
- **Local testing**: `docker run` + `curl` to verify nginx serving correctly

### Common Issues
- **GameTracker banners**: May fail if servers offline (not a deployment issue)
- **External links**: Download links from cloud providers may expire
- **Mobile layout**: Test sub-tablet devices due to gaming audience
- **JavaScript dependencies**: All custom scripts require jQuery to be loaded first

## License & Conventions

- **License**: Apache 2.0 (commercial-friendly, patent protection)
- **Commit style**: Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`)
- **Portuguese content**: All user-facing text in Brazilian Portuguese
- **Docker tags**: Always `latest` regardless of trigger source
