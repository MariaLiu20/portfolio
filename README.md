# My Portfolio

Hi, this is a [website](https://marialiu20.github.io/portfolio/) for my portfolio in the form of a Windows XP desktop because I'm a very nostalgic person.

## Features

- **Windows:** Windows can be dragged and stacked with z-index management.
- **Desktop Icons:** Draggable and clickable icons to open each window.
- **MP3 Player:** Play, pause, and seek through a playlist of my favorite early 2000s songs.
- **Responsive Design:** Works on desktop and mobile browsers.
- **Modern Stack:** Built with React and Vite, but honestly could've just used vanilla js

## Getting Started

### Prerequisites

- Node.js (v16 or newer recommended)
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Running the App

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

## Customization

- **Add new windows:** Add to the `windows` array in `Desktop.jsx` with/without a corresponding `Icon`
- **Change playlist:** Edit the `playlist` array in `Mp3PlayerContent.jsx`.
- **Change icons/assets:** Place new images in `public/` and update the `Icon` props.

## Credits

- MP3 Player from [loveberry](https://loveberry.nekoweb.org/resources/snippets)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
