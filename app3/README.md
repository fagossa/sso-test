# app3 — NGINX proxy

This NGINX container proxies requests to your local Vite dev servers so both apps appear on the same host+port under different paths.

- `/app1/` → `http://host.docker.internal:5173/` (app1 dev server)
- `/app2/` → `http://host.docker.internal:5175/` (app2 dev server)

Prerequisites

- Docker Desktop (for `host.docker.internal`)
- Both dev servers running locally:

```bash
# from repo root (or each app folder)
cd app1 && npm run dev
cd app2 && npm run dev
```

Build and run the proxy

```bash
# build
docker build -t app3-nginx ./app3

# run (the --add-host option maps host.docker.internal to the host gateway)
docker run -p 80:80 --add-host=host.docker.internal:host-gateway app3-nginx
```

Open in browser:

- http://localhost/app1/
- http://localhost/app2/

Notes

- We updated each app's `vite.config.js` to set `base` to `/app1/` and `/app2/` so assets load correctly when proxied.
- Session storage and cookies will now share origin because both apps are served from the same host and port (`http://localhost`).
- If Docker on your system doesn't support `host-gateway`, replace `host.docker.internal` accordingly or run NGINX directly on the host.

## Update & rebuild commands

When you change code in `app1` or `app2` and want to rebuild the containers (production build served by NGINX), use one of the following commands from the repository root.

- Rebuild all services and restart:

```bash
docker-compose build
docker-compose up -d
```

- Rebuild and restart a single service (example: `app1`):

```bash
docker-compose build app1
docker-compose up -d app1
```

- Rebuild the proxy only (if you changed `app3` config or static pages):

```bash
docker-compose build app3
docker-compose up -d app3
```

- Stop and remove containers:

```bash
docker-compose down
```

- View live logs:

```bash
docker-compose logs -f
```

Notes:

- The `Dockerfile` for `app1` and `app2` runs `npm run build` and serves `dist` via NGINX inside the container. If you'd prefer live dev with HMR, run `npm run dev` locally in the app folders instead of building the images.
- If you previously ran the standalone `docker run` with `--add-host=host.docker.internal:host-gateway`, you can stop that container before using `docker-compose` to avoid port conflicts.
