FROM node:18-alpine

WORKDIR /app

# Создаем и настраиваем пользователя node
RUN chown -R node:node /app

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