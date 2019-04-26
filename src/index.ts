import * as admin from "firebase-admin";
import * as bodyParser from "body-parser";
import * as express from "express";
import * as functions from "firebase-functions";
import { Routes } from "./routes/routes";

class App {
  public app: express.Application;
  private apiRoutes: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.apiRoutes.routes(this.app);

    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
  }
}

const app = new App().app;

export const api = functions.https.onRequest(app);
