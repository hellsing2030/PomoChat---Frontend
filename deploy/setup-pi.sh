#!/bin/bash
set -euo pipefail

SITE_NAME="pomochat"
WEB_ROOT="/var/www/pomochat"
NGINX_AVAILABLE="/etc/nginx/sites-available/${SITE_NAME}"
NGINX_ENABLED="/etc/nginx/sites-enabled/${SITE_NAME}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "==> Instalando nginx..."
sudo apt update
sudo apt install -y nginx

echo "==> Preparando carpeta web..."
sudo mkdir -p "${WEB_ROOT}"
sudo chown -R "${USER}:${USER}" "${WEB_ROOT}"

echo "==> Configurando sitio nginx..."
sudo cp "${SCRIPT_DIR}/nginx-pomochat.conf" "${NGINX_AVAILABLE}"
sudo ln -sf "${NGINX_AVAILABLE}" "${NGINX_ENABLED}"
sudo rm -f /etc/nginx/sites-enabled/default

echo "==> Verificando nginx..."
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl restart nginx

PI_IP="$(hostname -I | awk '{print $1}')"
echo ""
echo "Listo. Sube el build con deploy/deploy.sh desde tu PC."
echo "Luego abre en tu red local: http://${PI_IP}"
