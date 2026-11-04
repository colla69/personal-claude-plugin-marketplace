#!/usr/bin/env bash
set -euo pipefail
mkdir -p config
cat > config/app.yaml <<'EOF_FIXTURE'
server:
  port: 8080
  # Largest file a user may upload, in megabytes. The proxy in front has its own limit.
  max_upload_mb: 10
storage:
  bucket: uploads
EOF_FIXTURE
