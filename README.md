# web-chat

## Sebelum Melakukan Pemasangan Frontend chatnya silahkan terlebih dahulu melakukan Pemasangan <a href="https://github.com/mrzf833/api-chat.git">Api Chat</a>

## Di buat menggunakan Nuxt Js

## Build Setup

- Pastikan Versi Npmnya latest
```bash
# install dependencies
$ npm install

# Jika ingin development
$ npm run dev

# Jika ingin production
$ npm run build
$ npm run start
```
- Setting baseURL axios di nuxt.config.js
- Setting authEndpoint di plugins/echo.js
- Setting data pusher di plugins/echo.js


# dengan docker
## install
- `sesuaikan file .env.docker.example`
- `docker compose up -d --build`

## uninstall
- `docker compose down --rmi=all`
