# ==============================
# Stage 1: Dependencies
# ==============================
# Usamos Node.js Alpine por su tamaño pequeño
FROM node:22.18.0-alpine3.22 AS deps

# Instalamos compatibilidad con libc6 (necesario en algunas librerías de Node.js en Alpine)
RUN apk add --no-cache libc6-compat

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos solo los archivos necesarios para instalar dependencias
# package.json: lista de dependencias
# package-lock.json: versión exacta de cada dependencia
COPY package.json package-lock.json ./

# Instalamos todas las dependencias exactamente como aparecen en package-lock.json
# `npm ci` es más rápido y reproducible que `npm install`
RUN npm ci

# ==============================
# Stage 2: Build
# ==============================
FROM node:22.18.0-alpine3.22 AS builder

WORKDIR /app

# Copiamos los node_modules ya instalados desde la etapa de deps
COPY --from=deps /app/node_modules ./node_modules

# Copiamos todo el código fuente de la aplicación
COPY . .

# Ejecutamos el script de build definido en package.json (por ejemplo, "build": "tsc")
RUN npm run build

# ==============================
# Stage 3: Production
# ==============================
FROM node:22.18.0-alpine3.22 AS runner

# Directorio de trabajo de la imagen final
WORKDIR /usr/src/app

# Copiamos nuevamente package.json y package-lock.json para instalar solo dependencias de producción
COPY package.json package-lock.json ./

# Instalamos solo las dependencias necesarias para producción
RUN npm ci --only=production

# Copiamos los archivos construidos desde la etapa de build
COPY --from=builder /app/dist ./dist

# Comando que se ejecuta al iniciar el contenedor
CMD ["node", "dist/main"]
