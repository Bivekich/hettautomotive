FROM node:18-alpine

WORKDIR /app

# Создаем пользователя node
USER node

# Копируем package.json и package-lock.json
COPY --chown=node:node package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY --chown=node:node . .

EXPOSE 5173

# Запускаем в dev режиме
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]