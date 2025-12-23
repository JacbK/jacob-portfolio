#!/bin/bash

# Update Job Agent: Add or edit work experience

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
AGENT_FILE="$PROJECT_DIR/.agent/agents/update-experience.md"

# Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m'

clear

echo -e "${CYAN}"
cat << "EOF"
  _   _           _       _         _       _
 | | | |_ __   __| | __ _| |_ ___  | | ___ | |__
 | | | | '_ \ / _` |/ _` | __/ _ \ | |/ _ \| '_ \
 | |_| | |_) | (_| | (_| | ||  __/ | | (_) | |_) |
  \___/| .__/ \__,_|\__,_|\__\___| |_|\___/|_.__/
       |_|
EOF
echo -e "${NC}"

echo -e "${GREEN}Update your work experience${NC}"
echo ""

if [ ! -f "$AGENT_FILE" ]; then
    echo "Error: Experience agent not found at $AGENT_FILE"
    exit 1
fi

cd "$PROJECT_DIR"

# Launch Claude Code with update-experience agent instructions
exec claude chat -f "$AGENT_FILE" -m "I want to update my work experience."
