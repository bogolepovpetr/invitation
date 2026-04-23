# Deploy на 176.117.69.231

**Итоговый URL:** `http://176.117.69.231:3035/invitation`

- внутренний/production порт: `3035`
- локальная разработка: `3355`
- basePath: `/invitation` (Next.js сам префиксует ассеты)
- репо: `https://github.com/bogolepovpetr/invitation.git`

## 1. Предусловия на сервере

Нужен Node.js 20+ и git. Проверить:

```bash
node -v    # должно быть v20.x или новее
npm -v
git --version
```

Если нет Node.js:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git
```

## 2. Клонировать и собрать

```bash
sudo mkdir -p /opt/invitation
sudo chown -R $USER:$USER /opt/invitation
git clone https://github.com/bogolepovpetr/invitation.git /opt/invitation
cd /opt/invitation
npm ci
npm run build
```

Сборка должна завершиться строкой `✓ Compiled successfully`.

## 3. Открыть порт 3035 в фаерволе

UFW (Ubuntu/Debian):

```bash
sudo ufw allow 3035/tcp
sudo ufw reload
```

Либо iptables (если UFW не используется):

```bash
sudo iptables -A INPUT -p tcp --dport 3035 -j ACCEPT
```

На облачных VPS (Timeweb, Selectel, Yandex Cloud и т.п.) может
дополнительно требоваться открыть порт в панели — security group /
сетевой ACL.

## 4. Разовый тест (foreground)

```bash
cd /opt/invitation
npm run start:prod
```

Должно вывести:

```
▲ Next.js 14.2.15
- Local:        http://localhost:3035
✓ Ready in …ms
```

Проверить из браузера:

- `http://176.117.69.231:3035/invitation` → работает
- `http://176.117.69.231:3035/` → 404 (ожидаемо, basePath ограничивает)

Остановить — `Ctrl+C`.

## 5. Постоянный запуск — systemd

Создать unit-файл:

```bash
sudo nano /etc/systemd/system/invitation.service
```

Содержимое (подставь свой `User=` если не `root`):

```ini
[Unit]
Description=invitation (Next.js)
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/invitation
Environment=NODE_ENV=production
Environment=NEXT_PUBLIC_BASE_PATH=/invitation
ExecStart=/usr/bin/npm run start:prod
Restart=always
RestartSec=3
User=root

[Install]
WantedBy=multi-user.target
```

Запуск:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now invitation
sudo systemctl status invitation      # должно быть active (running)
journalctl -u invitation -f           # посмотреть логи
```

## 6. Проверка

```bash
curl -sI http://176.117.69.231:3035/invitation
# HTTP/1.1 200 OK
```

Открой в браузере `http://176.117.69.231:3035/invitation` — должен
загрузиться стартовый экран с надписью «Катя, это маленький тест».

«Игровой центр» на `:3003` не затрагивается — это отдельный порт.

## 7. Обновления (после push в git)

```bash
cd /opt/invitation
git pull
npm ci
npm run build
sudo systemctl restart invitation
```

## Частые проблемы

- **Connection refused снаружи, но `curl localhost:3035` работает** —
  фаервол/security group блокирует порт. См. шаг 3.
- **CSS/JS 404** — обычно значит, что проксируют без `basePath`, и
  браузер просит `/invitation/_next/...`, но бекенд слушает на `/`.
  Проверь, что `next.config.mjs` содержит `basePath: "/invitation"`
  (это значение по умолчанию) и что ты перезапустил service
  после `git pull`.
- **`EADDRINUSE :::3035`** — порт уже занят. Посмотри чем:
  `sudo ss -tulpn | grep 3035`.
