#!/usr/bin/env bash
# This is the installer from https://cli.cname.dev

set -e

# Function to output error messages
error() {
  echo "Error: $1" >&2
  exit 1
}

# Detect OS and architecture
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

case $ARCH in
x86_64)
  ARCH="x64"
  ;;
arm64 | aarch64)
  ARCH="arm64"
  ;;
*)
  error "Unsupported architecture: $ARCH"
  ;;
esac

case $OS in
linux | darwin) ;;
*)
  error "Unsupported operating system: $OS"
  ;;
esac

# Set installation directory
INSTALL_DIR="/usr/local/bin"
[ -d "$INSTALL_DIR" ] || INSTALL_DIR="$HOME/.local/bin"

# Ensure the installation directory exists and is in PATH
mkdir -p "$INSTALL_DIR"
[[ ":$PATH:" != *":$INSTALL_DIR:"* ]] && echo "Warning: $INSTALL_DIR is not in your PATH. You may need to add it manually."

# Get the latest release URL
RELEASE_URL=$(curl -s https://api.github.com/repos/cnamedev/cli/releases/latest | grep "browser_download_url.*cnamed-$OS-$ARCH.tar.gz" | cut -d '"' -f 4)

if [ -z "$RELEASE_URL" ]; then
  error "Failed to find the download URL for cnamed-$OS-$ARCH.tar.gz"
fi

# Download and install
echo "Downloading cnamed for $OS-$ARCH..."
curl -sL "$RELEASE_URL" | tar xz -C "$INSTALL_DIR"

# Make the binary executable
chmod +x "$INSTALL_DIR/cnamed-$OS-$ARCH"

# Create a symlink without the OS and ARCH suffix
ln -sf "$INSTALL_DIR/cnamed-$OS-$ARCH" "$INSTALL_DIR/cnamed"

echo "cnamed has been installed to $INSTALL_DIR/cnamed"
echo "You can now run it using the 'cnamed' command."
