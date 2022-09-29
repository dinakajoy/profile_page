import express, { Application, Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import config from 'config';
import dotenv from "dotenv-safe";
import logger from './utils/logger';
import connectDB from './utils/dbConnect'
import indexRouter from './routes/index';

dotenv.config();

const app: Application = express();
const port = config.get('environment.port') as number;
const host = config.get('environment.host') as string;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createError.NotFound());
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, host, () => {
  logger.info(`Server running on ${host}/${port}`);
  connectDB();
});
