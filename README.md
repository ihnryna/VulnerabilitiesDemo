# Vulnerabilities Demo Project

Цей проєкт складається з двох частин:
- **vulnerabilities-frontend** (React + Vite + Tailwind + DaisyUI)
- **vulnerabilities-backend** (Node.js + Express)


## Запуск
### 🔧 Передумови

Переконайся, що встановлено:

- Node.js (рекомендовано 18+)
- npm

Перевірка:
```bash
node -v
npm -v
```
---
### 🎨 Frontend

Перейди в папку:
```bash
cd vulnerabilities-frontend
```
Встановити залежності:
```bash
npm install
```
Запуск:
```bash
npm run dev
```
Очікуваний результат:

В браузері:
http://localhost:5173

Ти маєш побачити:

Форму входу/реєстрації, а після входу:

<img width="216" height="109" alt="image" src="https://github.com/user-attachments/assets/ed8d78bb-1c95-4eea-b599-240cf0e82c8d" />

з робочою кнопкою Log out

якщо **раптом щось не спрацює**, тоді потрібно окремо встановити залежності:
```bash
npm install tailwindcss @tailwindcss/vite
npm install -D daisyui@latest
```

---
### ⚙️ Backend

В новому терміналі перейди в папку:
```bash
cd vulnerabilities-backend
```
Встановити залежності:
```bash
npm install
```
Запуск:

**Запустити сервер mongoDB**

Потім в консолі:
```bash
node server.js
```
Очікуваний результат:

В консолі:
```
Server listening on port 3000
MongoDB connected
```
В браузері:
http://localhost:3000

Ти маєш побачити:

<img width="224" height="106" alt="image" src="https://github.com/user-attachments/assets/02149ac5-7f06-4d74-8b3d-8d41a77c2c72" />


якщо **раптом щось не спрацює**, тоді потрібно окремо встановити залежності:
```bash
npm install express dotenv
```

---
### 🧪 Перевірка що все працює

- Frontend працює → є "Hello world!" і кнопка
- Backend працює → є "Welcome to the server"
