# Scripts - UTBR Site

## Cloudflare Cache Clear Script

Script para acionar a limpeza do cache do Cloudflare via GitHub Actions a partir do servidor.

### Configuração

1. **Criar GitHub Personal Access Token**:
   - Acesse: https://github.com/settings/tokens
   - Gere um token com permissão `actions:write`
   - Salve o token com segurança

2. **Configurar no servidor**:
   ```bash
   # Exportar o token como variável de ambiente
   export GITHUB_TOKEN="your_github_token_here"
   
   # Ou adicionar ao ~/.bashrc para persistir
   echo 'export GITHUB_TOKEN="your_github_token_here"' >> ~/.bashrc
   source ~/.bashrc
   ```

### Uso

```bash
# Executar script de limpeza
./scripts/clear-cloudflare-cache.sh
```

### Exemplo de saída

```
🚀 Triggering Cloudflare cache clear workflow...
Repository: fbraz3/utbr-site
Workflow: cloudflare-cache.yml
Branch: master

✅ Workflow triggered successfully!
🔗 Check status at: https://github.com/fbraz3/utbr-site/actions

💡 The cache clearing process will run in GitHub Actions.
   It typically takes 1-2 minutes to complete.
```

### API Manual (alternativa)

Se preferir usar curl diretamente:

```bash
curl -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.github.com/repos/fbraz3/utbr-site/actions/workflows/cloudflare-cache.yml/dispatches" \
  -d '{"ref":"master"}'
```

### Automação no servidor

Para automatizar após deploy:

```bash
#!/bin/bash
# deploy-with-cache-clear.sh

echo "Deploying application..."
# Seus comandos de deploy aqui

echo "Clearing Cloudflare cache..."
./scripts/clear-cloudflare-cache.sh

echo "Deploy completed!"
```

### Troubleshooting

- **401 Unauthorized**: Verificar token e permissões
- **404 Not Found**: Verificar repositório e nome do workflow
- **204 No Content**: Sucesso! (resposta esperada)
