# ---- Backend: Node + Express + MongoDB ----
FROM node:20-alpine

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the backend source
COPY . .

# Make sure the uploads folder exists (for multer disk storage)
RUN mkdir -p uploads

EXPOSE 5000

CMD ["node", "server.js"]
