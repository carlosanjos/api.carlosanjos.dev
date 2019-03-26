import { Request, Response, Application } from "express";

export class CustomerRoute {

    public routes(app: Application): void {
        app.route("/").get((req: Request, res: Response) => {
            res.status(200).send({
                message: "Hello World"
            });
        });
    }
}
