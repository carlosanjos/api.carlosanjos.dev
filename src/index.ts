import * as express from "express";
import * as functions from 'firebase-functions';
import * as bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

export const api = functions.https.onRequest(app);

app.post('/users', (req, res) => {
    res.send(`New user created ${req.body}`);
});

app.get('/users', (req, res) => {
    res.status(200). send('Carlos Anjos');
});