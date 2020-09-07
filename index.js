const express = require('express');
const morgan = require('morgan');
const helmet = require("helmet");

const app = express();

app.use(morgan('combined'));
app.use(helmet());

const { config } = require('./config/index');

const authApi = require('./routes/auth');
const moviesApi = require('./routes/movies');
const userMoviesApi = require('./routes/userMovies');

const { logErrors, wrapErrors, errorHandler } = require('./utils/middlewares/errorHandler');

const notFoundHandler = require('./utils/middlewares/notFoundHandler');

app.use(express.json());

// Routes
authApi(app);
moviesApi(app);
userMoviesApi(app);

// Middleware capturar not found 404
app.use(notFoundHandler)

// Middlewares manejadores de Errores
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log('Listening: http://localhost:' + config.port);
});
