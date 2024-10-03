# Use a imagem base do Node.js
FROM node:16

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package*.json ./

# Instale as dependências, incluindo o nodemon
RUN npm install

# Instale o nodemon globalmente (caso ainda não esteja no seu package.json)
RUN npm install -g nodemon

# Copie o restante dos arquivos da aplicação
COPY . .

# Expõe a porta onde o backend rodará
EXPOSE 5000

# Comando para rodar a aplicação com nodemon
CMD ["nodemon", "app.js"]
