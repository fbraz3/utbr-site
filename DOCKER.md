# Docker Deployment Guide

## Docker Image

The UTBR site is now available as a Docker image: `fbraz3/utbr-site`

### Running the Container

```bash
# Pull and run the latest image
docker run -d -p 80:80 --name utbr-site fbraz3/utbr-site:latest

# Or using docker-compose
docker-compose up -d
```

### Available Tags

- `latest`: Always the latest build from any trigger (schedule, push, PR, manual)

### Build Schedule

- **Weekly builds**: Every Sunday at 2 AM UTC
- **On push**: Automatic builds when code changes are pushed to master
- **Manual**: Can be triggered manually via GitHub Actions

### Server Deployment

On your server, you can deploy using:

```bash
# Pull the latest image
docker pull fbraz3/utbr-site:latest

# Stop and remove old container
docker stop utbr-site || true
docker rm utbr-site || true

# Run new container
docker run -d \
  --name utbr-site \
  -p 80:80 \
  --restart unless-stopped \
  fbraz3/utbr-site:latest
```

### Development

For local development:

```bash
# Build locally
docker build -t utbr-site .

# Run locally
docker run -p 8080:80 utbr-site

# Or use docker-compose
docker-compose up
```

Visit http://localhost:8080 to view the site.
