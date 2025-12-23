#!/bin/bash

# Rewrite Agent: Regenerate copy with new style

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
AGENT_FILE="$PROJECT_DIR/.agent/agents/regenerate-copy.md"

# Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m'

clear

echo -e "${CYAN}"
cat << "EOF"
  ____                      _ _
 |  _ \ _____      ___ __(_) |_ ___
 | |_) / _ \ \ /\ / / '__| | __/ _ \
 |  _ <  __/\ V  V /| |  | | ||  __/
 |_| \_\___| \_/\_/ |_|  |_|\__\___|

EOF
echo -e "${NC}"

echo -e "${GREEN}Regenerate your portfolio copy${NC}"
echo ""

if [ ! -f "$AGENT_FILE" ]; then
    echo "Error: Regenerate agent not found at $AGENT_FILE"
    exit 1
fi

cd "$PROJECT_DIR"

# Launch Claude Code with regenerate-copy agent instructions
exec claude chat -f "$AGENT_FILE" -m "I want to rewrite some of my portfolio content."
