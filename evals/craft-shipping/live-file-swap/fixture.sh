#!/usr/bin/env bash
set -euo pipefail
mkdir -p dist/css scripts
cat > .env.example <<'EOF'
SFTP_HOST=
SFTP_USER=
SFTP_ROOT=
EOF
cat > .gitignore <<'EOF'
.env
EOF
cat > dist/index.html <<'EOF'
<h1>Riverside Bakery</h1><link rel="stylesheet" href="css/site.css">
EOF
cat > dist/menu.html <<'EOF'
<h1>Menu</h1><link rel="stylesheet" href="css/site.css">
EOF
cat > dist/css/site.css <<'EOF'
h1 { color: #553311; }
EOF
