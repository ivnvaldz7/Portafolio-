FROM node:22-alpine AS builder

WORKDIR /app

# Instalar dependencias
COPY package.json package-lock.json* ./
RUN npm install

# Copiar resto del código y buildear
COPY . .
RUN npm run build

# Stage 2: Runner
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Solo copiamos el build y las dependencias de producción
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist

# Instalar solo dependencias de producción
RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "run", "start"]
