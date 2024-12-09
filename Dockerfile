FROM node:22.12.0-alpine3.19
WORKDIR /app
COPY . .
RUN npm install && npm run build
RUN npm ci --omit dev
EXPOSE 4006
ENV NODE_ENV=production
CMD ["node", "build/index.js"]