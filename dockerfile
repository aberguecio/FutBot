# Usa una imagen base de Node.js
FROM node:18-buster

# Instala las dependencias necesarias para Puppeteer
RUN apt-get update && apt-get install -y \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libgtk-3-0 \
    libnss3 \
    libxshmfence1 \
    libglu1-mesa \
    curl

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia solo package.json y package-lock.json
COPY package.json ./

# Instala las dependencias con salida detallada
RUN npm install --verbose

# Copia el resto del código fuente
COPY . .

# Verifica la conectividad a npm registry (opcional)
RUN curl -I https://registry.npmjs.org/whatsapp-web.js

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
