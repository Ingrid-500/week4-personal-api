# Week 4 Assignment: Personal Information API

A REST API built with **Node.js** and **Express** for the Week 4 Web Application Development assignment.

## Requirements

- Node.js 18 or newer
- npm

## Installation

1. Open this project folder in Visual Studio Code.
2. Open the VS Code terminal (**Terminal → New Terminal**).
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open `http://localhost:3000` in your browser or API testing tool.

For automatic restart during development, use `npm run dev`.

## API endpoints

The server uses `http://localhost:3000` as its base URL.

| Method | Endpoint | Description | Success status |
|---|---|---|---|
| GET | `/about` | Returns the owner's personal profile | 200 |
| GET | `/skills` | Returns all skills | 200 |
| GET | `/skills/:id` | Returns one skill by its numeric ID | 200 |
| POST | `/contact` | Accepts a contact message | 201 |
| GET | `/search?q=keyword` | Searches the profile and skills | 200 |

### GET /about

Example: `GET http://localhost:3000/about`

Returns the personal profile as JSON.

### GET /skills

Example: `GET http://localhost:3000/skills`

Returns an array of skills, including each skill's ID, name, category and level.

### GET /skills/:id

Example: `GET http://localhost:3000/skills/1`

Replace `1` with the ID of the skill you want. A non-numeric or non-positive ID returns 400. An ID that does not exist returns 404.

### POST /contact

Example: `POST http://localhost:3000/contact`

Set the request header `Content-Type: application/json` and send this JSON body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "I would like to get in touch."
}
```

All three fields are required. The email must have a valid basic email format. A successful submission returns 201. Contact messages are stored in memory for this assignment and are cleared when the server restarts; no database is configured.

### GET /search?q=keyword

Example: `GET http://localhost:3000/search?q=python`

Searches the profile and skills without regard to letter case. The `q` query parameter is required; if it is missing or empty, the API returns 400.

## Error handling

All API responses, including errors, are JSON.

- **400 Bad Request:** invalid input, missing required search query, invalid contact data, or malformed JSON.
- **404 Not Found:** unknown route or a skill ID that does not exist.
- **500 Internal Server Error:** unexpected server-side errors. Internal error details are not exposed to clients.

Example error response:

```json
{
  "success": false,
  "error": {
    "status": 404,
    "message": "Route GET /nothing-here not found"
  }
}
```

## Middleware and project structure

- `requestLogger` logs the HTTP method, URL, response status and request duration.
- `express.json()` parses JSON request bodies and is registered before the routes.
- `notFoundHandler` returns a JSON 404 response for unknown paths.
- `errorHandler` converts malformed JSON and unexpected errors into JSON responses.
- Each endpoint group is separated into its own `express.Router()` file.

```text
week4-personal-api/
├── src/
│   ├── app.js
│   ├── data/
│   │   ├── contacts.js
│   │   └── profile.js
│   ├── middleware/
│   │   ├── errorHandlers.js
│   │   └── requestLogger.js
│   └── routes/
│       ├── aboutRoutes.js
│       ├── contactRoutes.js
│       ├── searchRoutes.js
│       └── skillRoutes.js
├── tests/
│   └── api.test.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Run tests

Install dependencies first, then run:

```bash
npm test
```

The tests check the required endpoints, validation, JSON error responses, and unknown routes.

## GitHub submission

Do not upload `node_modules`. The `.gitignore` file already excludes it.

```bash
git init
git add .
git commit -m "Complete Week 4 Personal Information API"
```

Create a GitHub repository named `week4-personal-api`, then connect it and push:

```bash
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the URL of the repository you create. Do not commit passwords, API keys or private credentials.
