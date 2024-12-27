# Etapa 1: Construção
FROM node:18 AS builder

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar arquivos do projeto para o container
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do projeto
COPY . .

# Construir o projeto Angular para produção
RUN npm run build

# Etapa 2: Servir a aplicação
FROM nginx:alpine

# Copiar os arquivos da build para o diretório padrão do Nginx
COPY --from=builder /app/dist/sol-app-frontend /usr/share/nginx/html

# Copiar configuração personalizada do Nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 4200
EXPOSE 4200

# Comando para iniciar o Nginx
CMD ["npm", "start"]
# CMD ["nginx", "-g", "daemon off;"]
