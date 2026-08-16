#!/bin/bash
# vercel-build.sh

# Install Git LFS if not already installed
if ! command -v git-lfs &> /dev/null; then
    echo "Installing Git LFS..."
    curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
    sudo apt-get install git-lfs
fi

# Initialize and pull LFS files
git lfs install
git lfs pull

# Run the build
npm run build