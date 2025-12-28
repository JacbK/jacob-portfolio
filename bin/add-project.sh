#!/bin/bash

# Add Project: Add or edit a single project

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m'

clear

echo -e "${CYAN}"
cat << "EOF"
     _       _     _   ____            _           _
    / \   __| | __| | |  _ \ _ __ ___ (_) ___  ___| |_
   / _ \ / _` |/ _` | | |_) | '__/ _ \| |/ _ \/ __| __|
  / ___ \ (_| | (_| | |  __/| | | (_) | |  __/ (__| |_
 /_/   \_\__,_|\__,_| |_|   |_|  \___// |\___|\___|\__|
                                    |__/
EOF
echo -e "${NC}"

echo -e "${GREEN}Add or edit a project in your portfolio${NC}"
echo ""

cd "$PROJECT_DIR"

# Launch Claude Code with update instructions
exec claude --print "Read .agent/update.md for guidelines. I want to add or update a project in my portfolio."
