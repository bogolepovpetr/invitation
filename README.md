# invitation

Интерактивное приглашение (Next.js 14 + Tailwind + Framer Motion).

Путь деплоя: `http://176.117.69.231:3003/invitation`.
Локальный порт: `3355`.

## Локальный запуск

```bash
npm install
npm run dev
# → http://localhost:3355/invitation
```

## Production

```bash
npm ci
npm run build
npm run start
# слушает 0.0.0.0:3355, внешний маршрут /invitation
```

## basePath

Приложение монтируется под префиксом `/invitation`
(см. `next.config.mjs`, переменная `NEXT_PUBLIC_BASE_PATH`).
Это позволяет поставить приложение за reverse-proxy без стрипа префикса.

Сменить префикс:

```bash
NEXT_PUBLIC_BASE_PATH=/custom npm run build && npm run start
```

Или вернуть корень:

```bash
NEXT_PUBLIC_BASE_PATH= npm run build && npm run start
```

## Reverse-proxy (nginx, пример)

```nginx
location /invitation/ {
    proxy_pass http://127.0.0.1:3355;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## systemd unit (пример)

```ini
[Unit]
Description=invitation (Next.js)
After=network.target

[Service]
WorkingDirectory=/opt/invitation
Environment=NODE_ENV=production
Environment=PORT=3355
Environment=NEXT_PUBLIC_BASE_PATH=/invitation
ExecStart=/usr/bin/npm run start
Restart=always
User=www-data

[Install]
WantedBy=multi-user.target
```

## Ассеты

- `public/audio/background.mp3` — фоновая музыка
- `public/video/message.mp4` — видео-сообщение (опционально, при отсутствии
  показывается плейсхолдер)
- `public/video/poster.jpg` — постер для видео (опционально)
