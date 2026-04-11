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

<img width="271" height="168" alt="image" src="https://github.com/user-attachments/assets/d0f9a301-2f90-4db9-bedf-3fb42cbb39a9" />


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
```bash
node server.js
```
Очікуваний результат:

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
