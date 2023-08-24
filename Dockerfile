FROM node:18-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package*.json ./
RUN npm install next react react-dom
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]