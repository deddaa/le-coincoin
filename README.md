# le-coincoin
site de petites annonces style LeBoncoin

# organisation du projet
```
le-coincoin/
┣ backend/
┃ ┣ config/
┃ ┃ ┗ db.js
┃ ┣ controllers/
┃ ┃ ┣ annonce.controller.js
┃ ┃ ┗ auth.controller.js
┃ ┣ middleware/
┃ ┃ ┗ auth.middleware.js
┃ ┣ models/
┃ ┃ ┣ annonce.model.js
┃ ┃ ┗ auth.model.js
┃ ┣ routes/
┃ ┃ ┣ annonce.routes.js
┃ ┃ ┗ auth.routes.js
┃ ┣ validations/
┃ ┃ ┣ annonce.validation.js
┃ ┃ ┗ auth.validation.js
┃ ┣ app.js
┃ ┗ server.js
┣ frontend/
┃ ┣ html/
┃ ┃ ┗ index.html
┃ ┗ public/
┃   ┣ css/
┃   ┗ js/
┣ .gitignore
┗ README.md
```

# les Stacks :
front :
- html
- tailwind
- javaScript

back :
- javaScript
- NodeJs + express
- BDD mySQL