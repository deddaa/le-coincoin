# le-coincoin
site de petites annonces technologiques style LeBoncoin

# organisation du projet
```
le-coincoin/
┣ backend/
┃ ┣ config/
┃ ┃ ┣ db.js
┃ ┃ ┗ mongodb.js
┃ ┣ controllers/
┃ ┃ ┣ annonce.controller.js
┃ ┃ ┣ message.controller.js
┃ ┃ ┗ user.controller.js
┃ ┣ middleware/
┃ ┃ ┗ auth.middleware.js
┃ ┣ models/
┃ ┃ ┣ annonce.model.js
┃ ┃ ┣ message.model.js
┃ ┃ ┗ user.model.js
┃ ┣ routes/
┃ ┃ ┣ annonce.routes.js
┃ ┃ ┣ auth.routes.js
┃ ┃ ┗ messages.routes.js
┃ ┣ schema/
┃ ┃ ┗ message.schema.js
┃ ┣ scripts/
┃ ┃ ┗ create.users.script.js
┃ ┣ validations/
┃ ┃ ┣ annonce.validation.js
┃ ┃ ┗ auth.validation.js
┃ ┣ .env
┃ ┣ app.js
┃ ┣ package-lock.json
┃ ┣ package.json
┃ ┗ server.js
┣ db/
┃ ┗ SCRIPTE.sql
┣ frontend/
┃ ┣ public/
┃ ┃ ┣ favicon.svg
┃ ┃ ┗ icons.svg
┃ ┣ src/
┃ ┃ ┣ assets/
┃ ┃ ┃ ┣ hero.png
┃ ┃ ┃ ┣ react.svg
┃ ┃ ┃ ┗ vite.svg
┃ ┃ ┣ components/
┃ ┃ ┃ ┣ FormLogin/
┃ ┃ ┃ ┃ ┣ FormLogin.jsx
┃ ┃ ┃ ┃ ┗ Title.jsx
┃ ┃ ┃ ┣ FormRegister/
┃ ┃ ┃ ┃ ┣ FormRegister.jsx
┃ ┃ ┃ ┃ ┗ Title.jsx
┃ ┃ ┃ ┣ layout/
┃ ┃ ┃ ┃ ┗ Footer.jsx
┃ ┃ ┃ ┣ NavBar/
┃ ┃ ┃ ┃ ┣ LogoutBtn.jsx
┃ ┃ ┃ ┃ ┗ Navbar.jsx
┃ ┃ ┃ ┗ ui/
┃ ┃ ┃   ┣ Button.jsx
┃ ┃ ┃   ┗ Cards.jsx
┃ ┃ ┣ pages/
┃ ┃ ┃ ┣ Annonces.jsx
┃ ┃ ┃ ┣ Home.jsx
┃ ┃ ┃ ┣ Login.jsx
┃ ┃ ┃ ┗ Register.jsx
┃ ┃ ┣ services/
┃ ┃ ┃ ┣ annonces.service.js
┃ ┃ ┃ ┗ api.service.js
┃ ┃ ┣ App.css
┃ ┃ ┣ App.jsx
┃ ┃ ┣ index.css
┃ ┃ ┗ main.jsx
┃ ┣ .gitignore
┃ ┣ eslint.config.js
┃ ┣ index.html
┃ ┣ package-lock.json
┃ ┣ package.json
┃ ┣ README.md
┃ ┗ vite.config.js
┣ .gitignore
┣ package-lock.json
┗ README.md
```

# les Stacks :
front :
- html
- tailwind
- javaScript
- React

back :
- javaScript
- NodeJs + express
- BDD mySQL/MongoDb

# Lancer le serveur :

### Prérequis :
- `Node.js` installé

### Démarrage :

Naviguez vers le dossier `backend` :

```bash
cd le-coincoin/backend
```
Installer les dépendances (`npm install`)

Lancez le serveur back:

```bash
npm run dev
```

Naviguez vers le dossier `frontend` :

```bash
cd le-coincoin/frontend
```
Installer les dépendances (`npm install`)

Lancez le serveur front:

```bash
npm run dev
```

Utilisez le script fourni dans le dossier `db` (`SCRIPT.sql`) pour avoir l'architecture de la bdd et des données de test


