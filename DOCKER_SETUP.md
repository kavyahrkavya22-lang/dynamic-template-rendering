# Running this project with Docker

This adds three containers, wired together with Docker Compose:

| Service    | What it is                          | Port (on your machine) |
|------------|--------------------------------------|-------------------------|
| `frontend` | React app, built and served by Nginx | http://localhost:8080  |
| `backend`  | Express/Node API                     | http://localhost:5000  |
| `mongo`    | MongoDB database                     | 27017 (internal)        |

The frontend's Nginx config proxies `/api/*` and `/uploads/*` to the backend
container, so the React app keeps using its existing relative `/api` calls
with no code changes.

## Files added

```
dynamic-template-engine/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── server/
│   ├── Dockerfile
│   └── .dockerignore
└── client/
    ├── Dockerfile
    ├── .dockerignore
    └── nginx.conf
```

## 1. Push the project to GitHub

```bash
cd dynamic-template-engine
git init
git add .
git commit -m "Add Docker setup for backend, frontend, and MongoDB"

# Create an empty repo on GitHub first (github.com/new), then:
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

`.gitignore` already excludes `node_modules`, build output, `.env`, and
uploaded files, so the push stays small.

## 2. Run it with Docker

You need Docker Desktop (or Docker Engine + Compose) installed locally.

```bash
cd dynamic-template-engine

# optional: set a real JWT secret (defaults to a dev value otherwise)
cp .env.example .env

docker compose up --build
```

First run builds all three images (takes a few minutes). After that:

- Frontend (the actual app, open this in your browser): **http://localhost:8080**
- Backend health check: **http://localhost:5000/api/health**

Stop everything with `Ctrl+C`, then `docker compose down` (add `-v` to also
wipe the Mongo data volume).

## 3. Get a public link to show someone (optional)

Docker alone only exposes `localhost` on your own machine. To get a link
other people can open, either:
- Deploy the containers to a cloud host (Render, Railway, an EC2/VM, etc.) — 
  the same `docker-compose.yml` works there with no changes, or
- Temporarily tunnel your local port, e.g. `ngrok http 8080`.

## Notes

- MongoDB data persists in a named Docker volume (`mongo_data`), and
  uploaded images persist in `uploads_data` — both survive `docker compose down`
  (without `-v`) and container restarts.
- `backend`'s `connectDB()` already supports `MONGODB_URI`, so no code
  change was needed there — Compose just points it at the `mongo` service.
- The frontend image takes `VITE_API_URL` as a build arg (defaults to `/api`),
  matching what `client/src/utils/api.js` already expects.
