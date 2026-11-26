# World Trip

World Trip is a React travel-booking demo built with Vite. A small Node.js HTTP server serves the production build; it uses Node's built-in modules and does not require Express.

## Requirements

- Node.js 20 or newer
- npm

## Run in development

From this project folder, install dependencies once:

```sh
npm install
```

Start Vite:

```sh
npm run dev
```

Open the local address printed in the terminal (normally `http://127.0.0.1:5173`).

## Build and run with Node.js

Create the production files and start the Node server:

```sh
npm run build
npm start
```

Open `http://localhost:3001`. To use another port, set the `PORT` environment variable before `npm start`.

The login, signup, booking, and feedback forms are front-end demonstrations. They show confirmation screens but do not authenticate users, save bookings, or send feedback to a database.