# Stage 1
FROM node:18-alpine AS builder

WORKDIR /app

COPY ../frontend/package.json ../frontend/package-lock.json ./

RUN npm ci

COPY ../frontend ./

RUN npm run build

# Stage 2 
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules

EXPOSE 8000

CMD ["npm", "start"]