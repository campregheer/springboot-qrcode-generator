# 🚀 QR Code Generator

Uma aplicação **Full Stack** para geração de QR Codes, desenvolvida com **React + Spring Boot**. O usuário informa um texto ou URL, a aplicação gera um QR Code, faz o upload da imagem para o **Amazon S3** e retorna um link para acesso.

## 📸 Preview

> ![2026-07-20_12-47.png](2026-07-20_12-47.png)

---

## ✨ Funcionalidades

- 🔗 Gerar QR Codes a partir de textos ou URLs
- ☁️ Upload automático da imagem para o Amazon S3
- 🌐 Retorno da URL da imagem gerada
- 📋 Copiar o link gerado
- 📥 Download do QR Code
- 📱 Interface moderna e responsiva
- ⚡ Comunicação entre Frontend e Backend via API REST

---

## 🛠️ Tecnologias

### Frontend
- React
- TypeScript
- Vite
- Axios
- Tailwind CSS

### Backend
- Java 17
- Spring Boot
- Maven
- ZXing (QR Code Generator)
- AWS SDK v2

### Cloud & DevOps
- Amazon S3
- Docker
- Git
- GitHub

---

## 📂 Estrutura do Projeto

```
qr-code-generator/
├── backend/
│   ├── src/
│   ├── pom.xml
│   ├── Dockerfile
│   └── run.sh
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## ⚙️ Configuração

### Backend

Crie um arquivo `.env` na pasta `backend`:

```env
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_KEY
AWS_REGION=us-east-1
AWS_BUCKET_NAME=YOUR_BUCKET_NAME
```

Execute:

```bash
./run.sh
```

Ou:

```bash
set -a
source .env
set +a
./mvnw spring-boot:run
```

A API ficará disponível em:

```
http://localhost:8080
```

---

### Frontend

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env`:

```env
VITE_API_URL=http://localhost:8080
```

Execute:

```bash
npm run dev
```

O frontend ficará disponível em:

```
http://localhost:5173
```

---

## 🐳 Docker

### Backend

Build da imagem:

```bash
docker build -t qr-code-generator .
```

Executar:

```bash
docker run --env-file .env -p 8080:8080 qr-code-generator
```

---

## 📡 API

### Gerar QR Code

**POST**

```
/qrcode
```

### Body

```json
{
  "text": "https://github.com"
}
```

### Resposta

```json
{
  "url": "https://your-bucket.s3.us-east-1.amazonaws.com/xxxxxxxx.png"
}
```

---



## 👨‍💻 Autor

**Daniel Campregher Junior**

- GitHub: https://github.com/campregheer
- LinkedIn: https://www.linkedin.com/in/daniel-campregher-junior-101482352/

---

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo e portfólio.