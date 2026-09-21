# Lab 2 - Swagger, TypeScript, and Figma

This repository contains the Lab 2 Todo application, complete OpenAPI
documentation, TypeScript exercise solutions, and a Figma completion checklist.

## Run the Todo application

MongoDB must be running. Open two terminals from this repository.

Backend:

```powershell
cd backend
npm install
npm start
```

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

Open:

- Todo app: `http://localhost:5173`
- Swagger UI: `http://localhost:3000/api-docs`
- API: `http://localhost:3000/api/todos`

The backend uses `mongodb://127.0.0.1:27017/todolist_lab2` by default. Override
it with `MONGODB_URI`. Use `PORT` to change the backend port and
`CORS_ORIGINS` for a comma-separated frontend allowlist.

## Run Exercise 2-3

```powershell
cd exercises
npm install
npm run check
npm start
```

See `figma/README.md` for the Exercise 2-1 design and prototype checklist.
