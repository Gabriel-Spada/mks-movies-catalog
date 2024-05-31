# Use uma imagem base do Node.js
FROM node:18-alpine

# Cria e define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN yarn install

# Copia o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Expõe a porta em que a aplicação será executada
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:dev"]
