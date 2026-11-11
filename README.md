# GitHub Pinned Repositories

Generates a JSON containing the pinned repositories of a GitHub profile.

# Installation
Node.js v15+ required

`npm install` 

# Usage

Run: `./script.sh https://github.com/{username}`

# Output

In the same directory:
  1. ./output.html - result of cURL GET request, parsed in the Node.js script
  2. ./repos.json - JSON containing the pinned repositories
