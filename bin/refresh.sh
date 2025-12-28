#!/bin/bash

# Refresh: Update portfolio from GitHub/LinkedIn

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

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

cd "$PROJECT_DIR"

# Launch Claude Code with refresh instructions
exec claude --print "Read .agent/update.md and .agent/skills/research.md. I want to refresh my portfolio data. Please check GitHub and LinkedIn for any updates since the last build."
