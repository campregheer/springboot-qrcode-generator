# QR Code Generator API

A REST API built with Spring Boot that generates QR Codes from text, uploads the generated images to Amazon S3, and returns the image URL.

## 🚀 Technologies

- Java 21
- Spring Boot
- Maven
- Amazon S3 (AWS SDK v2)
- ZXing
- Docker

## 📌 Features

- Generate QR Codes from text
- Upload images to Amazon S3
- Return the QR Code URL
- Dockerized application

## ▶️ Running with Docker

```bash
docker build -t qr-code-generator .
docker run --env-file .env -p 8080:8080 qr-code-generator
```

## 📬 Endpoint

```
POST /qrcode
```

Request

```json
{
  "text": "https://github.com"
}
```

Response

```json
{
  "url": "https://..."
}
```
