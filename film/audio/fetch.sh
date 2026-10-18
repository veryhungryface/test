#!/bin/bash
# Download generated audio listed in sources.tsv into audio/src
cd "$(dirname "$0")"; mkdir -p src
while IFS=$'\t' read -r name url; do curl -sS --max-time 60 -o "src/$name.mp3" "$url" && echo "ok $name"; done < sources.tsv
