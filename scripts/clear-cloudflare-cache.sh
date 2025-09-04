#!/bin/bash

# Cloudflare Cache Clear - GitHub Actions Trigger
# 
# This script triggers the Cloudflare cache clearing workflow
# from your server using GitHub Actions API
#
# Prerequisites:
# 1. GitHub Personal Access Token with 'actions:write' permission
# 2. Set GITHUB_TOKEN environment variable
#
# Usage:
#   export GITHUB_TOKEN="your_github_token_here"
#   ./clear-cloudflare-cache.sh

set -e

# Configuration
REPO_OWNER="fbraz3"
REPO_NAME="utbr-site"
WORKFLOW_ID="cloudflare-cache.yml"
REF="master"

# Check if GitHub token is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN environment variable is not set"
    echo "Please set your GitHub Personal Access Token:"
    echo "export GITHUB_TOKEN=\"your_token_here\""
    exit 1
fi

echo "🚀 Triggering Cloudflare cache clear workflow..."
echo "Repository: $REPO_OWNER/$REPO_NAME"
echo "Workflow: $WORKFLOW_ID"
echo "Branch: $REF"
echo ""

# Trigger the workflow
RESPONSE=$(curl -s -w "%{http_code}" \
    -X POST \
    -H "Accept: application/vnd.github.v3+json" \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Content-Type: application/json" \
    "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/actions/workflows/$WORKFLOW_ID/dispatches" \
    -d "{\"ref\":\"$REF\"}")

# Extract HTTP status code and response body
HTTP_CODE="${RESPONSE: -3}"
BODY="${RESPONSE%???}"

if [ "$HTTP_CODE" -eq 204 ]; then
    echo "✅ Workflow triggered successfully!"
    echo "🔗 Check status at: https://github.com/$REPO_OWNER/$REPO_NAME/actions"
    echo ""
    echo "💡 The cache clearing process will run in GitHub Actions."
    echo "   It typically takes 1-2 minutes to complete."
elif [ "$HTTP_CODE" -eq 401 ]; then
    echo "❌ Authentication failed (HTTP $HTTP_CODE)"
    echo "Please check your GitHub token permissions."
    echo "Required: 'actions:write' scope"
    exit 1
elif [ "$HTTP_CODE" -eq 404 ]; then
    echo "❌ Workflow not found (HTTP $HTTP_CODE)"
    echo "Please check the repository and workflow file exist."
    exit 1
else
    echo "❌ Request failed (HTTP $HTTP_CODE)"
    echo "Response: $BODY"
    exit 1
fi
