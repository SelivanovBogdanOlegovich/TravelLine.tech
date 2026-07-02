# TravelLine

TravelLine — full stack веб-приложение для карьерной страницы IT-компании. Проект включает публичный frontend, REST API на Express и административную панель для управления контентом. Данные хранятся в JSON-файле и редактируются через интерфейс админки без ручного изменения файлов.

## Возможности

- публичная карьерная страница;
- административная панель;
- редактирование контента сайта;
- REST API для frontend и админки;
- хранение данных в JSON-файле;
- запуск через Docker Compose;
- production-сборка frontend через nginx.

## Технологии

**Frontend**

- React
- TypeScript
- Vite

**Backend**

- Node.js
- Express
- TypeScript

**Хранилище**

- JSON

**Контейнеризация**

- Docker
- Docker Compose

## Структура проекта

```text
TravelLine.tech/
+-- frontend/
+-- backend/
+-- docs/
+-- README.md
`-- docker-compose.yml
```

## Запуск через Docker

Из корневой директории проекта:

```bash
docker compose up --build
```

После запуска будут доступны:

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Административная панель: http://localhost:5173/admin

Backend хранит редактируемый контент в файле:

```text
backend/src/data/content.json
```

Директория с данными подключается как volume, поэтому изменения, сделанные через административную панель, сохраняются на хост-машине.

Остановить приложение:

```bash
docker compose down
```

## Запуск без Docker

Установить зависимости и запустить backend:

```bash
cd backend
npm install
npm run dev
```

Установить зависимости и запустить frontend:

```bash
cd frontend
npm install
npm run dev
```

Проверка production-сборки:

```bash
cd backend
npm run build
```

```bash
cd frontend
npm run lint
npm run build
```

## Архитектура

```text
React
|
REST API
|
Express
|
content.json
```

## Автор

Проект разработан в рамках учебной работы.

При реализации использовались ChatGPT и OpenAI Codex как инструменты проектирования, консультирования, ревизии кода и ускорения разработки.
