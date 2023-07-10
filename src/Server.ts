/* eslint-disable @typescript-eslint/no-unsafe-call */
import cookieParser from 'cookie-parser'; 
import helmet from 'helmet';
import express, { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import routeFile from './st_routes/sst_route_file';
import routeAccount from './st_routes/sst_route_account';
import cors from 'cors';
import 'express-async-errors';
import baseRoute from './st_routes/sst_routes';
import MailSender from './st_mailer/st_notif_email';
import SSTMasterListCSV from './st_mailer/st_export_csvsstmaster';
import swaggerjsdoc from 'swagger-jsdoc';
import SwaggerUI from 'swagger-ui-express';
import definition from './swagger-docs/api-route-doc';
const app = express();
const router = express.Router();
const mailSender = new MailSender(); //in use
const JSONEXPORT = new SSTMasterListCSV(); //in use
app.use(cors());
app.use(function (Request, Response, NextFunction) {
    Response.header("Access-Control-Allow-Origin", "*");
    Response.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    Response.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    NextFunction();
});
const options = {
    definition,
    apis: ["./routes/books.js"],
  };
  
const specs = swaggerjsdoc(options);
app.use(
    "/api-docs",
    SwaggerUI.serve,
    SwaggerUI.setup(specs, { explorer: true })
  );
 
app.set('etag', false);
app.set('json spaces', 2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.disable('x-powered-by');

if (process.env.NODE_ENV === 'development') {
    app.use(helmet());
}

if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

app.all('*',)
app.use('/account', routeAccount);
app.use('/api', baseRoute);
app.use('/file', routeFile);
app.use('/', router);



router.get('*', (req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).json(JSON.parse(`{"result":"Page not found! 404"}`));
});

export default app;
