#!/usr/bin/env bash
set -euo pipefail
mkdir -p Sources/Core Sources/App
cat > Package.swift <<'SW'
// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "Shop",
    targets: [
        .target(name: "Core"),
        .executableTarget(name: "App", dependencies: ["Core"]),
    ]
)
SW
cat > Sources/App/main.swift <<'SW'
print("shop")
SW
