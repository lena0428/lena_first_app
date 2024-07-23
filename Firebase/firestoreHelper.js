import { collection, addDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";
import { deleteDoc, doc } from "firebase/firestore";

export async function writeToDB(data, collectionName) {
    try {
        await addDoc(collection(database, collectionName), data);
    } catch (e) {
        console.error('Error writing document:', e);
    }
}

export async function deleteFromDB(key, collectionName) {
    try { 
      await deleteDoc(doc(database, collectionName, key));
    }
    catch (err) {
      console.log(err)
    }
  }