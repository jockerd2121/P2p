FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install -g serve
COPY public/ ./public
COPY src/ ./src
EXPOSE 5000
CMD ["serve", "-s", "public", "-l", "5000"]