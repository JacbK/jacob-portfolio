#!/bin/bash

# Persona: Setup Script

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

clear

echo -e "${CYAN}"
cat << "EOF"
    ____
   / __ \___  ______________  ____  ____ _
  / /_/ / _ \/ ___/ ___/ __ \/ __ \/ __ `/
 / ____/  __/ /  (__  ) /_/ / / / / /_/ /
/_/    \___/_/  /____/\____/_/ /_/\__,_/

EOF
echo -e "${NC}"

echo -e "${GREEN}AI-Powered Portfolio Generator${NC}"
echo ""

cd "$PROJECT_DIR"

# Step 1: Install dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${CYAN}[1/3]${NC} Installing dependencies..."
    npm install > /dev/null 2>&1
    echo -e "  ${GREEN}✓${NC} Dependencies installed"
else
    echo -e "${CYAN}[1/3]${NC} Dependencies already installed"
fi

# Step 2: Check for profile.yaml
if [ ! -f "profile.yaml" ]; then
    echo ""
    echo -e "${CYAN}[2/3]${NC} Opening config UI..."
    echo ""
    echo -e "  ${CYAN}→${NC} Fill out your name (required)"
    echo -e "  ${CYAN}→${NC} Pick design inspirations (optional)"
    echo -e "  ${CYAN}→${NC} Click ${GREEN}'Save to Project'${NC} when done"
    echo -e "  ${CYAN}→${NC} Then press Ctrl+C here to continue"
    echo ""

    # Start dev server
    npm run dev

    # After they stop the server
    echo ""
    if [ ! -f "profile.yaml" ]; then
        echo -e "${YELLOW}No profile.yaml found.${NC}"
        echo "  Run ./bin/setup.sh again after saving your config."
        exit 1
    fi
else
    echo ""
    echo -e "${CYAN}[2/3]${NC} Found profile.yaml ✓"
fi

# Step 3: Detect CLI tool and launch
echo ""
echo -e "${CYAN}[3/3]${NC} Launching AI generator..."
echo ""

# Read CLI preference from profile.yaml
CLI_TOOL="claude-code"
if [ -f "profile.yaml" ]; then
    CLI_FROM_FILE=$(grep "^cli:" profile.yaml | sed 's/cli: *"\([^"]*\)".*/\1/' | tr -d ' ')
    if [ ! -z "$CLI_FROM_FILE" ]; then
        CLI_TOOL="$CLI_FROM_FILE"
    fi
fi

echo -e "${GREEN}The AI will now:${NC}"
echo "  • Research you online (GitHub, web search)"
echo "  • Generate your content & design"
echo "  • Self-grade and iterate"
echo "  • Build your portfolio"
echo ""

# Launch the appropriate CLI
cd "$PROJECT_DIR"

case "$CLI_TOOL" in
    "claude-code")
        # Auto-configure Claude settings
        if [ ! -f "$HOME/.claude/settings.json" ] || ! grep -q "autoApproveTools" "$HOME/.claude/settings.json" 2>/dev/null; then
            echo -e "${CYAN}Configuring Claude auto-approval...${NC}"
            "$SCRIPT_DIR/configure-claude.sh"
            echo ""
        fi

        echo ""
        echo -e "${CYAN}Starting Claude Code...${NC}"
        echo ""
        echo -e "When Claude starts, say:"
        echo -e "  ${GREEN}\"Read .agent/instructions.md and build my portfolio\"${NC}"
        echo ""
        exec claude
        ;;

    "codex")
        echo -e "${CYAN}Starting GitHub Codex...${NC}"
        echo ""
        echo -e "When Codex starts, say:"
        echo -e "  ${GREEN}\"Read .agent/instructions.md and build my portfolio\"${NC}"
        echo ""
        exec codex
        ;;

    "gemini")
        echo -e "${CYAN}Starting Google Gemini CLI...${NC}"
        echo ""
        echo -e "When Gemini starts, say:"
        echo -e "  ${GREEN}\"Read .agent/instructions.md and build my portfolio\"${NC}"
        echo ""
        exec gemini
        ;;

    "aider")
        echo -e "${CYAN}Starting Aider...${NC}"
        echo ""
        exec aider --read .agent/instructions.md
        ;;

    "cursor")
        echo -e "${CYAN}Opening Cursor AI...${NC}"
        echo ""
        echo -e "${YELLOW}Note:${NC} Cursor doesn't have a CLI mode."
        echo "  1. Open this project in Cursor"
        echo "  2. Read .agent/instructions.md"
        echo "  3. Say: 'Build my portfolio following these instructions'"
        echo ""
        if command -v cursor &> /dev/null; then
            cursor "$PROJECT_DIR"
        else
            echo "Cursor not found. Please open the project manually."
        fi
        ;;

    "other"|*)
        echo -e "${YELLOW}Custom CLI selected${NC}"
        echo ""
        echo "To use your AI tool:"
        echo "  1. Launch your preferred AI coding assistant"
        echo "  2. Open this project directory"
        echo "  3. Say: 'Read .agent/instructions.md and build my portfolio'"
        echo ""
        echo "Press Enter to exit..."
        read -r
        ;;
esac
