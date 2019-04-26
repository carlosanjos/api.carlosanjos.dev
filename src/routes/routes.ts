import { Request, Response, Application } from "express";
import { Db } from "../services/db";
import { PushToken } from "../models/push-token";
import { check, validationResult } from "express-validator/check";

export class Routes {
  public routes(app: Application): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "Hello World 2.1"
      });
    });

    app.post(
      "/",
      [
        check("name")
          .isLength({ min: 3 })
          .withMessage("must be at least 3 charachters long")
          .trim(),
        check("token")
          .not()
          .isEmpty()
          .withMessage("cannot be empty")
          .trim(),
        check("expiredAt")
          .isISO8601()
          .withMessage("not a validate date")
      ],
      (req: Request, res: Response): Response => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }

        const pushToken: PushToken = {
          name: req.body.name,
          token: req.body.token,
          expiredAt: req.body.expiredAt,
          createdAt: new Date()
        };

        const db = new Db();

        const reference = db.getDocument("users", "tokens");

        reference
          .set(pushToken)
          .then(i => console.log(i))
          .catch(nay => {
            return res.status(422).json({ error: nay });
          });

        return res.status(201).json(pushToken);
      }
    );
  }
}
