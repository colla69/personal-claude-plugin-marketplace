#!/usr/bin/env bash
set -euo pipefail
git init -q .
mkdir -p dist scripts
cat > .gitignore <<'IGN'
node_modules/
IGN
echo '<h1>Shop</h1>' > dist/index.html
cat > scripts/deploy.sh <<'DEP'
#!/usr/bin/env bash
# Uploads dist/ to the live server.
set -euo pipefail
lftp -u "$FTP_USER,$FTP_PASSWORD" "$FTP_HOST" -e "mirror -R dist/ /htdocs/; quit"
DEP
chmod +x scripts/deploy.sh
