<p align="center">
    <img src="https://e-strategiapublica.com/wp-content/uploads/2021/02/logo-blanco.png" alt="e-strategiapublica" width="300"/>
</p>

# Sol App Frontend

Projeto desenvolvido com [Angular CLI](https://github.com/angular/angular-cli) na versão **15.1.3**.

---

## 🚀 Iniciando o Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento, utilize o comando abaixo:

```bash
ng serve
```

O aplicativo estará disponível em [http://localhost:4200](http://localhost:4200).

---

## 🛠️ Gerando Componentes e Outros Artefatos

Use o comando abaixo para gerar novos componentes:

```bash
ng generate component nome-do-componente
```

Também é possível gerar diretivas, pipes, services, classes, guards, interfaces, enums e módulos:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module nome
```

---

## 📁 Build do Projeto

Para realizar o build do projeto, execute:

```bash
ng build
```

Os arquivos serão gerados no diretório `dist/`.

---

## 🌐 Rodando a Aplicação com Docker

### Passo 1: Criar os Arquivos Necessários

**Dockerfile:**

```Dockerfile
FROM node:16

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]
```

**docker-compose.yml:**

```yaml
version: '3'
services:
  frontend:
    build: .
    ports:
      - "4200:4200"
    volumes:
      - .:/app
    networks:
      - sol-network

networks:
  sol-network:
    driver: bridge
```

### Passo 2: Construir e Iniciar os Containers

Na raiz do projeto, execute:

```bash
docker-compose up --build
```

A aplicação estará disponível em [http://localhost:4200](http://localhost:4200).

### Passo 3: Parar os Containers

Para parar a aplicação, execute:

```bash
docker-compose down
```

> ⚠️ Certifique-se de ter o **Docker** e o **Docker Compose** instalados na sua máquina.

---

## 📊 Testes

### Testes Unitários

Para executar testes unitários com o [Karma](https://karma-runner.github.io), utilize:

```bash
ng test
```

### Testes End-to-End

Para executar testes end-to-end:

```bash
ng e2e
```

É necessário adicionar um pacote que implemente as funcionalidades de testes end-to-end antes de usar este comando.

---

## 🌐 Internacionalização (i18n)

### Arquivos de Tradução

Os arquivos de tradução estão localizados no diretório `src/assets/i18n` na branch `feature/add-change-language`. Os idiomas disponíveis são:

- `en.json` (Inglês)
- `es.json` (Espanhol)
- `fr.json` (Francês)
- `pt.json` (Português)

### Como Adicionar um Novo Idioma

1. Crie um novo arquivo JSON no diretório `src/assets/i18n`.
2. Copie o conteúdo de um arquivo existente (ex: `en.json`).
3. Traduza as chaves para o idioma desejado.

Os arquivos JSON são usados para traduzir o conteúdo do diretório `src/app` para os respectivos idiomas.

---

## 🔧 Ajuda Adicional

Para mais informações sobre o Angular CLI:

```bash
ng help
```

Ou acesse a [documentação oficial do Angular CLI](https://angular.io/cli).

---

**Desenvolvido por e-strategiapublica** 🚀

---

**Licença:** Este projeto está licenciado sob os termos da licença AGPL-3.0.