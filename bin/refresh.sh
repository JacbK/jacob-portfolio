#!/bin/bash

# Refresh Agent: Update portfolio from GitHub/LinkedIn

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
AGENT_FILE="$PROJECT_DIR/.agent/agents/refresh.md"

# Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m'

clear

echo -e "${CYAN}"
cat << "EOF"
  ____       __               _
 |  _ \ ___ / _|_ __ ___  ___| |__
 | |_) / _ \ |_| '__/ _ \/ __| '_ \
 |  _ <  __/  _| | |  __/\__ \ | | |
 |_| \_\___|_| |_|  \___||___/_| |_|

EOF
echo -e "${NC}"

echo -e "${GREEN}Refreshing portfolio data from GitHub/LinkedIn...${NC}"
echo ""

if [ ! -f "$AGENT_FILE" ]; then
    echo "Error: Refresh agent not found at $AGENT_FILE"
    exit 1
fi

cd "$PROJECT_DIR"

# Launch Claude Code with refresh agent instructions
exec claude chat -f "$AGENT_FILE" -m "I want to refresh my portfolio data. Please check GitHub and LinkedIn for any updates since the last build."
