#!/usr/bin/env bash
set -euo pipefail
cat > package.json <<'EOF_FIXTURE'
{ "name": "admin", "private": true, "type": "module", "dependencies": { "vue": "^3.4.0" } }
EOF_FIXTURE
mkdir -p src/components
cat > src/components/HelloBanner.vue <<'EOF_FIXTURE'
<script setup>
const props = defineProps({ title: String })
</script>

<template>
  <h1 class="banner">{{ props.title }}</h1>
</template>

<style scoped>
.banner { font-size: 2rem; }
</style>
EOF_FIXTURE
