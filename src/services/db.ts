import { firestore } from "firebase-admin";

export class Db {
  private firestore: firestore.Firestore = firestore();

  public getDocument(
    collection: string,
    document: string
  ): FirebaseFirestore.DocumentReference {
    return this.firestore.collection(collection).doc(document);
  }
}
