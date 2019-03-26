import * as bodyParser from "body-parser";
import * as express from "express";
import * as functions from "firebase-functions";
import { CustomerRoute } from "./routes/customer-route";
class App {
    public app: express.Application;
    public routePrv: CustomerRoute = new CustomerRoute();

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }
}

const app = new App().app;

export const api = functions.https.onRequest(app);