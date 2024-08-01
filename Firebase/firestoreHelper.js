import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
        const dataWithOwner = { ...data, owner: currentUser.uid };
        try {
            await addDoc(collection(database, collectionName), dataWithOwner);
        } catch (e) {
            console.error('Error writing document:', e);
        }
    } else {
        console.error("No user is signed in");
    }
}

export async function deleteFromDB(key, collectionName) {
    try { 
        await deleteDoc(doc(database, collectionName, key));
    } catch (err) {
        console.log(err);
    }
}
