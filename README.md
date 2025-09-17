# 📚 Books API Backend

API REST para buscar y obtener libros usando **Google Books API**, construida con **NestJS**, **TypeScript** y **Clean Architecture**.

---

## 🔹 Características

- Búsqueda de libros por título.
- Obtención de libro por ID.
- Arquitectura limpia (**Domain**, **Application**, **Infrastructure**, **Interface**).
- DTOs con validación (`class-validator`).
- Documentación automática con Swagger.

---

## 🔹 Tecnologías

- Node.js 20+
- NestJS
- TypeScript
- Axios
- Class-validator
- Swagger (`@nestjs/swagger`)

---

## 🔹 Instalación

1. Clonar el repositorio:

````bash
git clone https://github.com/usuario/books-backend.git
cd books-backend

2. Instalar dependencias
```bash
npm install

3. Ejecutar la aplicacion en modo desarrollo
npm run start:dev

La app correrá por defecto en http://localhost:3000.
````

🔹 Swagger

## La documentación automática está disponible en:

http://localhost:3000/api

Permite:

- Ver todos los endpoints.

- Probar búsquedas y obtener libros.

🔹 Endpoints

GET /books?q= Buscar libros por título
GET /books/:id Obtener un libro por ID
