#!/bin/bash

# Configure Claude Code to auto-approve web tools

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${CYAN}Configuring Claude Code auto-approval...${NC}"
echo ""

# Create .claude directory if it doesn't exist
mkdir -p "$HOME/.claude"

# Create or update settings.json
SETTINGS_FILE="$HOME/.claude/settings.json"

if [ -f "$SETTINGS_FILE" ]; then
    echo -e "${YELLOW}Existing settings found at:${NC}"
    echo "  $SETTINGS_FILE"
    echo ""
    echo "Current contents:"
    cat "$SETTINGS_FILE"
    echo ""
    read -p "Overwrite? (y/n): " overwrite
    if [ "$overwrite" != "y" ]; then
        echo "Cancelled"
        exit 0
    fi
fi

# Write settings
cat > "$SETTINGS_FILE" << 'EOF'
{
  "autoApproveTools": ["web_fetch", "web_search"]
}
EOF

echo -e "${GREEN}✓ Created: $SETTINGS_FILE${NC}"
echo ""
echo "Contents:"
cat "$SETTINGS_FILE"
echo ""
echo -e "${GREEN}Claude Code will now auto-approve web searches and fetches!${NC}"
echo ""
echo "You can manually edit this file to add more auto-approved tools:"
echo -e "  ${CYAN}code $SETTINGS_FILE${NC}"
