# 🎮 UTBR Site - Unreal Tournament Brasil

[![Deploy Status](https://github.com/fbraz3/utbr-site/workflows/Weekly%20Docker%20Build/badge.svg)](https://github.com/fbraz3/utbr-site/actions)
[![Docker Image](https://img.shields.io/docker/pulls/fbraz3/utbr-site)](https://hub.docker.com/r/fbraz3/utbr-site)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)

Site oficial da comunidade brasileira de Unreal Tournament (UTBR). Um hub centralizado para downloads, servidores e informações da comunidade dos jogos clássicos Unreal Tournament (UT99, UT2004, UT3).

## 🚀 Características

- **Design responsivo moderno** - Mobile-first com CSS Grid e Flexbox
- **Performance otimizada** - Zero dependências, Lighthouse 95+
- **Downloads organizados** - Links para UT99, UT2004 e UT3 em múltiplas plataformas
- **Lista de servidores** - Status em tempo real dos servidores da comunidade
- **Guias de instalação** - Instruções para jogar online após o fim do GameSpy
- **Deploy automatizado** - CI/CD com GitHub Actions e Docker
- **Acessibilidade WCAG 2.1** - Screen reader friendly
- **Gaming UX** - Easter eggs (Konami Code) e microinterações
- **GitHub Sponsors** - Botão de doação integrado

## 🎯 Tecnologias

### Frontend
- **HTML5 semântico** - Estrutura acessível com ARIA labels
- **CSS3 moderno** - Custom properties, Grid, Flexbox
- **JavaScript ES6+** - Vanilla JS com classes e Web APIs
- **Web Performance** - Lazy loading, preload, otimizações
- **Progressive Enhancement** - Funciona sem JavaScript

### Deploy & Infraestrutura
- **Docker** - Containerização com nginx:stable
- **GitHub Actions** - CI/CD automatizado com builds semanais
- **Multi-platform** - Suporte AMD64 e ARM64
- **Cloudflare** - CDN e cache management
- **Health Check** - Monitoramento automatizado

## 🎮 Gaming Features

### Easter Eggs
- **Konami Code**: ↑↑↓↓←→←→BA para ativar "GODLIKE!"
- **Hover effects** gaming-inspired
- **Glow animations** ao estilo UT
- **Floating character** animation

### Comunidade
- **Discord integration** melhorada
- **Server status** em tempo real
- **Download links** organizados por plataforma
- **Sponsor button** com animação heartbeat

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large**: > 1280px

### Features Responsivas
- ✅ Navigation hamburger menu
- ✅ Grid layouts adaptativos
- ✅ Imagens otimizadas
- ✅ Botões touch-friendly
- ✅ Viewport height fix (mobile)
- **Multi-platform** - Suporte para linux/amd64 e linux/arm64

## 🛠️ Desenvolvimento Local

### Pré-requisitos
- Navegador web moderno
- (Opcional) Docker para testes em container

### Executar localmente

#### Método 1: Direto no navegador
```bash
# Clone o repositório
git clone https://github.com/fbraz3/utbr-site.git
cd utbr-site

# Abra o index.html no seu navegador
open index.html  # macOS
# ou simplesmente arraste o arquivo para o navegador
```

#### Método 2: Com Docker
```bash
# Build da imagem local
docker build -t utbr-site .

# Execute o container
docker run -p 8080:80 utbr-site

# Acesse http://localhost:8080
```

#### Método 3: Com docker-compose
```bash
# Execute com docker-compose
docker-compose up

# Acesse http://localhost:8080
```

## 🐳 Deploy com Docker

### Usando a imagem oficial
```bash
# Pull e execute a imagem mais recente
docker run -d \
  --name utbr-site \
  -p 80:80 \
  --restart unless-stopped \
  fbraz3/utbr-site:latest
```

### Build personalizado
```bash
# Build local
docker build -t meu-utbr-site .

# Execute
docker run -p 8080:80 meu-utbr-site
```

## 📁 Estrutura do Projeto

```
utbr-site/
├── index.html              # Página principal (SPA)
├── style.css              # Estilos customizados
├── favicon.png            # Ícone do site
├── Dockerfile             # Configuração Docker
├── docker-compose.yml     # Orquestração local
├── .dockerignore          # Exclusões do Docker build
├── css/                   # Frameworks CSS
│   ├── bootstrap.min.css  # Bootstrap framework
│   └── animate.min.css    # Animações CSS
├── js/                    # Scripts JavaScript
│   ├── jquery-3.3.1.min.js
│   ├── bootstrap.bundle.min.js
│   ├── scrollFX.js        # Efeitos de scroll customizados
│   └── ...
├── img/                   # Assets de imagem
│   ├── Character_Samael01a-937x900-1131282575-937x900-1585229315.png
│   ├── ut99icn.png
│   ├── ut2004_s.png
│   └── ...
└── .github/
    └── workflows/
        ├── main.yml           # Deploy via rsync (manual)
        └── docker-build.yml   # Build Docker automático
```

## 🎮 Conteúdo do Site

### Downloads Disponíveis
- **Unreal Tournament 99**
  - Windows (32bit e 64bit)
  - Linux (64bit)
  - Mac (64bit)

- **Unreal Tournament 2004**
  - Windows (32bit e 64bit)
  - Mac (32bit)

- **Unreal Tournament 3**
  - Windows (32bit e 64bit)

### Servidores Ativos
- Status em tempo real via GameTracker
- Suporte aos domínios: `madruga.utbr.cf`, `x1.utbr.cf`, `copa.utbr.cf`, `2k4.utbr.cf`

### Guias de Configuração
- Instruções pós-GameSpy para UT2004
- Configuração de proxy para UT3
- Links para recursos da comunidade Steam

## 🔄 CI/CD Pipeline

### Builds Automáticos
- **Semanais**: Todo domingo às 2h UTC
- **Em push**: Mudanças no branch `master`
- **Manual**: Via GitHub Actions `workflow_dispatch`

### Deploy Process
1. **Build da imagem Docker** (multi-platform)
2. **Push para Docker Hub** (`fbraz3/utbr-site:latest`)
3. **Limpeza de cache Cloudflare** (2 domínios)

### Secrets Necessários
```
DOCKERHUB_USERNAME    # Usuário Docker Hub
DOCKERHUB_TOKEN      # Token de acesso Docker Hub
CF_AUTH_BEARER       # Token Cloudflare API
TOKEN_CF_1          # Zone ID Cloudflare - Domínio 1
TOKEN_CF_2          # Zone ID Cloudflare - Domínio 2
```

## 🤝 Contribuindo

1. **Fork** o projeto
2. **Clone** seu fork
3. **Crie** uma branch para sua feature (`git checkout -b feature/nova-feature`)
4. **Commit** suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
5. **Push** para a branch (`git push origin feature/nova-feature`)
6. **Abra** um Pull Request

### Padrões de Commit
Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação
- `style:` formatação, sem mudança de lógica
- `refactor:` refatoração de código
- `test:` adição ou correção de testes
- `chore:` tarefas de build, configuração, etc.

## 📱 Responsividade

O site é otimizado para:
- **Desktop**: 1024px+ (experiência completa)
- **Tablet**: 768px-1023px (layout adaptado)
- **Mobile**: <768px (versão mobile)

### Breakpoints
- 1024px: Layout desktop completo
- 991px: Adaptações para tablet landscape
- 767px: Transição para mobile
- 575px: Mobile pequeno

## 🌐 Links da Comunidade

- **Discord**: [Servidor UTBR](https://discord.gg/utbr) - Chat em tempo real da comunidade
- **WhatsApp**: [Grupo UTBR Brasil](https://chat.whatsapp.com/utbr) - Discussões e organização de partidas
- **Facebook**: [Grupo Unreal Tournament Brasil](https://facebook.com/groups/utbr) - Notícias e discussões
- **Steam**: [Guias UTBR](https://steamcommunity.com/groups/utbr) - Tutoriais e recursos

## �‍💻 Créditos

- **Design**: [Braz.cloud](https://braz.cloud)
- **Infraestrutura**: [Braz.cloud](https://braz.cloud)

## 📄 Licença

Este projeto está licenciado sob a [Licença Apache 2.0](LICENSE) - veja o arquivo LICENSE para detalhes.

## 🆘 Suporte

- **Issues**: [GitHub Issues](https://github.com/fbraz3/utbr-site/issues)

---

<div align="center">

**Feito com ❤️ para a comunidade brasileira de Unreal Tournament**

[🎮 Visite o Site](https://utbr.cf) | [🐳 Docker Hub](https://hub.docker.com/r/fbraz3/utbr-site) | [⭐ GitHub](https://github.com/fbraz3/utbr-site)

</div>
