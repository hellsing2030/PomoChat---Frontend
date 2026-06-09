#!/bin/bash
set -euo pipefail

PI_USER="${PI_USER:-sebas}"
PI_HOST="${PI_HOST:-raspberrypi.local}"
PI_PATH="${PI_PATH:-/var/www/pomochat}"
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> Build del proyecto..."
cd "${PROJECT_ROOT}"
npm run build

echo "==> Subiendo archivos a ${PI_USER}@${PI_HOST}:${PI_PATH} ..."
ssh "${PI_USER}@${PI_HOST}" "mkdir -p ${PI_PATH}"
scp -r dist/* "${PI_USER}@${PI_HOST}:${PI_PATH}/"

echo ""
echo "Deploy completado."
echo "Abre: http://${PI_HOST}"
echo "Si no resuelve el hostname, usa la IP de la Pi."
