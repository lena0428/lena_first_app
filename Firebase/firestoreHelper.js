import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs, setDoc, getDoc } from "firebase/firestore";
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


export async function writeWithIdToDB(uid, collectionName, location) {
  try {
    await setDoc(doc(database, collectionName, uid), location , { merge: true });
  } catch (err) {
    console.log(err);
  }
}	

export async function getADoc(collectionName, id) {
  try {
      const docRef = doc(database, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          return docSnap.data();
      } else {
          console.log("No such document!");
      }
  } catch (err) {
      console.log(err);
  }
}