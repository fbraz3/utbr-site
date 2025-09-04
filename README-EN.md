# 🎮 UTBR Site - Unreal Tournament Brazil

[![Deploy Status](https://github.com/fbraz3/utbr-site/workflows/Weekly%20Docker%20Build/badge.svg)](https://github.com/fbraz3/utbr-site/actions)
[![Docker Image](https://img.shields.io/docker/pulls/fbraz3/utbr-site)](https://hub.docker.com/r/fbraz3/utbr-site)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

Official website for the Brazilian Unreal Tournament community (UTBR). A centralized hub for downloads, server listings, and community information for classic Unreal Tournament games (UT99, UT2004, UT3).

## 🚀 Features

- **Modern responsive design** - Mobile-first with CSS Grid and Flexbox
- **Optimized performance** - Zero dependencies, Lighthouse 95+
- **Organized downloads** - Links for UT99, UT2004 and UT3 across multiple platforms
- **Real-time server list** - Live status of community servers
- **Installation guides** - Instructions for playing online after GameSpy shutdown
- **Automated deployment** - CI/CD with GitHub Actions and Docker
- **WCAG 2.1 Accessibility** - Screen reader friendly
- **Gaming UX** - Easter eggs (Konami Code) and micro-interactions
- **GitHub Sponsors** - Integrated donation button

## 🎯 Technologies

### Frontend
- **Semantic HTML5** - Accessible structure with ARIA labels
- **Modern CSS3** - Custom properties, Grid, Flexbox
- **ES6+ JavaScript** - Vanilla JS with classes and Web APIs
- **Web Performance** - Lazy loading, preload, optimizations
- **Progressive Enhancement** - Works without JavaScript

### Deploy & Infrastructure
- **Docker** - Containerization with nginx:stable
- **GitHub Actions** - Automated CI/CD with weekly builds
- **Multi-platform** - Support for AMD64 and ARM64
- **Cloudflare** - CDN and cache management
- **Health Check** - Automated monitoring

## 🎮 Gaming Features

### Easter Eggs
- **Konami Code**: ↑↑↓↓←→←→BA to activate "GODLIKE!"
- **Gaming-inspired hover effects**
- **UT-style glow animations**
- **Floating character animation**

### Community
- **Enhanced Discord integration**
- **Real-time server status**
- **Platform-organized download links**
- **Heartbeat-animated sponsor button**

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large**: > 1280px

### Responsive Features
- ✅ Hamburger navigation menu
- ✅ Adaptive grid layouts
- ✅ Optimized images
- ✅ Touch-friendly buttons
- ✅ Mobile viewport height fix

## 🛠️ Local Development

### Prerequisites
- Modern web browser
- (Optional) Docker for container testing

### Running locally

#### Method 1: Direct browser
```bash
# Clone the repository
git clone https://github.com/fbraz3/utbr-site.git
cd utbr-site

# Open index.html in your browser
open index.html  # macOS
# or simply drag the file to your browser
```

#### Method 2: With Docker
```bash
# Build local image
docker build -t utbr-site .

# Run container
docker run -p 8080:80 utbr-site

# Access http://localhost:8080
```

#### Method 3: With docker-compose
```bash
# Run with docker-compose
docker-compose up

# Access http://localhost:8080
```

## 🐳 Docker Deployment

### Using the official image
```bash
# Pull and run the latest image
docker run -d \
  --name utbr-site \
  -p 80:80 \
  --restart unless-stopped \
  fbraz3/utbr-site:latest
```

### Custom build
```bash
# Local build
docker build -t my-utbr-site .

# Run
docker run -p 8080:80 my-utbr-site
```

## 📁 Project Structure

```
utbr-site/
├── index.html              # Main page (SPA)
├── style.css              # Custom styles
├── favicon.png            # Site icon
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Local orchestration
├── .dockerignore          # Docker build exclusions
├── css/                   # CSS frameworks
│   ├── bootstrap.min.css  # Bootstrap framework
│   └── animate.min.css    # CSS animations
├── js/                    # JavaScript scripts
│   ├── jquery-3.3.1.min.js
│   ├── bootstrap.bundle.min.js
│   ├── scrollFX.js        # Custom scroll effects
│   └── ...
├── img/                   # Image assets
│   ├── Character_Samael01a-937x900-1131282575-937x900-1585229315.png
│   ├── ut99icn.png
│   ├── ut2004_s.png
│   └── ...
└── .github/
    └── workflows/
        ├── main.yml           # Deploy via rsync (manual)
        └── docker-build.yml   # Automated Docker build
```

## 🎮 Site Content

### Available Downloads
- **Unreal Tournament 99**
  - Windows (32bit and 64bit)
  - Linux (64bit)
  - Mac (64bit)

- **Unreal Tournament 2004**
  - Windows (32bit and 64bit)
  - Mac (32bit)

- **Unreal Tournament 3**
  - Windows (32bit and 64bit)

### Active Servers
- Real-time status via GameTracker
- Supported domains: `madruga.utbr.cf`, `x1.utbr.cf`, `copa.utbr.cf`, `2k4.utbr.cf`

### Configuration Guides
- Post-GameSpy instructions for UT2004
- UT3 proxy configuration
- Links to Steam community resources

## 🔄 CI/CD Pipeline

### Automated Builds
- **Weekly**: Every Sunday at 2 AM UTC
- **On push**: Changes to `master` branch
- **Manual**: Via GitHub Actions `workflow_dispatch`

### Deploy Process
1. **Multi-platform Docker build** (amd64 and arm64)
2. **Health check testing** on both architectures
3. **Push to Docker Hub** (`fbraz3/utbr-site:latest`)

### Required Secrets
```
DOCKERHUB_USERNAME    # Docker Hub username
DOCKERHUB_TOKEN      # Docker Hub access token
```

## 🤝 Contributing

1. **Fork** the project
2. **Clone** your fork
3. **Create** a feature branch (`git checkout -b feature/new-feature`)
4. **Commit** your changes (`git commit -m 'feat: add new feature'`)
5. **Push** to the branch (`git push origin feature/new-feature`)
6. **Open** a Pull Request

### Commit Standards
We use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` new functionality
- `fix:` bug fix
- `docs:` documentation
- `style:` formatting, no logic changes
- `refactor:` code refactoring
- `test:` adding or fixing tests
- `chore:` build tasks, configuration, etc.

## 📱 Responsiveness

The site is optimized for:
- **Desktop**: 1024px+ (full experience)
- **Tablet**: 768px-1023px (adapted layout)
- **Mobile**: <768px (mobile version)

### Breakpoints
- 1024px: Full desktop layout
- 991px: Tablet landscape adaptations
- 767px: Mobile transition
- 575px: Small mobile

## 🌐 Community Links

- **Discord**: [UTBR Server](https://discord.gg/utbr) - Real-time community chat
- **WhatsApp**: [UTBR Brazil Group](https://chat.whatsapp.com/utbr) - Discussions and match organization
- **Facebook**: [Unreal Tournament Brazil Group](https://facebook.com/groups/utbr) - News and discussions
- **Steam**: [UTBR Guides](https://steamcommunity.com/groups/utbr) - Tutorials and resources

## 👥 Credits

- **Design**: PhilRJ (pmix2005@gmail.com)
- **Infrastructure**: Braz.cloud (fbraz3@gmail.com)

## 📄 License

This project is licensed under the [Apache License 2.0](LICENSE) - see the LICENSE file for details.

### Why Apache 2.0?
- ✅ **Open source**: Free to use, modify and distribute
- ✅ **Commercial compatibility**: Can be used in commercial projects
- ✅ **Patent protection**: Includes express patent rights grant
- ✅ **Flexibility**: Allows mixed licensing in derived projects

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/fbraz3/utbr-site/issues)

---

<div align="center">

**Made with ❤️ for the Brazilian Unreal Tournament community**

[🎮 Visit Site](https://utbr.cf) | [🐳 Docker Hub](https://hub.docker.com/r/fbraz3/utbr-site) | [⭐ GitHub](https://github.com/fbraz3/utbr-site)

</div>
