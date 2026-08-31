#!/usr/bin/env bash
set -euo pipefail
quarto render
printf "\nBuilt:\n  docs/index.html\n  docs/index.pdf\n"
