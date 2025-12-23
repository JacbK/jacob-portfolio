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
    echo -e "${YELLOW}Existing settings found. Merging...${NC}"

    # Check if autoApproveTools already exists
    if grep -q "autoApproveTools" "$SETTINGS_FILE"; then
        echo -e "${GREEN}✓ autoApproveTools already configured${NC}"
        exit 0
    fi

    # Backup existing file
    cp "$SETTINGS_FILE" "$SETTINGS_FILE.backup"

    # Merge with existing settings using jq if available, otherwise manual merge
    if command -v jq &> /dev/null; then
        jq '. + {"autoApproveTools": ["web_fetch", "web_search"]}' "$SETTINGS_FILE.backup" > "$SETTINGS_FILE"
    else
        # Manual merge: inject autoApproveTools with proper comma handling
        # Remove the last closing brace
        sed '$ d' "$SETTINGS_FILE.backup" > "$SETTINGS_FILE"
        # Add comma to last line if it doesn't have one and isn't just opening brace
        if tail -1 "$SETTINGS_FILE" | grep -v "^{" | grep -qv ",$"; then
            sed -i.bak '$ s/$/,/' "$SETTINGS_FILE" && rm -f "$SETTINGS_FILE.bak"
        fi
        echo '  "autoApproveTools": ["web_fetch", "web_search"]' >> "$SETTINGS_FILE"
        echo '}' >> "$SETTINGS_FILE"
    fi
else
    # Create new file
    cat > "$SETTINGS_FILE" << 'EOF'
{
  "autoApproveTools": ["web_fetch", "web_search"]
}
EOF
fi

echo -e "${GREEN}✓ Created: $SETTINGS_FILE${NC}"
echo ""
echo "Contents:"
cat "$SETTINGS_FILE"
echo ""
echo -e "${GREEN}Claude Code will now auto-approve web searches and fetches!${NC}"
echo ""
echo "You can manually edit this file to add more auto-approved tools:"
echo -e "  ${CYAN}code $SETTINGS_FILE${NC}"
