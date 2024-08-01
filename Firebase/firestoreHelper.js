import { collection, addDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";
import { deleteDoc, doc, updateDoc, getDocs } from "firebase/firestore";

export async function writeToDB(date, col, docId, subCol) {
    try {
        await addDoc(collection(database, col), date);
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

// make a new function in firestoreHelper file to update the document
export async function markAsWarning(goalId) {
    console.log(goalId)
    try {
        await updateDoc(doc(database, 'goals', goalId), { warning: true });
    } catch (e) {
        console.error('Error updating document:', e);
    }
}

export async function readAllData(collectionName) {
    try {
        const querySnapshot = await getDocs(collection(database, collectionName));
        const dataArray = [];
        querySnapshot.forEach((doc) => {
            dataArray.push({ ...doc.data(), id: doc.id });
        });
        console.log("array from the database", dataArray);
        return dataArray;
    } catch (err) {
        console.log(err);
    }
}