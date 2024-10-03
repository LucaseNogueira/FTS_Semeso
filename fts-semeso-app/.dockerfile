# Use a imagem base do Node.js
FROM node:20.15.1

# Defina o diretório de trabalho como a raiz do projeto
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos (inclui "public" e "src")
COPY . .

# Construa o aplicativo
RUN npm run build

# Expõe a porta onde o React.js rodará
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
