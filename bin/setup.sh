#!/bin/bash

# Site-in-a-Box: Bootstrap Script
# This script initializes the AI-powered portfolio builder

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ASCII Art Banner
print_banner() {
    echo -e "${CYAN}"
    cat << "EOF"
  ____  _ _            _               ____
 / ___|(_) |_ ___     (_)_ __         | __ )  _____  __
 \___ \| | __/ _ \____| | '_ \ _____ _|  _ \ / _ \ \/ /
  ___) | | ||  __/____| | | | |_____| | |_) | (_) >  <
 |____/|_|\__\___|    |_|_| |_|     |_|____/ \___/_/\_\

EOF
    echo -e "${NC}"
    echo -e "${PURPLE}AI-Powered Personal Portfolio Generator${NC}"
    echo ""
}

# Check for required tools
check_dependencies() {
    echo -e "${BLUE}[1/5]${NC} Checking dependencies..."

    # Check for Node.js
    if ! command -v node &> /dev/null; then
        echo -e "${RED}Error: Node.js is not installed.${NC}"
        echo "Please install Node.js 18+ from https://nodejs.org"
        exit 1
    fi

    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo -e "${RED}Error: Node.js 18+ is required. Found v${NODE_VERSION}${NC}"
        exit 1
    fi
    echo -e "  ${GREEN}✓${NC} Node.js $(node -v)"

    # Check for npm
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}Error: npm is not installed.${NC}"
        exit 1
    fi
    echo -e "  ${GREEN}✓${NC} npm $(npm -v)"

    # Check for profile.yaml
    if [ ! -f "profile.yaml" ]; then
        echo -e "  ${YELLOW}!${NC} profile.yaml not found"
        echo ""
        echo -e "${YELLOW}You need to create your profile config first:${NC}"
        echo -e "  ${CYAN}cp profile.example.yaml profile.yaml${NC}"
        echo ""
        echo "Then edit profile.yaml with your information and preferences."
        echo ""
        exit 1
    fi
    echo -e "  ${GREEN}✓${NC} profile.yaml found"

    # Check for Claude Code
    CLAUDE_CODE_INSTALLED=false
    if command -v claude &> /dev/null; then
        CLAUDE_CODE_INSTALLED=true
        echo -e "  ${GREEN}✓${NC} Claude Code detected"
    else
        echo -e "  ${YELLOW}!${NC} Claude Code not found"
    fi

    echo ""
}

# Install npm dependencies
install_dependencies() {
    echo -e "${BLUE}[2/5]${NC} Installing dependencies..."
    npm install --silent
    echo -e "  ${GREEN}✓${NC} Dependencies installed"
    echo ""
}

# Create initial data file if it doesn't exist
setup_data_file() {
    echo -e "${BLUE}[3/5]${NC} Setting up data files..."

    DATA_DIR="src/data"
    DATA_FILE="$DATA_DIR/user.json"

    if [ ! -f "$DATA_FILE" ]; then
        mkdir -p "$DATA_DIR"
        echo '{}' > "$DATA_FILE"
        echo -e "  ${GREEN}✓${NC} Created empty user.json"
    else
        echo -e "  ${GREEN}✓${NC} user.json already exists"
    fi
    echo ""
}

# Verify profile configuration
verify_profile() {
    echo -e "${BLUE}[4/5]${NC} Verifying profile configuration..."

    # Basic check that profile.yaml has been filled out
    if grep -q 'name: ""' profile.yaml; then
        echo -e "  ${YELLOW}⚠${NC}  Your profile.yaml appears to be empty"
        echo ""
        echo "Make sure you've filled out at least:"
        echo "  - name"
        echo "  - github or linkedin"
        echo "  - design preferences (or keep defaults)"
        echo ""
        echo -e "Press Enter to continue anyway, or Ctrl+C to exit and edit..."
        read -r
    else
        echo -e "  ${GREEN}✓${NC} Profile configuration looks good"
    fi
    echo ""
}

# Launch the AI agent
launch_agent() {
    echo -e "${BLUE}[5/5]${NC} Launching AI Architect..."
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "  ${GREEN}Welcome to your AI-generated portfolio.${NC}"
    echo -e "  ${GREEN}I am initializing the Architect agent now...${NC}"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    if [ "$CLAUDE_CODE_INSTALLED" = true ]; then
        # Get the directory of this script
        SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
        PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
        INSTRUCTIONS_FILE="$PROJECT_DIR/.agent/instructions.md"

        if [ -f "$INSTRUCTIONS_FILE" ]; then
            echo -e "${PURPLE}Starting Claude Code session...${NC}"
            echo ""
            echo -e "${YELLOW}I'm going to launch Claude Code now.${NC}"
            echo -e "${YELLOW}When it starts, tell Claude:${NC}"
            echo ""
            echo -e "  ${CYAN}\"I want to build my portfolio. Please read the instructions in${NC}"
            echo -e "  ${CYAN}.agent/instructions.md and help me populate my site.\"${NC}"
            echo ""
            echo -e "Press Enter to continue..."
            read -r

            # Launch Claude Code in the project directory
            cd "$PROJECT_DIR"
            exec claude
        else
            echo -e "${RED}Error: Instructions file not found at $INSTRUCTIONS_FILE${NC}"
            exit 1
        fi
    else
        echo -e "${YELLOW}Claude Code is not installed.${NC}"
        echo ""
        echo "To complete the setup, please install Claude Code:"
        echo -e "  ${CYAN}npm install -g @anthropic-ai/claude-code${NC}"
        echo ""
        echo "Then run this script again, or manually start Claude Code in this directory"
        echo "and ask it to read the instructions from .agent/instructions.md"
        echo ""
        echo -e "${GREEN}Alternatively, you can manually populate src/data/user.json${NC}"
        echo "following the schema in src/data/schema.ts"
        echo ""
        echo "To start the development server now:"
        echo -e "  ${CYAN}npm run dev${NC}"
    fi
}

# Main execution
main() {
    clear
    print_banner
    check_dependencies
    install_dependencies
    setup_data_file
    verify_profile
    launch_agent
}

main "$@"
