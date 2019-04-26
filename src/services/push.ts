import * as admin from "firebase-admin";

export class Push {
  public sendMessage(): void {
    const message = {
      data: {
        score: "123",
        time: "2:45"
      },
      token: "ABC"
    };

    admin
      .messaging()
      .send(message)
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }
}
