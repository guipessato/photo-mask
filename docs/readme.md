# 🚗 photoMask

Este projeto utiliza Gulp para compilar arquivos SASS e JS. O objetivo é configurar um ambiente automatizado que observa e compila automaticamente arquivos SASS e JS, gerando arquivos CSS e JS minificados.

## 📁 Estrutura do Projeto

```
calculadoraCombustivel/
 ┣ dist/
 ┃ ┣ css/
 ┃ ┃ ┗ styles.css
 ┃ ┃ ┗ styles.min.css
 ┃ ┗ js/
 ┃ ┃ ┗ scripts.js
 ┃ ┃ ┗ scripts.min.js
 ┣ src/
 ┃ ┣ components/
 ┃ ┃ ┣ footer/
 ┃ ┃ ┃ ┣ index.js
 ┃ ┃ ┃ ┗ style.scss
 ┃ ┃ ┣ form/
 ┃ ┃ ┃ ┣ index.js
 ┃ ┃ ┃ ┗ style.scss
 ┃ ┃ ┗ header/
 ┃ ┃ ┃ ┣ index.js
 ┃ ┃ ┃ ┗ style.scss
 ┃ ┗ sass/
 ┃ ┃ ┗ style.scss
 ┗ index.html
```

## 🛠️ Configuração do Ambiente

### 1. Inicializar o Projeto

Primeiro, inicialize o projeto com npm ou Yarn.

```bash
npm init -y
# ou
yarn init -y
```

### 2. Instalar Dependências

Instale as dependências necessárias para o Gulp e os plugins.

```bash
npm install --save-dev gulp gulp-sass sass gulp-concat gulp-uglify gulp-rename gulp-clean-css
# ou
yarn add --dev gulp gulp-sass sass gulp-concat gulp-uglify gulp-rename gulp-clean-css
```

### 3. Configurar o `package.json`

Certifique-se de que o `package.json` tenha os seguintes scripts:

```json
{
  "name": "photoMask",
  "version": "1.0.0",
  "description": "Projeto para compilar SASS e JS usando Gulp",
  "main": "index.html",
  "scripts": {
    "start": "gulp",
    "build": "gulp build"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "gulp": "^4.0.2",
    "gulp-sass": "^5.0.0",
    "sass": "^1.32.8",
    "gulp-concat": "^2.6.1",
    "gulp-uglify": "^3.0.2",
    "gulp-rename": "^2.0.0",
    "gulp-clean-css": "^4.3.0"
  }
}
```

### 4. Criar o `gulpfile.js`

Crie um arquivo chamado `gulpfile.js` na raiz do projeto e adicione o seguinte conteúdo:

```javascript
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const path = require('path');

// Caminhos dos arquivos
const paths = {
  styles: {
    src: 'src/components/**/*.scss',
    dest: 'dist/css'
  },
  scripts: {
    src: 'src/components/**/*.js',
    dest: 'dist/js'
  }
};

// Tarefa para compilar SCSS
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.styles.dest));
}

// Tarefa para compilar e minificar JS
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(uglify())
    .pipe(rename({ basename: 'scripts', suffix: '.min' }))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Tarefa para observar mudanças nos arquivos
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
}

// Tarefas definidas
const build = gulp.series(gulp.parallel(styles, scripts));
const start = gulp.series(build, watch);

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = start;
```

## 💻 Como Usar

### 1. Instalar Dependências

Execute o comando para instalar todas as dependências do projeto:

```bash
npm install
# ou
yarn install
```

### 2. Executar o Projeto

Para iniciar o processo de observação contínua e compilação, execute:

```bash
npm start
# ou
yarn start
```

Isso irá compilar os arquivos SASS e JS e observar quaisquer mudanças nos arquivos para recompilação contínua.

### 3. Buildar o Projeto

Para compilar os arquivos uma única vez (sem observação contínua), execute:

```bash
npm run build
# ou
yarn build
```