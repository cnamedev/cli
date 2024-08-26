#!/bin/bash

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

# Define common bin paths that are typically in PATH
COMMON_BIN_PATHS=(
  "$HOME/.local/bin"
  "$HOME/bin"
  "/usr/local/bin"
  "/opt/bin"
)

# Find the first writable bin path
INSTALL_DIR=""
for path in "${COMMON_BIN_PATHS[@]}"; do
  if [ -d "$path" ] && [ -w "$path" ]; then
    INSTALL_DIR="$path"
    break
  fi
done

# If no writable path found in common directories, use $HOME/.local/bin and create it
if [ -z "$INSTALL_DIR" ]; then
  INSTALL_DIR="$HOME/.local/bin"
  mkdir -p "$INSTALL_DIR"
fi

echo "Installing to: $INSTALL_DIR"

# Get the latest release URL
RELEASE_URL=$(curl -s https://api.github.com/repos/cnamedev/cli/releases/latest | grep "browser_download_url.*cnamed-$OS-$ARCH.tar.gz" | cut -d '"' -f 4)

if [ -z "$RELEASE_URL" ]; then
  error "Failed to find the download URL for cnamed-$OS-$ARCH.tar.gz"
fi

# Create a temporary directory
TMP_DIR=$(mktemp -d)

# Download and install
echo "Downloading cnamed for $OS-$ARCH..."
if ! curl -sL "$RELEASE_URL" -o "$TMP_DIR/cnamed.tar.gz"; then
  error "Failed to download cnamed-$OS-$ARCH.tar.gz"
fi

# Extract the tar.gz file
if ! tar -xzf "$TMP_DIR/cnamed.tar.gz" -C "$TMP_DIR"; then
  error "Failed to extract cnamed-$OS-$ARCH.tar.gz"
fi

# Move the binary to the installation directory
if ! mv "$TMP_DIR/cnamed-$OS-$ARCH" "$INSTALL_DIR/"; then
  error "Failed to move cnamed-$OS-$ARCH to $INSTALL_DIR"
fi

# Make the binary executable
if ! chmod +x "$INSTALL_DIR/cnamed-$OS-$ARCH"; then
  error "Failed to make cnamed-$OS-$ARCH executable"
fi

# Create a symlink without the OS and ARCH suffix
if ! ln -sf "$INSTALL_DIR/cnamed-$OS-$ARCH" "$INSTALL_DIR/cnamed"; then
  error "Failed to create symlink for cnamed"
fi

# Clean up
rm -rf "$TMP_DIR"

echo "cnamed has been installed to $INSTALL_DIR/cnamed"
echo "You can now run it using the 'cnamed' command."

# Provide instructions if $HOME/.local/bin or $HOME/bin was used
if [[ "$INSTALL_DIR" == "$HOME/.local/bin" || "$INSTALL_DIR" == "$HOME/bin" ]]; then
  echo "To use cnamed from any directory, make sure $INSTALL_DIR is in your PATH."
  echo "If it's not, you can add it by running:"
  echo "echo 'export PATH=\$PATH:$INSTALL_DIR' >> ~/.$(basename $SHELL)rc && source ~/.$(basename $SHELL)rc"
fi
