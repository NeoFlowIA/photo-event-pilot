# ====== BUILD ======
FROM node:20-alpine AS build
WORKDIR /app
# Instala dependências com cache eficiente
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
# Use o gerenciador disponível (npm por padrão)
RUN if [ -f pnpm-lock.yaml ]; then \
      npm i -g pnpm && pnpm i --frozen-lockfile; \
    elif [ -f yarn.lock ]; then \
      corepack enable && yarn install --frozen-lockfile; \
    else \
      npm ci; \
    fi

# Copia o restante e faz o build
COPY . .
# Se precisar de variáveis Vite, defina-as em build com --build-arg e ENV:
# ARG VITE_API_URL
# ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ====== RUNTIME (Nginx) ======
FROM nginx:1.27-alpine AS runtime
# Config SPA com fallback para /index.html
COPY <<'NGINXCONF' /etc/nginx/conf.d/default.conf
server {
  listen 80;
  server_name _;

  # Arquivos estáticos do Vite
  root /usr/share/nginx/html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache básico para assets
  location ~* \.(?:js|mjs|css|png|jpg|jpeg|gif|svg|ico|woff2?)$ {
    try_files $uri =404;
    access_log off;
    add_header Cache-Control "public, max-age=31536000, immutable";
  }
}
NGINXCONF

# Copia o build
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
