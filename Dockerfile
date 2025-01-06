FROM node:18-alpine

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости и vite глобально
RUN npm install
RUN npm install -g vite

# Копируем исходный код
COPY . .

EXPOSE 5173

# Запускаем в dev режиме
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]